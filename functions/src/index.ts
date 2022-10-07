// @ts-ignore
import * as functions from "firebase-functions";
// @ts-ignore
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import {ALBUMS, HOST_TYPE, Media, MediaAlbum, MediaAlbums} from "./_copy/reactTypesCopy";
const Photos = require('googlephotos');

import * as cheerio from 'cheerio';

const REGION = 'europe-west1';

admin.initializeApp();

// ADOBE
// SHAREDLINK https://adobe.ly/3Swsocc
// TARGETSRC https://lightroom.adobe.com/shares/2b2d21abce0243cd94b163038dc4bf2b
// IMAGE https://lightroom.adobe.com/v2c/spaces/2b2d21abce0243cd94b163038dc4bf2b/assets/1c3173143fb6bb35e6a9f7b8b8aa9056/revisions/64fe3c6d32b5467588446e7fa3bc3c89/renditions/b050948ece60dc9277b1793dea0035bd
// Problem: An IMAGE kommt man nur nach dem Rendern ran :-(
/*export const addAdobePortfolioAlbum = functions.region('europe-west1').https
    .onRequest((req: Request, res: Response) => {
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
                    images.push({src: match[1], width: Number(match[2]), height: Number(match[3])});
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
                //const docName = encodeURIComponent(title)
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

export const connectAPI = functions.region(REGION).https
    .onRequest(async (req: Request, res: Response) => {
        // https://console.cloud.google.com/apis/credentials?authuser=0&project=purebase-foto
        // 1. Service enablen; 2. Cedentials; 3. API Key statt Oauth2
       // https://www.npmjs.com/package/googlephotos
        const photos = new Photos("--INSERT-API-KEY--");

        // https://developers.google.com/photos/library/reference/rest/v1/albums/list
        const response = await photos.albums.list(100);
        console.log("connectAPI() response: ", response);
        res.send(response);
    });
