import LocationData from "../../../core/data/LocationData";
import WeatherApp from "../../../core/WeatherApp";
import LanguageInfo from "../../../localization/LanguageInfo";
import LanguageManager from "../../../localization/LanguageManager";
import ElementToggle from "../../utils/ElementToggle";
import LocationSearchBarResultsToggle from "./LocationSearchBarResultsToggle";

class LocationSearchBar {
    private static readonly RESULTS_CONTAINER_CSS_OPENED_MODIFIER = "search-bar__results--opened";
    private static readonly LOCATION_BUTTON_CSS_CLASS = "search-bar__item";
    private static readonly SEARCH_DELAY = 500;

    private input: HTMLInputElement;
    private itemsContainer: HTMLElement;
    private resultsContainerToggle: ElementToggle;
    private resultsContentToggle: LocationSearchBarResultsToggle;
    private weatherApp: WeatherApp;

    private searchTimoutId: number | null = null;

    constructor(input: HTMLInputElement, resultsContainer: HTMLElement, weatherApp: WeatherApp, languageManager: LanguageManager) {
        this.input = input;
        this.itemsContainer = document.createElement("div");
        this.resultsContainerToggle = new ElementToggle({
            targetElement: resultsContainer,
            openedCSSClass: LocationSearchBar.RESULTS_CONTAINER_CSS_OPENED_MODIFIER
        });
        this.resultsContentToggle = new LocationSearchBarResultsToggle(
            resultsContainer,
            this.itemsContainer,
            languageManager
        );
        this.weatherApp = weatherApp;

        this.input.addEventListener("input", () => this.onInputChange());
        this.input.addEventListener("focus", () => this.onInputFocus());
        this.input.addEventListener("focusout", () => this.onInputFocusOut()); // todo - ale potom při výběru pomocí tabu zjišťovat, jestli uživatel nepřešel na položku v results listu
        weatherApp.addOnLocationSearchLoadingStartedListener(() => this.onSearchLoadingStarted());
        weatherApp.addOnLocationSearchLoadedListener(data => this.onSearchResultsLoaded(data));
        weatherApp.addOnLocationSearchLoadingErrorListener(() => this.onSearchLoadingError());
        languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    private onSearchLoadingStarted(): void {
        this.resultsContentToggle.showLoadingIcon();
    }

    private onSearchResultsLoaded(data: LocationData[]): void {
        if (data.length > 0) {
            this.resultsContentToggle.showItems();
        } else {
            this.resultsContentToggle.showNoResultsMessage();
        }

        this.itemsContainer.innerHTML = "";

        for (let location of data) {
            const locationButton = document.createElement("button");
            locationButton.classList.add(LocationSearchBar.LOCATION_BUTTON_CSS_CLASS);
            locationButton.innerText = location.name; // todo - potom vzít local name
            this.itemsContainer.appendChild(locationButton);
        }
    }

    private onSearchLoadingError(): void {
        this.resultsContentToggle.showErrorMessage();
    }

    private onInputChange(): void { 
        const searchText = this.input.value.trim();

        if (this.searchTimoutId !== null) {
            window.clearTimeout(this.searchTimoutId);
        }

        if (searchText.length > 0) {
            this.resultsContainerToggle.open();

            this.searchTimoutId = window.setTimeout(() => {
                this.weatherApp.searchForLocation(searchText);
            }, LocationSearchBar.SEARCH_DELAY);
        } else {
            this.resultsContainerToggle.close();
        }
    }

    private onInputFocus(): void {
        const searchText = this.input.value.trim();

        if (searchText.length > 0) {
            this.resultsContainerToggle.open();
        }
    }

    private onInputFocusOut(): void {
        this.resultsContainerToggle.close();
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        // todo
        this.input.setAttribute("placeholder", languageInfo.localizedData.searchForLocation);
    }
}

export default LocationSearchBar;