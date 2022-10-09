import PhotoAlbum, {Image, RenderPhoto} from "react-photo-album";
import * as React from "react";
import {AppContext} from "../App";
import {useContext, useEffect, useState} from "react";

import {IPhotoAlbum, PhotoAlbumView} from "./PhotoAlbumView";

type IPhotoAlbums = IPhotoAlbum[];

export const PhotoAlbumsView = () => {

    const {mediaAlbums} = useContext(AppContext);

    const [photoAlbums, setPhotoAlbums] = useState<IPhotoAlbums>();



    useEffect(() => {

        console.debug("mediaAlbums changed");
        if (mediaAlbums) {
            const albums:IPhotoAlbums = mediaAlbums?.map((mediaAlbum, index, array) => {
                return {
                    title: mediaAlbum.title,
                    cover: mediaAlbum.cover,
                    photos: mediaAlbum.children.map((media => {
/*                        const displayWidth = Math.round(media.width / 10);//226;//
                        const displayHeight = Math.round(media.height / 10);//302;//
                        */
                        // TODO Die Groesse an Verwendungsstelle umrechnen ist effizienter!!

                        return {
                            // INFO https://developers.google.com/photos/library/guides/access-media-items#image-base-urls
                            // Um 403 zu vermeiden, die src so laden - ist eh schon auf card-groesse:
                            //src: media.src + `=w${displayWidth}-h${displayHeight}-no?authuser=0`,
                            src: media.src,
                            //
                            width: media.width,
                            height: media.height
                        }
                    }))
                };

            });
            console.debug(albums);
            setPhotoAlbums(albums);
        }
    }, [mediaAlbums]);

    if (!photoAlbums) return null;

    return(
        <>
            {
                photoAlbums.map((album, index, array) => {
                    return (
                        <div key={index}>
                            <h4>{album.title}</h4>
                            <PhotoAlbumView title={album.title} cover={album.cover} photos={album.photos}/>

                        </div>
                    )
                })
            }
        </>
    );
}