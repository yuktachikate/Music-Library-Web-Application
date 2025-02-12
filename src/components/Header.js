import React, { useContext } from "react";
import router from "./Routes";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/Authentication";

const Header = () => {
  const { loggedId } = useContext(AuthContext);
  return (
    <ul className="nav">
      {router.map((route, i) => {
        <li key={i}>
          <Link to={route.path}>{route.name}</Link>
        </li>;
      })}
    </ul>
  );
};

export default Header;
