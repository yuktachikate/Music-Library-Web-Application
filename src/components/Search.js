import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Grid, Paper } from "@material-ui/core";
import AlbumCard from "./AlbumCard";
import Artist from "./Artist";
import { MediaContext } from "./MediaContext";
import SongCard from "./SongCard";
import { useStateIfMounted } from "use-state-if-mounted";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "2% 10% 10% 10%",
    borderRadius: 20,
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
}));

export default function Search(props) {
  const classes = useStyles();
  const { artists, setArtists } = useContext(MediaContext);
  const [albums, setAlbums] = useStateIfMounted(null);
  const [songInfo, setSongInfo] = useStateIfMounted(null);

  const input = props.location.state.input.toLowerCase();

  const getAllAlbumsAndSongs = async () => {
    let albums = [];
    if (artists) {
      await artists.forEach((artist) => {
        artist.albums.forEach((album) => {
          albums.push({ artist: artist, ...album });
        });
      });
    }
    let songInfo = [];
    if (albums) {
      await albums.forEach((album) => {
        album.songInfo.forEach((song) => {
          songInfo.push(song);
        });
      });
    }
    console.log("song.Info", songInfo);

    return [albums, songInfo];
  };

  useEffect(() => {
    getAllAlbumsAndSongs().then((data) => {
      setAlbums(data[0]);
      setSongInfo(data[1]);
    });
  }, []);

  console.log("DATA", songInfo);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Link to="/" className={classes.link}>
              <Button size="small" color="primary">
                back
              </Button>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Showing results from '{input}'...
            </Paper>
          </Grid>

          {artists != [] &&
            artists.map((artist) => {
              if (artist.name.toLowerCase() === input) {
                return (
                  <Grid item xs={12} key={artist.id}>
                    <Artist key={artist.id} artistInfo={artist} />
                  </Grid>
                );
              }
            })}

          {albums &&
            albums.map((album) => {
              if (album.name.toLowerCase() === input) {
                return (
                  <Grid item xs={12} key={album.id}>
                    <AlbumCard
                      key={album.id}
                      albumInfo={album}
                      artistInfo={album.artist}
                    />
                  </Grid>
                );
              }
            })}

          {songInfo &&
            songInfo.map((song) => {
              if (song.name.toLowerCase() === input) {
                return (
                  <Grid item xs={12} sm={6} key={song.id}>
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
                );
              }
            })}
        </Grid>
      </div>
    </>
  );
}
