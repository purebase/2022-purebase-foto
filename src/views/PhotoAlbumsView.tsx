import PhotoAlbum, {Image} from "react-photo-album";
import * as React from "react";
import {AppContext} from "../App";
import {useContext, useEffect, useState} from "react";
import {Media} from "../data/reactTypes";

type IPhotoAlbums = IPhotoAlbum[];
interface IPhotoAlbum {
    title: string,
    cover: Media | undefined,
    photos: Image[];
}

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
                        const displayWidth = 226;//320;//Math.round(media.width / 10);
                        const displayHeight = 302;//240;//Math.round(media.height / 10);
                        return {
                            // INFO https://developers.google.com/photos/library/guides/access-media-items#image-base-urls
                            src: media.src + `=w${displayWidth}-h${displayHeight}-no?authuser=0`,
                            width: displayWidth,
                            height: displayHeight

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
                            {/*<PhotoAlbum layout="rows" photos={value.photos}/>*/}
                            {
                                album.photos.map((value, index, array) => {
                                    return(
                                        <img key={index}
                                             /*referrerPolicy="no-referrer"*/
                                            src={value.src} width={value.width} height={value.height}
                                            className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-md hover:shadow-xl"
                                            alt=""
                                        />
                                    )
                                })
                            }

                        </div>
                    )
                })
            }
        </>
    );
}