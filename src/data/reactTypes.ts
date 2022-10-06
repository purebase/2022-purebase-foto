// CASE SENSITIV!!
export const ALBUMS:string = 'ALBUMS';

export type HOST_TYPE = 'adobe.ly' | 'photos.app.goo.gl';

export type MediaAlbums = MediaAlbum[];

export interface MediaAlbum {
    id: string,
    host: HOST_TYPE,
    url: string,
    title: string,
    children: Array<Media>,
    cover?: Media
}

export interface Media {
    src: string,
    width: number,
    height: number
}


