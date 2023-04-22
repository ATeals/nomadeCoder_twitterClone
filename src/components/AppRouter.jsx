import React from "react";
import { HashRouter, Route, Routes, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Nav from "../routes/Nav";
import Profile from "../routes/Profile";

export default function AppRouter({ refreshUser, isLoggedIn, userObj }) {
    return (
        <HashRouter>
            <h1>Nwitter</h1>
            {isLoggedIn && <Nav userObj={userObj} />}
            <Routes>
                <Route
                    path="/"
                    element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
                />
                <Route
                    path="/profile"
                    element={
                        <Profile
                            userObj={userObj}
                            refreshUser={refreshUser}
                        />
                    }
                />
            </Routes>
        </HashRouter>
    );
}
