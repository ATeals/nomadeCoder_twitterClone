import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { authService } from "../firebaseInstance";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <div>
            {init ? (
                <AppRouter
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
