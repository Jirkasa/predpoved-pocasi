import WeatherApp from "../../../core/WeatherApp";
import LanguageManager from "../../../localization/LanguageManager";
declare class LocationSearchBar {
    private static readonly RESULTS_CONTAINER_CSS_OPENED_MODIFIER;
    private static readonly LOCATION_BUTTON_CSS_CLASS;
    private static readonly SEARCH_DELAY;
    private input;
    private itemsContainer;
    private resultsContainerToggle;
    private resultsContentToggle;
    private weatherApp;
    private languageManager;
    private searchTimoutId;
    constructor(input: HTMLInputElement, resultsContainer: HTMLElement, weatherApp: WeatherApp, languageManager: LanguageManager);
    private onSearchLoadingStarted;
    private onSearchResultsLoaded;
    private getLocationName;
    private onSearchLoadingError;
    private onInputChange;
    private onInputFocus;
    private onPageClick;
    private onLocationButtonClick;
    private onLanguageChange;
}
export default LocationSearchBar;
