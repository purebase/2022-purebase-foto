// @ts-ignore
import * as functions from "firebase-functions";
// @ts-ignore
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import {ALBUMS, Media, MediaAlbum} from "./_copy/reactTypesCopy";

admin.initializeApp();

/*export const addAdobePortfolioAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
        // https://lightroom.adobe.com/shares/2b2d21abce0243cd94b163038dc4bf2b
    });*/

// aZtFGHwk86FJUtxb7
export const addGPhotoAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
            const id = req.query['id'] as string;
            if (id === undefined) {
                res.send({error: "addGPhotoAlbum: missing album id for parsing!", query: req.query});

            } else {
                const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

                axios.get('https://photos.app.goo.gl/' + id)
                    .then(async response => {
                        // 1. prepare images list:
                        const images:Media[] = [];
                        // 2. collect all image urls:
                        let match;
                        while (match = regex.exec(response.data)) {
                            images.push({url: match[1]});
                        }
                        // 3. create and persist new album:
                        const album:MediaAlbum = {id: id, children: images}
                        await admin.firestore()
                                .collection(ALBUMS)
                                .doc(id).set(album);
                        // 4. send client a feedback:
                        res.send({"album image count": images.length});

                    })
                    .catch(reason => {
                        res.send({"error": reason});
                    });
            }
        }
    );