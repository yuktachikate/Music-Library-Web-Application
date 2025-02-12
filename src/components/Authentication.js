import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

export const AuthContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: "50% 50%",
  },
}));

export const AuthContextProvider = ({ children }) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(true);
  const [userId, setUserId] = useState("");
  const [currPlaylist, setCurrPlaylist] = useState({});

  useEffect(() => {
    try {
      app.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setLoadingIcon(false);
          setLoggedIn(true);
          setUserId(user.uid);
        } else {
          setUser(null);
          setLoadingIcon(false);
          setLoggedIn(true);
          setUserId("");
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  if (loadingIcon) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  }

  if (userId) {
    const userDB = app.firestore().collection("users").doc(userId);

    userDB.get().then((snapshot) => {
      if (!snapshot.exists) {
        userDB.set({
          userId: userId,
        });

        const playlistDB = userDB.collection("playlists").doc();
        const playlistId = playlistDB.id;
        userDB.collection("playlists").doc(playlistId).set({
          id: playlistId,
          name: "My Playlist",
          songs: [],
        });
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingIcon,
        loggedIn,
        userId,
        setUser,
        setLoggedIn,
        setUserId,
        setLoadingIcon,
        currPlaylist,
        setCurrPlaylist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
