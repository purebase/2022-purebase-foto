import React, {FC, useCallback, useMemo, useState} from "react";
import {collection, Firestore, getDocs} from "firebase/firestore";
import {AppContext} from "./App";
import {getFBFirestore, IFirebaseConfig} from "./firebase";
import {ALBUMS, MediaAlbums} from "./reactTypes";


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
        /*        const docRef = doc(db, ALBUMS).;
                get(docRef)
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            console.debug("loadMediaAlbums() -> data: ", snapshot.data())
                            setMediaAlbums(snapshot.data() as MediaAlbums);
                        } else {
                            console.debug('loadMediaAlbums() > snapshot.exists() == false')
                        }

                    })
                    .catch(reason => console.error("loadMediaAlbums()", reason))*/

        // https://firebase.google.com/docs/firestore/query-data/get-data
        const querySnapshot = await getDocs(collection(db, ALBUMS));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
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
