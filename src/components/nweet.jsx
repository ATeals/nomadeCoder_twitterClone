import React, { useState } from "react";
import { dbService } from "../firebaseInstance";

export default function Nweet({ nweetObj, isOwner }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Delete Nweet?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
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
