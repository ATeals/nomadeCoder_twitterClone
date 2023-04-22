import React, { useState } from "react";
import { dbService, storageServuce } from "../firebaseInstance";
import { ref, deleteObject } from "@firebase/storage";

export default function Nweet({ nweetObj, isOwner }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Delete Nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if (nweetObj.attachmentUrl !== "") {
                await deleteObject(ref(storageServuce, nweetObj.attachmentUrl));
            }
        }
    };
    const toggleEditting = () => setIsEditing((prev) => !prev);
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNewNweet(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet,
        });
        setIsEditing(false);
    };
    return (
        <div>
            {isEditing ? (
                <div>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            value={newNweet}
                            required
                            onChange={onChange}
                        />
                        <input
                            type="submit"
                            value={`Update`}
                        />
                    </form>
                    <button onClick={toggleEditting}>Cancel</button>
                </div>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img
                            src={nweetObj.attachmentUrl}
                            height="200px"
                            width="auto"
                        ></img>
                    )}
                    {isOwner ? (
                        <div>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditting}>Edit</button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    );
}
