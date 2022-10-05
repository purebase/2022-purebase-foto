// @ts-ignore
import * as functions from "firebase-functions";
// @ts-ignore
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import {ALBUMS, HOST_TYPE, Media, MediaAlbum, MediaAlbums} from "./_copy/reactTypesCopy";

const REGION = 'europe-west1';

admin.initializeApp();

/*export const addAdobePortfolioAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
        // https://lightroom.adobe.com/shares/2b2d21abce0243cd94b163038dc4bf2b
    });*/

// aZtFGHwk86FJUtxb7
export const addGoogleAlbum = functions.region(REGION).https
    .onRequest(async (req: Request, res: Response) => {
        const rawUrl = req.query['url'] as string;

        if (rawUrl === undefined) {
            res.send({error: "addGoogleAlbum: missing album url for parsing!!", query: req.query});
            return;
        }

        // # Strip url:
        const urLSegments = rawUrl.split("/");
        const id = urLSegments.pop();
        const host = urLSegments.pop() as HOST_TYPE;
        if (id === undefined || host === undefined) {
            res.send({error: "addGoogleAlbum: generating id OR host FROM url not possible!!", query: req.query});
            return;
        }

        axios.get(rawUrl)
            .then(async response => {
                // # prepare images list:
                const images: Media[] = [];
                // # collect all image urls:
                const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;
                let match;
                while (match = regex.exec(response.data)) {
                    images.push({url: match[1]});
                }
                // https://photos.app.goo.gl/LNUqbxTMcARqGrh28
                // # create new album:
                const album: MediaAlbum = {
                    id: id, children: images,
                    host: host, url: rawUrl
                };
                // # persist new album:
                await admin.firestore()
                    .collection(ALBUMS)
                    .doc(host + '-' + id).set(album);
                // # send client a feedback:
                res.send({"album image count": images.length});

            })
            .catch(reason => {
                res.send({"error": reason});
            });
        }
    );

export const fetchMediaAlbums = functions.region(REGION).https
    .onRequest(async (req: Request, res: Response) => {
        // 1. Create reference of albums;
        const albumsRef = admin.firestore().collection(ALBUMS);
        // 2. Create snapshot - of all or by query:
        const albumsSnap = await albumsRef.get();
        //const albumsSnap = await albumsRef.where('id', '==', "aZtFGHwk86FJUtxb7").get();
        // 3. Check whether its empty:
        if (albumsSnap.empty) {
            res.send({error: "fetchMediaAlbums: No matching documents.", query: req.query});
            return;
        }
        // 4. Process data:
        console.log("albumsSnap by id?");
        const albums:MediaAlbums = [];
        albumsSnap.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            const album = doc.data() as MediaAlbum;
            albums.push(album);
        });
        // # send response:
        res.send(albums);
    });