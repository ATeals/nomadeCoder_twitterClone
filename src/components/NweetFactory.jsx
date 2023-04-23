import React, { useState, useRef } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { dbService, storageServuce } from "../firebaseInstance";

export default function NweetFactory({ userObj }) {
    const fileInput = useRef();
    const [nweet, setNweet] = useState();
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageServuce, `${userObj.uid}/${uuidV4()}`);
            const res = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(res.ref);
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };

    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishEvent) => {
            const {
                currentTarget: { result },
            } = finishEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment();
        fileInput.current.value = "";
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Text"
                maxLength={120}
                value={nweet}
                onChange={onChange}
            />
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInput}
            />
            <input
                type="submit"
                value={`Nweet`}
            />
            {attachment && (
                <div>
                    <img
                        src={attachment}
                        width="100px"
                        height="auto"
                    />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
}
