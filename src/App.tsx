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
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <div className="md:flex">
                  <div className="md:shrink-0">
                      <img className="h-48 w-full object-cover md:h-full md:w-48" src="/img/building.jpg"
                           alt="Modern building architecture"/>
                  </div>
                  <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats
                      </div>
                      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible
                          accomodation for your team</a>
                      <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome
                          food and take in some sunshine? We have a list of places to do just that.</p>
                  </div>
                  <PhotoAlbumsView/>
              </div>
          </div>

          <article className="prose lg:prose-xl">
              <h1>Garlic bread with cheese: What the science tells us</h1>
              <p>
                  For years parents have espoused the health benefits of eating garlic bread with cheese to their
                  children, with the food earning such an iconic status in our culture that kids will often dress
                  up as warm, cheesy loaf for Halloween.
              </p>
              <p>
                  But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
                  springing up around the country.
              </p>
          </article>



      </>
  );
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export default App;
