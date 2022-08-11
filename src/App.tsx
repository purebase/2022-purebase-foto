import * as React from 'react';
import Player from './Player';
import {Blocks} from "../functions/src/_copy/reactTypesCopy";
import {Firestore} from "firebase/firestore";
import {AppContextProps, AppContextProvider} from "./AppContext";
import {useContext, useEffect} from "react";

function App() {

    const {db, loadBlocks} = useContext(AppContext);

    useEffect(() => {
        loadBlocks(db, "marmarita");

        // eslint-disable-next-line
    }, []);

  return (
    <Player />
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
