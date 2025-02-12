import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import app from "../firebase/firebase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { PlayArrow, Pause } from "@material-ui/icons";
import { CardActions, Button } from "@material-ui/core";
import { MediaContext } from "./MediaContext";
import { Link } from "react-router-dom";
import { AuthContext } from "./Authentication";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "2% 0% 2% 0%",
    alignContent: "center",
    borderRadius: 20,
    boxShadow: "10px 10px 30px -1px grey",
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    marginLeft: "auto",
  },
  controls: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    border: "0px solic black",
    borderRadius: 20,
  },
  media: {
    height: 140,
    display: "flex",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  link: {
    textDecoration: "none",
  },
  cardActions: {
    float: "right",
  },
}));

export default function SongCard(props) {
  const {
    playing,
    setPlaying,
    currSong,
    setCurrSong,
    switched,
    setSwitched,
    album,
    setAlbum,
    artist,
    setArtist,
    currPlaylist,
    setCurrPlaylist,
  } = useContext(MediaContext);
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [audio, setAudio] = useState(new Audio(props.url));
  const [hidePlaylist, setHidePlaylist] = useState(true);
  //   const [playing, setPlaying] = useState(false);
  const [artistInfo, setArtistInfo] = useState({
    name: "Anonymous",
    image: "",
  });
  const [albumInfo, setAlbumInfo] = useState({
    cover: "",
    name: "",
    songs: [],
    year: "",
  });

  // need to get artist's name, coverArt, album name, release year from data
  const loadData = async () => {
    const dataDB = app.firestore().collection("data").doc(props.artist);
    let artistInfo = {};
    let albumInfo = {};

    await dataDB.get().then((snapshot) => {
      artistInfo = {
        id: snapshot.id,
        ...snapshot.data(),
      };
    });

    // we got the artist data, need to go to the album

    await dataDB
      .collection("albums")
      .doc(props.album)
      .get()
      .then((snapshot) => {
        albumInfo = snapshot.data();
      });

    return [artistInfo, albumInfo];
  };

  useEffect(() => {
    if (currSong != "" && currSong != props.id) {
      audio.pause();
      setAudio(new Audio(props.url));
    }
  }, [switched]);

  const play = () => {
    audio.pause();
    audio.play();
    setPlaying(true);
    setCurrSong(props.id);
    setSwitched(props.id);
  };

  const pause = () => {
    audio.pause();
    setAudio(new Audio(props.url));
    setPlaying(false);
    setCurrSong("");
  };

  const handleClick = async () => {
    await setAlbum(albumInfo);
    await setArtist(artistInfo);
  };

  const handleAddPlaylist = async () => {
    console.log("Adding to Playlist!");
    console.log("currPlaylist", currPlaylist);
    let songs = currPlaylist.songs ? currPlaylist.songs : [];
    if (!songs.includes(props.id)) {
      songs.push(props.id);
    } else {
      console.log("already in playlist!");
    }
    await setCurrPlaylist({
      songs: songs,
      ...currPlaylist,
    });
  };

  const handleRemovePlaylist = async () => {
    console.log("Deleting to Playlist!");
    console.log("curr  Playlist", currPlaylist);
    if (currPlaylist && currPlaylist.songs && currPlaylist.songs.length == 0) {
      return;
    }
    let songs = currPlaylist.songs;
    if (songs.includes(props.id)) {
      let index = songs.indexOf(props.id);
      if (index > -1) {
        songs.splice(index, 1);
      }
      console.log("updated songs", songs);
    }

    await setCurrPlaylist({
      songs: songs,
      ...currPlaylist,
    });
  };

  useEffect(() => {
    loadData().then((data) => {
      setArtistInfo(data[0]);
      setAlbumInfo(data[1]);
    });
  }, []);

  useEffect(() => {
    console.log("HERE", props.id);
    if (currPlaylist && currPlaylist.songs.includes(props.id)) {
      setHidePlaylist(false);
    } else {
      setHidePlaylist(true);
    }
  }, [currPlaylist]);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea
          onMouseEnter={() => {
            try {
              if (!playing) {
                audio.currentTime = 60;
                audio.volume = 0.5;
                audio.play();
              }
            } catch (e) {
              console.log(e);
            }
          }}
          onMouseLeave={() => {
            try {
              if (!playing) {
                audio.pause();
                setAudio(new Audio(props.url));
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <CardMedia
            className={classes.media}
            component="img"
            alt="cover"
            height="140"
            image={
              albumInfo.cover == ""
                ? "https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/1aaeed10-90b9-484c-a575-79e1bad18ac3"
                : albumInfo.cover
            }
            //   className={classes.cover}
            title={albumInfo.name}
          />
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {props.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Album: {albumInfo.name} ({albumInfo.year})
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Artist: {artistInfo.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {playing && currSong != props.id && (
            <Button size="small" color="primary" onClick={play}>
              <PlayArrow />
            </Button>
          )}
          {!playing && (
            <Button size="small" color="primary" onClick={play}>
              <PlayArrow />
            </Button>
          )}
          {playing && currSong == props.id && (
            <Button size="small" color="primary" onClick={pause}>
              <Pause />
            </Button>
          )}
          {!props.hideAlbum && (
            <Link
              className={classes.link}
              to={{
                pathname: "/album",
                state: { artistInfo: artistInfo, albumInfo: albumInfo },
              }}
            >
              <Button size="small" color="primary" onClick={handleClick}>
                Go to album
              </Button>
            </Link>
          )}

          {!props.hideArtist && (
            <Link
              className={classes.link}
              to={{
                pathname: "/artist",
                state: { artistInfo: artistInfo },
              }}
            >
              <Button size="small" color="primary" onClick={handleClick}>
                Go to artist
              </Button>
            </Link>
          )}

          {hidePlaylist && (
            <Button size="small" color="primary" onClick={handleAddPlaylist}>
              + Playlist
            </Button>
          )}
          {!hidePlaylist && (
            <Button size="small" color="primary" onClick={handleRemovePlaylist}>
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
