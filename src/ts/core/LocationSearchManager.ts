import LocationData from "./data/LocationData";
import LocationSearch from "./data/LocationSearch";
import DataLoadingManager from "./DataLoadingManager";

class LocationSearchManager extends DataLoadingManager<LocationData[]> {
    private locationSearch: LocationSearch;
    private searchText: string = "";

    constructor(locationSearch: LocationSearch) {
        super();
        this.locationSearch = locationSearch;
    }

    public setSearchText(searchText: string) : void {
        this.searchText = searchText;
    }

    protected async getData(abortSignal: AbortSignal): Promise<LocationData[]> {
        return await this.locationSearch.search(this.searchText, abortSignal);
    }
}

export default LocationSearchManager;