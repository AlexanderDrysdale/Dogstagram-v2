
export interface Image {
    id: string;
    url: string;
}

export interface FavouriteDog {
    created_at: Date;
    id: number;
    image: Image;
    image_id: string;
    sub_id: string;
    user_id: string;
}

