import React, { useState } from "react";
import { authService, fbInstance } from "../firebaseInstance";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: { type, value },
        } = e;
        if (type === "email") setEmail(value);
        else if (type === "password") setPassword(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                //new account
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (e) {
            setError(e.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (e) => {
        const {
            target: { name },
        } = e;

        let provider;
        if (name === "google") {
            provider = new fbInstance.auth.GoogleAuthProvider();
        } else {
            //add sns
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                {error ? <div>{error}</div> : null}
                <input
                    type="submit"
                    value={newAccount ? "Creat Account" : "Log In"}
                />
                <div onClick={toggleAccount}>{newAccount ? "Login" : "Creat Account"}</div>
            </form>
            <div>
                <button
                    name="google"
                    onClick={onSocialClick}
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
};
export default Auth;
