import {FC, useState} from "react";
import {Media} from "../data/reactTypes";
import PhotoAlbum, {Image, RenderPhoto} from "react-photo-album";
import * as React from "react";

import {PhotoAlbumDetailView} from "./PhotoAlbumDetailView";

export interface IPhotoAlbum {
    title: string,
    cover: Media | undefined,
    photos: Image[];
}

export const PhotoAlbumView:FC<IPhotoAlbum> = (props) => {
    const [index, setIndex] = useState(-1);


    return (
        <>
            {/*PROBLEM: teils 403 von Google -> https://developers.google.com/drive/api/guides/handle-errors*/}
            {/*<PhotoAlbum layout="rows" photos={album.photos} renderPhoto={renderPhoto}/>*/}
            <PhotoAlbum layout="rows" photos={props.photos} renderPhoto={renderPhoto}
                /*targetRowHeight={150}*/
                        onClick={(event, photo, index) => setIndex(index)}/>

            
            <PhotoAlbumDetailView
                index={index}
                title={props.title}
                cover={props.cover}
                photos={props.photos}
                close={() => setIndex(-1)}
                />

        </>
    );
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