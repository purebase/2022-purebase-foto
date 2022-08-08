import * as React from 'react';
import Player from './Player';
import {Blocks} from "../functions/src/_copy/reactTypesCopy";
import {Firestore} from "firebase/firestore";
import {AppContextProps, AppContextProvider} from "./AppContext";

function App() {
  return (
      <AppContextProvider>
  <Player />
      </AppContextProvider>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
