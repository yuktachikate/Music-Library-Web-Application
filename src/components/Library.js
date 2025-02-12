import React, { useEffect, useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import app from "../firebase/firebase";
import SongCard from "./SongCard";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "3% 10% 10% 10%",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    width: "90%",
    margin: "0px 0px",
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
}));

export default function Search() {
  const classes = useStyles();
  const [songsInfo, setSongsInfo] = useStateIfMounted([]);

  const loadSongs = async () => {
    const songDB = app.firestore().collection("songs");
    let data = [];
    await songDB.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("The data is ", doc.data())
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    });
    return data;
  };

  useEffect(() => {
    loadSongs().then((data) => {
      setSongsInfo(data);
    });
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1>All Songs</h1>
            </Paper>
          </Grid>
          {songsInfo.length &&
            songsInfo.map((song) => (
              <Grid item xs={12}>
                <SongCard
                  key={song.url}
                  name={song.name}
                  url={song.url}
                  artist={song.artist}
                  album={song.album}
                  id={song.id}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}
