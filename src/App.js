import React, { Component, useContext, useEffect, useState } from "react";
import "./styles/styles.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import SecureRoute from "./components/SecureRoute";
import HomePage from "./components/Homepage";
import Profile from "./components/Profile";
import { AuthContextProvider } from "./components/Authentication";
import NavBar from "./components/NavBar";
import PlayList from "./components/Playlist";
import Library from "./components/Library";
import { MediaContextProvider } from "./components/MediaContext";
import Album from "./components/Album";
import Artist from "./components/Artist";
import Search from "./components/Search";

function App() {
  return (
    <AuthContextProvider>
      <MediaContextProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <SecureRoute exact path="/profile" component={Profile} />
            <SecureRoute exact path="/library" component={Library} />
            <SecureRoute exact path="/playlist" component={PlayList} />
            <SecureRoute exact path="/album" component={Album} />
            <SecureRoute exact path="/artist" component={Artist} />
            <SecureRoute exact path="/search" component={Search} />
          </Switch>
        </Router>
      </MediaContextProvider>
    </AuthContextProvider>
  );
}

export default App;
