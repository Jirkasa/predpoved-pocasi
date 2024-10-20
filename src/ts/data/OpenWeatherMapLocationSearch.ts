import LocationData from "../core/data/LocationData";
import LocationSearch from "../core/data/LocationSearch";

class OpenWeatherMapLocationSearch implements LocationSearch {
    private static readonly SEARCH_ENDPOINT = "http://api.openweathermap.org/geo/1.0/direct";
    private static readonly SEARCH_BY_COORDINATES_ENDPOINT = "http://api.openweathermap.org/geo/1.0/reverse";
    private static readonly LOCATIONS_LIMIT = 5;

    private appId : string;

    constructor(appId : string) {
        this.appId = appId;
    }

    public async search(search: string, abortSignal: AbortSignal): Promise<LocationData[]> {
        const queryParams = new URLSearchParams({
            appId: this.appId,
            limit: OpenWeatherMapLocationSearch.LOCATIONS_LIMIT.toString(),
            q: search
        });

        const response = await fetch(`${OpenWeatherMapLocationSearch.SEARCH_ENDPOINT}?${queryParams.toString()}`, {
            signal: abortSignal
        });
        if (!response.ok) throw new Error("Locations could not be loaded.");

        const json = await response.json();
        console.log(json);

        // todo - potom ještě odstranit kdyžtak duplicity

        const data = this.getLocationsDataFromJson(json);
        if (data === null) throw new Error("Locations could not be loaded.");

        return data;
    }

    public async searchByCoordinates(latitude: number, longitude: number, abortSignal: AbortSignal): Promise<LocationData | null> {
        const queryParams = new URLSearchParams({
            appId: this.appId,
            lat: latitude.toString(),
            lon: longitude.toString(),
            limit: "1"
        });

        const response = await fetch(`${OpenWeatherMapLocationSearch.SEARCH_BY_COORDINATES_ENDPOINT}?${queryParams.toString()}`, {
            signal: abortSignal
        });
        if (!response.ok) throw new Error("Location could not be loaded.");

        const json = await response.json();

        const data = this.getLocationsDataFromJson(json);
        if (data === null) throw new Error("Locations could not be loaded.");

        return data.length > 0 ? data[0] : null;
    }

    private getLocationsDataFromJson(json: any): LocationData[] | null {
        if (!(json instanceof Array)) return null;

        const locations : LocationData[] = [];

        for (let location of json) {
            if (typeof location !== "object") return null;
            if (typeof location.name !== "string") return null;
            if (typeof location.lat !== "number") return null;
            if (typeof location.lon !== "number") return null;

            const localNames = location.local_names;

            const localNamesMap = new Map<string, string>();

            if (typeof localNames === "object") {
                for (const [key, value] of Object.entries(localNames)) {
                    if (typeof value !== "string") return null;
                    localNamesMap.set(key, value);
                }
            }

            locations.push({
                name: location.name,
                localNames: localNamesMap,
                latitude: location.lat,
                longitude: location.lon
            });
        }
        
        return locations;
    }
}

export default OpenWeatherMapLocationSearch;