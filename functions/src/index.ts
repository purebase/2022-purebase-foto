// @ts-ignore
import * as functions from "firebase-functions";
// @ts-ignore
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import {ALBUMS, HOST_TYPE, Media, MediaAlbum, MediaAlbums} from "./_copy/reactTypesCopy";

import * as cheerio from 'cheerio';

const REGION = 'europe-west1';

admin.initializeApp();

/*export const addAdobePortfolioAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
        // https://adobe.ly/3Swsocc
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
                // PLAYGROUND https://regex101.com/r/OrRoWk/1
                const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)",([0-9]*),([0-9]*)/g;
                let match;
                while (match = regex.exec(response.data)) {
                    console.log("images? - match[0]: ", match[0]);
                    images.push({url: match[1], width: Number(match[2]), height: Number(match[3])});
                }

                // # collect the title:
                // PLAYGROUND https://regex101.com/r/xMY9lf/1
                const regex2 = /<meta property="og:title" content="(.*?)">/g;
                const match2 =  regex2.exec(response.data);
                console.log("title? - match2[0]: ", match2 ? match2[0] : null);
                const title = match2 ? match2[1] : "UNKNOWN"

                // # create new album:
                const album: MediaAlbum = {
                    id: id, title: title, children: images,
                    host: host, url: rawUrl,
                    cover: images.pop() ?? undefined
                    //cover: images.length > 0 ? images.pop() : undefined
                };

                // # persist new album:
                await admin.firestore()
                    .collection(ALBUMS)
                    .doc(host + '-' + id).set(album);

                // # send client a feedback:
                res.send({"album_image_count": images.length});

            })
            .catch(reason => {
                res.send({"error": reason});
            });
        }
    );

export const tryCheerio = functions.region(REGION).https
    .onRequest(async (req: Request, res: Response) => {
        const rawUrl = req.query['url'] as string;

        if (rawUrl === undefined) {
            res.send({error: "parseGoogleAlbum: missing album url for parsing!!", query: req.query});
            return;
        }

        // TRY CHEERIO -> https://cheerio.js.org/

        const $ = cheerio.load('<h2 class="title">Hello world</h2>');

        $('h2.title').text('Hello there!');
        $('h2').addClass('welcome');

        console.log($.html());

        res.send({message: "parseGoogleAlbum DONE"});

    });

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