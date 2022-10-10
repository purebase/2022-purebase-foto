import * as React from 'react';
import {AppContextProps} from "./data/AppContext";
import {useContext, useEffect} from "react";
import {PhotoAlbumsView} from "./views/PhotoAlbumsView";
import {SiteHeader} from "./views/SiteHeader";

function App() {

    const {db, loadMediaAlbums} = useContext(AppContext);

    useEffect(() => {
        loadMediaAlbums(db);

        // eslint-disable-next-line
    }, []);

    const photos = [
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            width: 320,
            height: 174
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212
        },

        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
        },
    ];

  return (
      <>
        {/*<Player />*/}

        <SiteHeader/>


        <PhotoAlbumsView/>

      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
