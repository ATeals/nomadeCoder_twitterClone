import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { authService } from "../firebaseInstance";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setIsLoggedIn(false);
                setUserObj(null);
            }
            setInit(true);
        });
    }, []);
    return (
        <div>
            {init ? (
                <AppRouter
                    refreshUser={refreshUser}
                    isLoggedIn={isLoggedIn}
                    userObj={userObj}
                />
            ) : (
                <h1>Loading...</h1>
            )}
            <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
        </div>
    );
}

export default App;
