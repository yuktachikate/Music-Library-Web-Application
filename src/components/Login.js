import React, { useState, useContext } from "react";
import { AuthContext } from "../components/Authentication";
import firebase from "firebase";
import app from "../firebase/firebase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Reddit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "10% 10% 2% 10%",
  },
  paper: {
    textAlign: "left",
    width: "90%",
    margin: "0px 0px",
    boxShadow: "0 0 0",
    fontSize: "x-large",
  },
  hide: {
    display: "none",
  },
  text: {
    width: "100%",
    maxWidth: "100%",
  },
  loginBtn: {
    flex: "right",
  },
  paper2: {
    textAlign: "left",
    width: "90%",
    margin: "0px 0px",
    boxShadow: "0 0 0",
    fontSize: "large",
  },
  link: {
    textDecoration: "none",
    color: "#CD5C5C",
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const Auth = useContext(AuthContext);

  const handleForm = (e) => {
    e.preventDefault();
    app
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then((out) => {
        if (out.user) {
          Auth.setLoggedIn(true);
        }
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    const authProvider = new firebase.auth.GoogleAuthProvider();
    app
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        app
          .auth()
          .signInWithPopup(authProvider)
          .then((out) => {
            console.log("out:", out);
            Auth.setLoggedIn(true);
          })
          .catch((e) => {
            setError(e.message);
          });
      });
  };

  if (Auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Login</h1>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            className="googleBtn"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
            />
            Login With Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>or</Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="email"
            className={classes.text}
          />
          <input
            onChange={(e) => setPwd(e.target.value)}
            name="password"
            value={pwd}
            type="password"
            placeholder="password"
            className={classes.text}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            // type="submit"
            onClick={handleForm}
            className={classes.loginBtn}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/register" className={classes.link}>
            Don't have an account? Register...
          </Link>
        </Grid>
        <Grid item xs={12} sm={3}>
          <span>{error}</span>
        </Grid>
      </Grid>
    </div>
  );
}
