import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  //state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false); //set it to false later
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //context
  const {
    state: { user },
  } = useContext(Context);

  //router
  const router = useRouter();

  //redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/*");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the reset code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
      toast.success("Password reset successfully! You can login with new password.")
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="jumbotron p-5 mb-4">Forgot Password</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        {/* if success is true execute handleResetPassword, otherwise execute handleSubmit */}
        <form onSubmit={success ? handleResetPassword : handleSubmit}> 
          <input
            type="email"
            className="form-control mb-3 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          {success && (
            <>
              <input
                type="text"
                className="form-control mb-3 p-3"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter reset code"
                required
              />
              <input
                type="password"
                className="form-control mb-3 p-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                required
              />
            </>
          )}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-block p-2"
              disabled={loading || !email}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
