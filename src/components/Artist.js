import React, { useContext, useEffect, useState } from "react";
import app from "../firebase/firebase";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AlbumCard from "./AlbumCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: "3% 10% 10% 10%",
    borderRadius: 20,
    boxShadow: "10px 10px 30px -1px grey",
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

export default function Artist(props) {
  console.log("PROPS", props);
  const classes = useStyles();
  const artist = props.artistInfo
    ? props.artistInfo
    : props.location.state.artistInfo;
  const [albums, setAlbums] = useState(null);

  const loadAlbums = async () => {
    let data = [];
    if (artist) {
      const dataDB = app
        .firestore()
        .collection("data")
        .doc(artist.id)
        .collection("albums");
      await dataDB.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
    }

    return data;
  };

  useEffect(() => {
    loadAlbums().then((data) => {
      setAlbums(data);
    });
  }, []);

  if (artist == null) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {artist && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            {props.location && (
              <Grid item xs={12}>
                <Link to="/library" className={classes.link}>
                  <Button size="small" color="primary">
                    back
                  </Button>
                </Link>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <h1>{artist.name}</h1>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <img
                src={artist.image}
                alt="Artist Image"
                className={classes.img}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <strong>Albums</strong>
              </Paper>
            </Grid>

            {albums &&
              albums.map((album) => {
                return (
                  <Grid item xs={12} sm={6} key={album.id}>
                    <AlbumCard albumInfo={album} artistInfo={artist} />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      )}
    </>
  );
}
