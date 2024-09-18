export interface SearchRes{
    href: string;
    items: Array<ArtistItem>
}

export interface ArtistItem{
    genres: Array<string>;
    id: string;
    images: Array<ImageItem>;
    name: string;

}

interface ImageItem{
    url: string;
    height: number;
    width: number;
}