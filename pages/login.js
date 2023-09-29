import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  //router
  const router = useRouter();

  useEffect(() => {
    if (user != null) router.push("/user");
  }, [user]);

  //console.log("STATE", state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      //console.log("Login response", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      //save in local storage...
      window.localStorage.setItem("user", JSON.stringify(data));

      //redirect
      router.push("/*"); //he pushed to the dashboard page here by router.push("/user")... i tried but didnt work so made changes in the useEffect() part on line no 21 and it worked... It Opens the user page/dashboard when user logs in...

      //setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="jumbotron p-5 mb-4">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn  btn-block btn-primary"
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
        <p className="text-center pt-3">
          Not yet Registered? <Link href="/register">Register</Link>
        </p>

        <p className="text-center">
          <Link href="/forgot-password" className="text-danger">
            Reset Password
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
