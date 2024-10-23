import LocationData from "./LocationData";
interface LocationSearch {
    search(search: string, abortSignal: AbortSignal): Promise<LocationData[]>;
    searchByCoordinates(latitude: number, longitude: number, abortSignal: AbortSignal): Promise<LocationData | null>;
}
export default LocationSearch;
