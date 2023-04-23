import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseInstance";

import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";

export default function Home({ userObj }) {
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

    return (
        <div>
            <div>
                <NweetFactory userObj={userObj} />
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}
