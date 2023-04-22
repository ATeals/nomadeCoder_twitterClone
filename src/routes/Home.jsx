import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseInstance";
import { collection, addDoc, getDocs } from "firebase/firestore";

import Nweet from "../components/nweet";

export default function Home({ userObj }) {
    const [nweet, setNweet] = useState();
    const [nweets, setNweets] = useState([]);

    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(dbService, "nweets"));

    //     dbNweets.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         };
    //         setNweets((prev) => [nweetObj, ...prev]);
    //     });
    // };

    useEffect(() => {
        // getNweets();

        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setNweets(nweetArr);
        });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            createId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Text"
                    maxLength={120}
                    value={nweet}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={`Nweet`}
                />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.createId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}
