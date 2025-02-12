import React, { useState, useEffect, useContext } from "react";
import app from "../firebase/firebase";
import { AuthContext } from "./Authentication";

export const MediaContext = React.createContext();

export const MediaContextProvider = ({ children }) => {
  const { user, userId } = useContext(AuthContext);
  const [playing, setPlaying] = useState(false);
  const [currSong, setCurrSong] = useState("");
  const [switched, setSwitched] = useState("");
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [artists, setArtists] = useState([]);

  const loadPlaylist = async () => {
    if (user) {
      const userDB = app.firestore().collection("users").doc(user.uid);
      const playlistDB = await userDB.collection("playlists").get();
      let playlists = playlistDB.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return playlists[0];
    }
  };

  const updatePlaylistDB = async () => {
    if (user && currPlaylist) {
      const userDB = app.firestore().collection("users").doc(user.uid);
      await userDB
        .collection("playlists")
        .doc(currPlaylist.id)
        .set(currPlaylist)
        .then(() => {
          console.log("Update playlist");
        })
        .catch((e) => {
          console.log("Error updating playlist: ", e);
        });
    }
  };

  const loadData = async () => {
    const dataDB = app.firestore().collection("data");
    var allArtists = [];

    await dataDB.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let artistData = {
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
        };

        let albumInfo = [];
        dataDB
          .doc(doc.id)
          .collection("albums")
          .get()
          .then((albumSnapshot) => {
            albumSnapshot.forEach((album) => {
              let songInfo = [];

              album.data().songs.forEach((song) => {
                app
                  .firestore()
                  .collection("songs")
                  .doc(song)
                  .get()
                  .then((songSnapshot) => {
                    songInfo.push({
                      id: songSnapshot.id,
                      ...songSnapshot.data(),
                    });
                  });
              });

              albumInfo.push({
                id: album.id,
                songInfo: songInfo,
                ...album.data(),
              });
              //   console.log("DFJSKLJFDSKFSD", allAlbums);
            });
          });

        artistData = { albums: albumInfo, ...artistData };

        allArtists.push(artistData);
      });
    });
    return allArtists;
  };

  useEffect(() => {
    loadData().then((data) => {
      setArtists(data);
    });
  }, []);

  useEffect(() => {
    updatePlaylistDB();
  }, [currPlaylist]);

  useEffect(() => {
    loadPlaylist().then((data) => {
      setCurrPlaylist(data);
    });
  }, []);

  return (
    <MediaContext.Provider
      value={{
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
        artists,
        setArtists,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
