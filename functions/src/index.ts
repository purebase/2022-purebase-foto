// @ts-ignore
import * as functions from "firebase-functions";
// @ts-ignore
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import {seller_initData} from "./init";
import axios from "axios";

admin.initializeApp();

export const oauth2callback = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
            const tokenType = req.query['token_type'] as string;
            if (tokenType === undefined) {
                res.send({error: "missing token_type", query: req.query});
            } else {
                res.send({token_type: tokenType});
            }
        }
    );

export const initseller = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
            const id = req.query['id'] as string;
            if (id === undefined) {
                res.send({error: "missing seller id of album", query: req.query});
            } else {
                seller_initData(id);
                res.send({success: "alles gut"});
            }
        }
    );

export const addAdobePortfolioAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
        // https://lightroom.adobe.com/shares/2b2d21abce0243cd94b163038dc4bf2b
    });

// aZtFGHwk86FJUtxb7
export const addGPhotoAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
            const id = req.query['id'] as string;
            if (id === undefined) {
                res.send({error: "addGPhotoAlbum: missing album id for parsing", query: req.query});
            } else {
                const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;

                axios.get('https://photos.app.goo.gl/' + id)
                    .then(async response => {

                        const images:{url:string}[] = [];

                        let match;
                        while (match = regex.exec(response.data)) {
                            const url = match[1];
                            images.push({url: url});
                        }

                        await admin.firestore()
                                .collection('ALBUMS')
                                .doc(id).set({
                                    children: images
                                }
                            );

                        res.send({"album image count": images.length});
                    })
                    .catch(reason => {
                        console.error(reason);
                        res.send({"error": reason});
                    });
            }
        }
    );