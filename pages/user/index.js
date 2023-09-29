import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../componenets/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
        <h1 className="jumbotron p-5 mb-4">
          User Dashboard
        </h1>

      {/* he used !hidden but the user page wont load that way only when changed to hidden it shows the user page when logged in 
      {!hidden && (
        <h1 className="jumbotron">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )} */}
    </UserRoute>
  );
};

export default UserIndex;
