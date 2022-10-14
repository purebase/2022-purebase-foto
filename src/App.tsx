import * as React from 'react';
import {AppContextProps} from "./data/AppContext";
import {useContext, useEffect} from "react";
import {PhotoAlbumsView} from "./views/PhotoAlbumsView";

function App() {

    const {db, loadMediaAlbums} = useContext(AppContext);

    useEffect(() => {
        loadMediaAlbums(db);

        // eslint-disable-next-line
    }, []);

  return (
      <>
        <PhotoAlbumsView/>
      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
