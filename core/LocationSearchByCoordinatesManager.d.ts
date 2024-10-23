import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import DataLoadingManager from "./DataLoadingManager";
declare class LocationSearchByCoordinatesManager extends DataLoadingManager<LocationData | null> {
    private locationSearch;
    private latitude;
    private longitude;
    constructor(locationSearch: LocationSearch);
    setCoordinates(latitude: number, longitude: number): void;
    protected getData(abortSignal: AbortSignal): Promise<LocationData | null>;
}
export default LocationSearchByCoordinatesManager;
