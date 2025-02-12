import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../components/Authentication";

const SecureRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/register"} />
      }
    ></Route>
  );
};

export default SecureRoute;
