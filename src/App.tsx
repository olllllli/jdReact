import { FunctionComponent, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import LandingPage from "routes/LandingPage";
import AdvPage from "routes/AdvPage";
import PlayersPage from "routes/PlayersPage";
import StatsPage from "routes/StatsPage";
import ErrorPage from "routes/ErrorPage";
import LoadingPage from "routes/LoadingPage";
import { cache } from "index";

console.log("App Loading");

const App: FunctionComponent<{}> = () => {
    // initialise the api and return a loading page until it has been
    const [initialised, setInitialised] = useState<boolean>(false);

    useEffect(() => {
        async function initialiseAPI() {
            await cache.init();
            setInitialised(true);
        }
        // init the api
        initialiseAPI();
    }, []);

    // determine what to send
    if (initialised) {
        return (
            <Routes>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<LandingPage />} />

                <Route path="/advancements" element={<AdvPage />} />
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/stats" element={<StatsPage />} />
            </Routes>
        );
    } else {
        return <LoadingPage />;
    }
};

export default App;
