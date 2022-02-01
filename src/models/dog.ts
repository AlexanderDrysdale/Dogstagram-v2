
import Breed from "./breed";

export default interface Dog {
    breeds: Breed[];
    id: string;
    url: string;
    width: number;
    height: number;
}

