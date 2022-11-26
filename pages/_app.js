import "../styles/globals.css";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    //Kinda a hack, but a direct import at the top causes failures at the existing navigator missing.
    //So we have to ensure this isn't part of ssr
    useEffect(() => {
        require("share-api-polyfill");
    })
    return <Component {...pageProps} />;
}

export default MyApp;
