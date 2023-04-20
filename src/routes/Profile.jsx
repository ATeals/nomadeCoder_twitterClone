import React from "react";
import { authService } from "../firebaseInstance";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    let navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
