import PhotoAlbum, {Image, RenderPhoto} from "react-photo-album";
import * as React from "react";
import {AppContext} from "../App";
import {useContext, useEffect, useState} from "react";
import {Media} from "../data/reactTypes";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type IPhotoAlbums = IPhotoAlbum[];
interface IPhotoAlbum {
    title: string,
    cover: Media | undefined,
    photos: Image[];
}

const renderPhoto: RenderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => (
    <div
        style={{
            border: "2px solid #eee",
            borderRadius: "4px",
            boxSizing: "content-box",
            alignItems: "center",
            width: style?.width,
            padding: `${layoutOptions.padding - 2}px`,
            paddingBottom: 0,
        }}
    >
        <img referrerPolicy="no-referrer" {...restImageProps} alt={alt} style={{ ...style, width: "100%", padding: 0 }}/>
{/*        <div
            style={{
                paddingTop: "8px",
                paddingBottom: "8px",
                overflow: "visible",
                whiteSpace: "nowrap",
                textAlign: "center",
            }}
        >
            {layoutOptions.viewportWidth ? Math.round(layout.width) + " x " + Math.round(layout.height) : <>&nbsp;</>}
        </div>*/}
    </div>
);

const renderPhotoSimple: RenderPhoto = ({ layout, layoutOptions, imageProps: { alt, style, ...restImageProps } }) => (
    <img
         referrerPolicy="no-referrer"
         {...restImageProps}
         className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-md hover:shadow-xl"
         alt=""
    />
);

export const PhotoAlbumsView = () => {

    const {mediaAlbums} = useContext(AppContext);

    const [photoAlbums, setPhotoAlbums] = useState<IPhotoAlbums>();

    const [index, setIndex] = useState(-1);

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
                            {/*PROBLEM: teils 403 von Google -> https://developers.google.com/drive/api/guides/handle-errors*/}
                            {/*<PhotoAlbum layout="rows" photos={album.photos} renderPhoto={renderPhoto}/>*/}
                            <PhotoAlbum layout="rows" photos={album.photos} renderPhoto={renderPhoto}
                                        /*targetRowHeight={150}*/
                                        onClick={(event, photo, index) => setIndex(index)}/>

                            <Lightbox
                                slides={album.photos}
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                                // enable optional lightbox plugins
                                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                                />
                           {/* {
                                // alle Bilder werden geladen - referrerPolicy ist wichtig
                                album.photos.map((value, index, array) => {
                                    return(
                                        <img key={index}
                                            referrerPolicy="no-referrer"
                                             src={value.src} width={value.width} height={value.height}
                                             className="rounded-3xl max-w-full h-auto transition-shadow ease-in-out duration-300 shadow-md hover:shadow-xl"
                                             alt=""
                                        />
                                    )
                                })
                            }*/}

                        </div>
                    )
                })
            }
        </>
    );
}