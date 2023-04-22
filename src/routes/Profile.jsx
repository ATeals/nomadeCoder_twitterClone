import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebaseInstance";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, orderBy, query } from "firebase/firestore";

export default function Profile({ refreshUser, userObj }) {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };

    const getMyNweets = async () => {
        const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
        const nweets = await getDocs(q);

        nweets.forEach((doc) => {
            console.log(doc.id, `=>`, doc.data());
        });
    };

    // const getMyNweets = async () => {
    //     const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;

        setNewDisplayName(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
        }
        refreshUser();
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="Update Profile"
                />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}
