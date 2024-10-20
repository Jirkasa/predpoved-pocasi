import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import DataLoadingManager from "./DataLoadingManager";

class LocationSearchByCoordinatesManager extends DataLoadingManager<LocationData | null> {
    private locationSearch: LocationSearch;
    private latitude: number = 0;
    private longitude: number = 0;

    constructor(locationSearch: LocationSearch) {
        super();
        this.locationSearch = locationSearch;
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    protected async getData(abortSignal: AbortSignal): Promise<LocationData | null> {
        return await this.locationSearch.searchByCoordinates(this.latitude, this.longitude, abortSignal);
    }
}

export default LocationSearchByCoordinatesManager;