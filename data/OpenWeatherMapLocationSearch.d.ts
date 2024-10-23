import LocationData from "../core/data/LocationData";
import LocationSearch from "../core/data/LocationSearch";
declare class OpenWeatherMapLocationSearch implements LocationSearch {
    private static readonly SEARCH_ENDPOINT;
    private static readonly SEARCH_BY_COORDINATES_ENDPOINT;
    private static readonly LOCATIONS_LIMIT;
    private appId;
    constructor(appId: string);
    search(search: string, abortSignal: AbortSignal): Promise<LocationData[]>;
    searchByCoordinates(latitude: number, longitude: number, abortSignal: AbortSignal): Promise<LocationData | null>;
    private getLocationsDataFromJson;
}
export default OpenWeatherMapLocationSearch;
