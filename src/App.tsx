import * as React from 'react';
import Player from './Player';
import {AppContextProps} from "./AppContext";
import {useContext, useEffect} from "react";

function App() {

    const {db, loadBlocks} = useContext(AppContext);

    useEffect(() => {
        loadBlocks(db, "marmarita");

        // eslint-disable-next-line
    }, []);

  return (
      <>
        <Player />

          <div className="flex flex-wrap justify-center">
              <img
                  src="https://lh3.googleusercontent.com/rpw0EMi6WCoaaIPdYO0o4cNUgEIzN6ziEVc71Q0F4d-lHUTI96hrIsR1AbAxMOpYZtzdEWEfn_xAuIvoaaC4K2o3KSFblnmNy3hUlNSWeEhNFCmR10FvEVkR4z-xZGc8Y7rmqm8a0jY"
                  className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                  alt=""
              />
          </div>

      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
