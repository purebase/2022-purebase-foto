import * as React from 'react';
import {AppContextProps} from "./data/AppContext";
import {useContext, useEffect} from "react";
import {PhotoAlbumsView} from "./views/PhotoAlbumsView";
import {
    Card
} from "react-daisyui";

function App() {

    const {db, loadMediaAlbums} = useContext(AppContext);

    useEffect(() => {
        loadMediaAlbums(db);

        // eslint-disable-next-line
    }, []);

  return (
      <>
          {/* card */}
          <Card className="shadow-2xl w-800 m-4">
              <figure>
                  <img src="https://picsum.photos/id/1005/500/250" />
              </figure>
              <Card.Body>
                  <Card.Title>DaisyUI Card</Card.Title>
                  <p>
                      Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
                      sit necessitatibus.
                  </p>
              </Card.Body>
          </Card>

        <PhotoAlbumsView/>
      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
