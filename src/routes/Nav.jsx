import React from "react";
import { Link } from "react-router-dom";

import style from "../css/Nav.module.css";

export default () => (
    <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
    </nav>
);
