import LocationData from "./LocationData";

interface LocationSearch {
    search(search: string): Promise<LocationData[]>;
}

export default LocationSearch;