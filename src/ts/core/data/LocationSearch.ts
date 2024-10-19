import LocationData from "./LocationData";

interface LocationSearch {
    search(search: string, abortSignal: AbortSignal): Promise<LocationData[]>;
}

export default LocationSearch;