import AppRouter from "./AppRouter";
import { useEffect, useState } from "react";
import { authService } from "../firebaseInstance";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    return (
        <div>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <h1>Loading...</h1>}
            <footer>&copy;{new Date().getFullYear()} Nwitter</footer>
        </div>
    );
}

export default App;
