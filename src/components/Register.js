import React, { useState, useContext } from "react";
import { AuthContext } from "../components/Authentication";
import firebase from "firebase";
import app from "../firebase/firebase";
import { Redirect } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

export default function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const Auth = useContext(AuthContext);

  const handleForm = (e) => {
    e.preventDefault();
    app
      .auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then((out) => {
        console.log("user:", out.user);
        if (out.user) {
          console.log("auth: " + Auth);
          Auth.setLoggedIn(true);
        }
      })
      .catch((error) => {
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
            <h1>Register</h1>
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
            Join With Google
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
            Register
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/login" className={classes.link}>
            Already have an account? Login...
          </Link>
        </Grid>
        <Grid item xs={12} sm={3}>
          <span>{error}</span>
        </Grid>
      </Grid>
    </div>

    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={(e) => handleForm(e)}>
    //     <input
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       name="email"
    //       type="email"
    //       placeholder="email"
    //     />
    //     <input
    //       onChange={(e) => setPwd(e.target.value)}
    //       name="password"
    //       value={pwd}
    //       type="password"
    //       placeholder="password"
    //     />
    //     <hr />
    //     <button
    //       className="googleBtn"
    //       type="button"
    //       onClick={handleGoogleSignIn}
    //     >
    //       <img
    //         src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
    //         alt="logo"
    //       />
    //       Join With Google
    //     </button>

    //     <button type="submit">Login</button>

    //     <span>{error}</span>
    //   </form>
    // </div>
  );
}
