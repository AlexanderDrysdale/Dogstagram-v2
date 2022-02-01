export interface Weight {
    imperial: string;
    metric: string;
}

export interface Height {
    imperial: string;
    metric: string;
}

export default interface Breed {
    weight: Weight;
    height: Height;
    id: number;
    name: string;
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    reference_image_id: string;
}