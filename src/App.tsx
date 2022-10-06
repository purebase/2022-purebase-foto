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

          {/*<div className="flex flex-wrap justify-center">
              <img
                  src="https://lh3.googleusercontent.com/rpw0EMi6WCoaaIPdYO0o4cNUgEIzN6ziEVc71Q0F4d-lHUTI96hrIsR1AbAxMOpYZtzdEWEfn_xAuIvoaaC4K2o3KSFblnmNy3hUlNSWeEhNFCmR10FvEVkR4z-xZGc8Y7rmqm8a0jY"
                  className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                  alt=""
              />
          </div>*/}

        <PhotoAlbumsView/>

      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
