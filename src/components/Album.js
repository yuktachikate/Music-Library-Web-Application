import React, { useContext, useEffect, useState } from "react";
import app from "../firebase/firebase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useStateIfMounted } from "use-state-if-mounted";
import SongCard from "./SongCard";

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
    float: "right",
    width: "90%",
    borderRadius: 20,
  },
  artist: {
    textDecoration: "none",
    float: "right",
  },
}));

export default function Album(props) {
  const classes = useStyles();
  const [songsInfo, setSongsInfo] = useStateIfMounted([]);
  const artist = props.location.state.artistInfo;
  const album = props.location.state.albumInfo;

  const loadSongInfo = async () => {
    let data = [];
    const songDB = app.firestore().collection("songs");
    await songDB.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        if (album.songs.includes(doc.id)) {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
    });
    return data;
  };

  useEffect(() => {
    loadSongInfo().then((data) => {
      setSongsInfo(data);
    });
  }, []);

  if (album == null || artist == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {album && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Link to="/library" className={classes.link}>
                <Button size="small" color="primary">
                  back
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link
                to={{
                  pathname: "/artist",
                  state: { artistInfo: artist },
                }}
                className={classes.artist}
              >
                <Button size="small" color="primary">
                  Artist
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h1>{album.name}</h1>
              </Paper>
              <Paper className={classes.paper}>Released on {album.year}</Paper>
              <Paper className={classes.paper}>
                <strong>Artist:</strong> {artist.name}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <img
                src={album.cover}
                alt="Cover Image"
                className={classes.img}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <strong>Songs</strong>
              </Paper>
            </Grid>

            {songsInfo &&
              songsInfo.map((song) => {
                return (
                  <Grid item xs={12} sm={6} key={song.url}>
                    <SongCard
                      key={song.url}
                      name={song.name}
                      url={song.url}
                      artist={song.artist}
                      album={song.album}
                      id={song.id}
                      hideAlbum={true}
                      hideArtist={true}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      )}
    </>
  );
}
