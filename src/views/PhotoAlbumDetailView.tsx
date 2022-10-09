import * as React from "react";
import {FC, useEffect, useState} from "react";
import {IPhotoAlbum} from "./PhotoAlbumView";
import Button from "./Button";

interface IPhotoAlbumDetailView extends IPhotoAlbum {
    index: number,
    close: () => void
}

export const PhotoAlbumDetailView:FC<IPhotoAlbumDetailView> = (p) => {
    const [url, setUrl] = useState<string>();

    useEffect(() => {
            if (p.index > -1) {
                console.log(p);
                const image = p.photos[p.index];
                console.log(image);

                const displayWidth = Math.round(image.width / 3);
                const displayHeight = Math.round(image.height / 3);
                const urlParams = `=w${displayWidth}-h${displayHeight}-no?authuser=0`;

                console.log("url: ", url);

                setUrl(image.src + urlParams)
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
                <div className="flex flex-wrap justify-center" onClick={() => p.close()}>
                    <img src={url} referrerPolicy="no-referrer" className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl" alt=""/>
                </div>
                {/*<h2 className="text-3xl text-white">This is Overlay Image</h2>*/}
            </div>
            {/*<Button onClick={() => p.close()}>CLOSE</Button>*/}
        </div>
    );
}