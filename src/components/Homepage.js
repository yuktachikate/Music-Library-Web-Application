import React, { useEffect, useState } from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "3% 10% 10% 10%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    width: "90%",
    margin: "10px 10px",
    boxShadow: "0 0 0",
    fontSize: "x-large",
  },
  link: {
    textDecoration: "none",
  },
  img: {
    width: "90%",
    borderRadius: 20,
    float: "right",
  },
  artist: {
    textDecoration: "none",
    float: "right",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    maxWidth: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    maxWidth: "100%",
    borderRadius: 200,
  },
  searchBtn: {
    borderRadius: 200,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputClick = () => {
    setInput("");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2>
              Welcome to Music Library, where you can play music, and add to you
              own playlist as you go.
            </h2>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            search for songs, album, or artist below...
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <InputBase
            placeholder="Search songs, album, artists..."
            color="inherit"
            value={input}
            onChange={handleInputChange}
            onClick={handleInputClick}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Link
            to={{
              pathname: "/search",
              state: { input: input },
            }}
            className={classes.link}
          >
            <Button
              color="inherit"
              variant="contained"
              className={classes.searchBtn}
            >
              <SearchIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}
