import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Authentication";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#F0F8FF",
    marginLeft: "2%",
    marginRight: "2%",
  },
  button: {
    backgroundColor: "#F08080",
  },
  nav: {
    backgroundColor: "#000000",
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  // console.log("user", user);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Music Library
            </Typography>
            <Link color="inherit" to="/" className={classes.link}>
              Home
            </Link>
            {user ? (
              <>
                <Link to="/library" className={classes.link}>
                  Library
                </Link>
                <Link to="playlist" className={classes.link}>
                  My Playlist
                </Link>
                <Link to="/profile" className={classes.link}>
                  {user.photoURL != null ? (
                    <span>
                      <img
                        src={user.photoURL}
                        alt="profile image"
                        className="thumbnail"
                      />
                    </span>
                  ) : (
                    <span>
                      <img
                        src="https://visualpharm.com/assets/941/Customer-595b40b75ba036ed117d9d5d.svg"
                        alt="profile image"
                        className="thumbnail"
                      />
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <Link to="/register" className={classes.link}>
                <Button variant="contained" className={classes.button}>
                  Register
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
