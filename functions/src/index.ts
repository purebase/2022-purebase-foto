import * as functions from "firebase-functions";
import {Request, Response} from "firebase-functions";
import * as admin from "firebase-admin";
import {seller_initData} from "./init";

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
                res.send({error: "missing seller id", query: req.query});
            } else {
                seller_initData(id);
                res.send({success: "alles gut"});
            }
        }
    );