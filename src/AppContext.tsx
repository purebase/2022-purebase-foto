import React, {FC, useCallback, useMemo, useState} from "react";
import {doc, Firestore, getDoc} from "firebase/firestore";
import {AppContext} from "./App";
import {getFBFirestore, IFirebaseConfig} from "./firebase";
import {Blocks, BLOCKS, MAIN, USERS} from "./reactTypes";


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
    blocks: Blocks | undefined,
    setBlocks: (value: Blocks | undefined) => void,
    loadBlocks: (db: Firestore, sellerId: string) => void,
}


export const AppContextProvider:FC = (props) => {

    const db = useMemo<Firestore>(() => getFBFirestore(firebaseConfig), [firebaseConfig]);

    const [blocks, setBlocks] = useState<Blocks | undefined>();

    const loadBlocks = useCallback((db: Firestore, sellerId: string) => {
        const docRef = doc(db, USERS, sellerId, BLOCKS, MAIN);
        getDoc(docRef)
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.debug("loadBlocks() -> data: ", snapshot.data())
                    setBlocks(snapshot.data() as Blocks);
                } else {
                    console.debug('loadBlocks() > snapshot.exists() == false')
                }

            })
            .catch(reason => console.error("loadBlocks()", reason))
    }, []);


    return (
        <AppContext.Provider
            value={{
                db, blocks, setBlocks, loadBlocks
            }}>
            {props.children}
        </AppContext.Provider>
    )
};
