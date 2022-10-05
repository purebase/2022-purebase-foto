// CASE SENSITIV!!
export const ALBUMS:string = 'ALBUMS';

export interface MediaAlbums {
    children: Array<MediaAlbum>
}
export interface MediaAlbum {
    id: string,
    children: Array<Media>
}
export interface Media {
    url: string
}


