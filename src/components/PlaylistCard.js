import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStateIfMounted } from "use-state-if-mounted";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import app from "../firebase/firebase";
import SongCard from "./SongCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "10%",
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
  searchBtn: {
    borderRadius: 200,
  },
}));

export default function PlayListCard(props) {
  const classes = useStyles();
  const playlistName = props.playlist ? props.playlist.name : "";
  const playlistSongs = props.playlist ? props.playlist.songs : [];
  const [songsInfo, setSongsInfo] = useStateIfMounted([]);

  const loadPlaylist = async () => {
    const songDB = app.firestore().collection("songs");
    let data = [];
    if (playlistSongs) {
      await songDB.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          if (playlistSongs.includes(doc.id)) {
            data.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
      });
    }
    return data;
  };

  useEffect(() => {
    loadPlaylist().then((data) => {
      setSongsInfo(data);
    });
  }, [playlistSongs]);

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Playlist: {playlistName}</h1>
          </Grid>
          {songsInfo.length &&
            songsInfo.length === playlistSongs.length &&
            songsInfo.map((song) => (
              <Grid item xs={12} key={song.id}>
                <SongCard
                  key={song.url}
                  name={song.name}
                  url={song.url}
                  artist={song.artist}
                  album={song.album}
                  id={song.id}
                  hidePlaylistButton={false}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}
