import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import DataLoadingManager from "./DataLoadingManager";
declare class LocationSearchManager extends DataLoadingManager<LocationData[]> {
    private locationSearch;
    private searchText;
    constructor(locationSearch: LocationSearch);
    setSearchText(searchText: string): void;
    protected getData(abortSignal: AbortSignal): Promise<LocationData[]>;
}
export default LocationSearchManager;
