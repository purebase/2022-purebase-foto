import * as React from "react";
import {FC, useEffect, useState} from "react";
import {IPhotoAlbum} from "./PhotoAlbumView";
import Button from "./Button";
import {Dimension, fitCastToStage} from "../common/ImageSizeCalc";

interface IPhotoAlbumDetailView extends IPhotoAlbum {
    index: number,
    close: () => void
}

export const PhotoAlbumDetailView:FC<IPhotoAlbumDetailView> = (p) => {
    const [url, setUrl] = useState<string>();

    const doClose = () => {
        setUrl(undefined);
        p.close();
    }

    useEffect(() => {
            if (p.index > -1) {
                const image = p.photos[p.index];
                const newSize:Dimension = fitCastToStage(
                    {width: image.width, height: image.height},
                    {width: window.innerWidth, height: window.innerHeight}
                );

                const urlParams = `=w${newSize.width}-h${newSize.height}-no?authuser=0`;

                console.log("url: ", url);

                setUrl(image.src + urlParams);
            }
        }, [p.index]);

    if (p.index === -1) return null;

    {/*
    https://larainfo.com/blogs/tailwind-css-3-overlay-image-example
    https://codepen.io/duncanmcclean/pen/GRoRRdR?editors=1000
    */}
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-900 flex flex-col items-center justify-center">
            <div className="object-cover w-full bg-cover bg-center text-center">
                <div className="flex flex-wrap justify-center" onClick={() => doClose()}>
                    <img src={url} referrerPolicy="no-referrer" className="max-w-full h-auto" alt=""/>
                </div>
                {/*<h2 className="text-3xl text-white">This is Overlay Image</h2>*/}
            </div>
            {/*<Button onClick={() => p.close()}>CLOSE</Button>*/}
        </div>
    );
}