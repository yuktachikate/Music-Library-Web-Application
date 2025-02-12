import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "./Authentication";
import { Link, Redirect } from "react-router-dom";
import app from "../firebase/firebase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "3% 15% 15% 15%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "right",
    width: "100%",
    // margin: "0px 10px",
    boxShadow: "0 0 0",
    fontSize: "x-large",
  },
  link: {
    textDecoration: "none",
  },
  img: {
    float: "left",
    width: "60%",
    borderRadius: "50%",
    boxShadow: "1px 1px 1px 2px #ccc",
    margin: "10px 10px",
  },
  artist: {
    textDecoration: "none",
    float: "right",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(user.photoURL);
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  // user, loadingIcon, loggedIn, userId
  const { setUser, setUserId, setLoadingIcon, setLoggedIn } = useContext(
    AuthContext
  );

  console.log(user);

  const handleRedirect = () => {
    return <Link to="/playlist" />;
  };

  const handleLogout = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        setLoggedIn(false);
        setUserId("");
      });
  };

  // return <h1>This is the profile page</h1>;
  return (
    <div className={classes.root}>
      <Grid container spacint={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h1>Profile</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/" className={classes.artist}>
            <Button size="small" color="primary" onClick={handleLogout}>
              logout
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6}>
          <img
            src={
              image == null
                ? "https://visualpharm.com/assets/941/Customer-595b40b75ba036ed117d9d5d.svg"
                : image
            }
            alt="Cover Image"
            className={classes.img}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <strong>{name}</strong>
            <br />
            <p>{email}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
