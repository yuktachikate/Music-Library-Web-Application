import React, { useContext, useEffect, useState } from "react";
import app from "../firebase/firebase";
import { AuthContext } from "./Authentication";
import { MediaContext } from "./MediaContext";
import { CircularProgress } from "@material-ui/core";
import PlaylistCard from "./PlaylistCard";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "3% 10% 10% 10%",
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
    width: "100%",
  },
}));

export default function Playlist() {
  // get the user id from Auth Context
  const classes = useStyles();
  const [playlists, setPlaylists] = useState([]);
  // const [currPlaylist, setCurrPlaylist] = useState({});
  const [stopper, setStopper] = useState(false);
  const { user, userId } = useContext(AuthContext);
  const { currPlaylist, setCurrPlaylist } = useContext(MediaContext);
  const [input, setInput] = useState("");
  // users will definately be found, and created in firestore
  // using the user id, get the playlists

  const getData = async () => {
    const userDB = app.firestore().collection("users").doc(userId);
    const playlistDB = await userDB.collection("playlists").get();
    const playlists = playlistDB.docs.map((doc) => doc.data());
    setPlaylists(playlists);
  };

  useEffect(() => {
    if (!(user && userId)) {
      setStopper(true);
    } else {
      setStopper(false);
      getData();
    }
  }, [user, userId, playlists]);

  const handleCreate = () => {
    if (input == undefined && input.length == 0) {
      return;
    }
    if (userId) {
      let exit = false;
      playlists.forEach((playlist) => {
        if (playlist.name.toLowerCase() == input.toLowerCase()) {
          exit = true;
        }
      });
      if (!exit) {
        const userDB = app.firestore().collection("users").doc(userId);

        userDB.get().then(() => {
          const playlistDB = userDB.collection("playlists").doc();
          const playlistId = playlistDB.id;
          userDB.collection("playlists").doc(playlistId).set({
            id: playlistId,
            name: input,
            songs: [],
          });
        });
      }
    }
  };

  const handleDelete = async () => {
    if (input == undefined && input.length == 0) {
      return;
    }
    if (userId) {
      let playlistId = null;
      playlists.forEach((playlist) => {
        if (playlist.name.toLowerCase() == input.toLowerCase()) {
          playlistId = playlist.id;
        }
      });

      const userDB = await app.firestore().collection("users").doc(userId);
      userDB
        .collection("playlists")
        .doc(playlistId)
        .delete()
        .then(() => {
          console.log("deleted playlist");
          if (playlists.length == 1) {
            return;
          } else if (playlists.length > 1) {
            if (playlists[0].name.toLowerCase() == input.toLowerCase()) {
              setCurrPlaylist(playlists[1]);
            } else {
              setCurrPlaylist(playlists[0]);
            }
          }
        });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleChangePlaylist = (e) => {
    if (playlists) {
      playlists.map((playlist) => {
        if (playlist.name == e.target.textContent) {
          setCurrPlaylist(playlist);
        }
      });
    }
  };

  // need to create a card for playlist which will contain info about the songs, and playlist name

  // allow user to change the playlist to show (need to store other playlist's name)
  // show the songs for the selected playlists

  if (stopper) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputBase
              placeholder="Playlist name..."
              color="inherit"
              value={input}
              onChange={handleInputChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              color="inherit"
              variant="contained"
              className={classes.searchBtn}
              onClick={handleCreate}
            >
              Create
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              color="inherit"
              variant="contained"
              className={classes.searchBtn}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>

          {playlists &&
            playlists.map((playlist) => {
              if (playlist.name == currPlaylist.name) {
                return (
                  <Grid item xs={12} sm={6} key={playlist.id}>
                    <Button
                      key={playlist.id}
                      value={playlist.name}
                      color="secondary"
                      variant="contained"
                      className={classes.searchBtn}
                      onClick={handleChangePlaylist}
                    >
                      {playlist.name}
                    </Button>
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={12} sm={6} key={playlist.id}>
                    <Button
                      key={playlist.id}
                      value={playlist.name}
                      color="primary"
                      variant="contained"
                      className={classes.searchBtn}
                      onClick={handleChangePlaylist}
                    >
                      {playlist.name}
                    </Button>
                  </Grid>
                );
              }
            })}

          <Grid item xs={12}>
            <PlaylistCard userId={userId} playlist={currPlaylist} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
