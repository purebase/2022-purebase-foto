import React, {FC, useCallback, useMemo, useState} from "react";
import {collection, Firestore, getDocs, query} from "firebase/firestore";
import {AppContext} from "./App";
import {getFBFirestore, IFirebaseConfig} from "./firebase";
import {ALBUMS, MediaAlbums} from "./reactTypes";
import {MediaAlbum} from "../functions/src/_copy/reactTypesCopy";


const firebaseConfig: IFirebaseConfig = {
    apiKey: "AIzaSyAooKL8geS4oMmBnsjA3_bNF0KhXW3L4_M",
    authDomain: "purebase-foto.firebaseapp.com",
    projectId: "purebase-foto",
    storageBucket: "purebase-foto.appspot.com",
    messagingSenderId: "737592920586",
    appId: "1:737592920586:web:2f83bb34fa58dfc08f2df3",
    measurementId: "G-STER3YKM9G"
};

export interface AppContextProps {
    db: Firestore,
    mediaAlbums: MediaAlbums | undefined,
    setMediaAlbums: (value: MediaAlbums | undefined) => void,
    loadMediaAlbums: (db: Firestore) => void,
}


export const AppContextProvider:FC = (props) => {

    const db = useMemo<Firestore>(() => getFBFirestore(firebaseConfig), [firebaseConfig]);

    const [mediaAlbums, setMediaAlbums] = useState<MediaAlbums | undefined>();

    const loadMediaAlbums = useCallback(async (db: Firestore) => {
        // 1. Create reference of albums;
        // 2. Create snapshot - of all or by query:
        const albumsQuery = query(collection(db, ALBUMS));
            //const albumsQuery = query(collection(db, ALBUMS), where("id", "==", "aZtFGHwk86FJUtxb7"));
        // 3. Check whether its empty:
        const albumsSnap = await getDocs(albumsQuery);
        if (albumsSnap.empty) {
            console.log('No matching documents.');
            return;
        }
        // 4. Process data:
        const albums:MediaAlbums = [];
        albumsSnap.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            const album = doc.data() as MediaAlbum;
            albums.push(album);
        });
        // 5. set state:
        setMediaAlbums(albums);

            // Alternativ for 3. + 4.:
            /* getDocs(albumsQuery)
                .then(albumsSnap => {
                    albumsSnap.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });*/
    }, []);


    return (
        <AppContext.Provider
            value={{
                db, mediaAlbums, setMediaAlbums, loadMediaAlbums
            }}>
            {props.children}
        </AppContext.Provider>
    )
};
