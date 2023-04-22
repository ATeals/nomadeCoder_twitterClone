import React from "react";
import { Link } from "react-router-dom";

export default ({ userObj }) => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">[{userObj.displayName}] Profile</Link>
            </li>
        </ul>
    </nav>
);
