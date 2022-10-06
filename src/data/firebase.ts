import {FirebaseApp, getApp, getApps, initializeApp} from "firebase/app";
import {Auth, connectAuthEmulator, getAuth} from "firebase/auth";
import {connectFirestoreEmulator, Firestore, getFirestore} from "firebase/firestore";
import {connectStorageEmulator, FirebaseStorage, getStorage} from "firebase/storage";
import {connectFunctionsEmulator, Functions, getFunctions} from "firebase/functions";
import {isRunningOnLocalhost} from "../commons";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export interface IFirebaseAppConfig {
  appId: string,
  measurementId: string
}

export interface IFirebaseConfig extends IFirebaseAppConfig{
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
}

let fbAuthInstance:Auth | undefined;
let fbFirestoreInstance:Firestore | undefined;
let fbStorageInstance:FirebaseStorage | undefined;
let fbFunctionsInstance:Functions | undefined;

function getFBApp(config: IFirebaseConfig): FirebaseApp {
    return (getApps().length === 0) ? initializeApp(config) : getApp();
}

function initFBAuth(config: IFirebaseConfig):Auth {
    fbAuthInstance = getAuth(getFBApp(config));
    if (fbAuthInstance && isRunningOnLocalhost()) {
        connectAuthEmulator(fbAuthInstance, "http://localhost:" + 9099);
    }
    return fbAuthInstance;
}

function initFBFirestore(config: IFirebaseConfig):Firestore {
    fbFirestoreInstance = getFirestore(getFBApp(config));
    if (isRunningOnLocalhost()) {
        connectFirestoreEmulator(fbFirestoreInstance, 'localhost', 8080);
    }
    return fbFirestoreInstance;
}

function initFBStorage(config: IFirebaseConfig):FirebaseStorage {
    fbStorageInstance = getStorage(getFBApp(config))
    if (isRunningOnLocalhost()) {
        connectStorageEmulator(fbStorageInstance, 'localhost', 9199);
    }
    return fbStorageInstance;
}

function initFBFunctions(config: IFirebaseConfig):Functions {
    fbFunctionsInstance = getFunctions(getFBApp(config), 'europe-west1')
    if (isRunningOnLocalhost()) {
        connectFunctionsEmulator(fbFunctionsInstance, 'localhost', 5001);
    }
    return fbFunctionsInstance;
}

// TODO init storage => https://firebase.google.com/docs/emulator-suite/connect_storage#web-v9

// TODO init functions => https://firebase.google.com/docs/emulator-suite/connect_functions#web-version-9

export function getFBAuth(config: IFirebaseConfig): Auth {
    return (fbAuthInstance) ? fbAuthInstance : initFBAuth(config);
}

export function getFBFirestore(config: IFirebaseConfig): Firestore {
    return (fbFirestoreInstance) ? fbFirestoreInstance : initFBFirestore(config);
}

export function getFBStorage(config: IFirebaseConfig): FirebaseStorage {
    return (fbStorageInstance) ? fbStorageInstance : initFBStorage(config);
}

export function getFBFunctions(config: IFirebaseConfig): Functions {
    return (fbFunctionsInstance) ? fbFunctionsInstance : initFBFunctions(config);
}

/*export function doFBBaseLogin(config: IFirebaseConfig, email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getFBAuth(config), email, password);
}*/

// TODO Return json or type: https://firebase.google.com/docs/reference/node/firebase.firestore.FirestoreDataConverter
