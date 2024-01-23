export default interface IPokemonData {
    id: number;
    name: string;
    types: string[];
    image: string;
    location: {
        locations: string;
        versions: string[];
    }[];
    Games: string[];
    captured: boolean;
}