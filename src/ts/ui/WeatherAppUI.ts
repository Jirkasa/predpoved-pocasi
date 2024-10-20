import WeatherApp from "../core/WeatherApp";
import LanguageInfo from "../localization/LanguageInfo";
import LanguageManager from "../localization/LanguageManager";
import LanguageSelect from "./components/language-select/LanguageSelect";
import LanguageUpdater from "./components/language-updater/LanguageUpdater";
import LocationSearchBar from "./components/location-search-bar/LocationSearchBar";
import PagesToggle from "./PagesToggle";

type WeatherAppUIConfig = {
    weatherApp: WeatherApp;
    languageManager: LanguageManager;
    loadingPageId: string;
    weatherAppPageId: string;
    languageSelectButtonId: string;
    languageSelectButtonFlagImageId: string;
    languageSelectButtonTextId: string;
    languageSelectItemsContainerId: string;
    languageSelectEnglishButtonId: string;
    languageSelectCzechButtonId: string;
    languageSelectSlovakButtonId: string;
    languageSelectGermanButtonId: string;
    locationSearchBarInputId: string;
    locationSearchBarResultsContainerId: string;
    currentWeatherHeadingId: string;
    forecastHeadingId: string;
    currentWeatherFeelsLikeLabelId: string;
    currentWeatherHumidityLabelId: string;
    currentWeatherWindLabelId: string;
}

class WeatherAppUI {
    private pagesToggle: PagesToggle;

    private languageLoaded: boolean = false;

    constructor(config: WeatherAppUIConfig) {

        this.pagesToggle = new PagesToggle(
            this.getElementById(config.loadingPageId),
            this.getElementById(config.weatherAppPageId)
        );

        const languageSelectButtonFlagImage = this.getElementById(config.languageSelectButtonFlagImageId);
        if (!(languageSelectButtonFlagImage instanceof HTMLImageElement)) {
            throw new Error(`Element with id ${config.languageSelectButtonFlagImageId} is not image element.`);
        }
        new LanguageSelect(
            config.languageManager,
            {
                selectButton: this.getElementById(config.languageSelectButtonId),
                selectButtonFlagImage: languageSelectButtonFlagImage,
                selectButtonText: this.getElementById(config.languageSelectButtonTextId),
                selectItemsContainer: this.getElementById(config.languageSelectItemsContainerId),
                englishButton: this.getElementById(config.languageSelectEnglishButtonId),
                czechButton: this.getElementById(config.languageSelectCzechButtonId),
                slovakButton: this.getElementById(config.languageSelectSlovakButtonId),
                germanButton: this.getElementById(config.languageSelectGermanButtonId)
            }
        );

        const locationSearchBarInput = this.getElementById(config.locationSearchBarInputId);
        if (!(locationSearchBarInput instanceof HTMLInputElement)) {
            throw new Error(`Element with id ${config.locationSearchBarInputId} is not input element.`);
        }
        new LocationSearchBar(
            locationSearchBarInput,
            this.getElementById(config.locationSearchBarResultsContainerId),
            config.weatherApp,
            config.languageManager
        );

        new LanguageUpdater(
            config.languageManager,
            {
                currentWeatherHeading: this.getElementById(config.currentWeatherHeadingId),
                forecastHeading: this.getElementById(config.forecastHeadingId),
                currentWeatherFeelsLikeLabel: this.getElementById(config.currentWeatherFeelsLikeLabelId),
                currentWeatherHumidityLabel: this.getElementById(config.currentWeatherHumidityLabelId),
                currentWeatherWindLabel: this.getElementById(config.currentWeatherWindLabelId)
            }
        );

        config.languageManager.addOnLanguageChangeListener(languageInfo => this.onLanguageChange(languageInfo));
    }

    private onLanguageChange(languageInfo: LanguageInfo): void {
        if (this.languageLoaded) return;

        // todo - update gui
        this.pagesToggle.showWeatherAppPage();

        this.languageLoaded = true;
    }

    private getElementById(id: string): HTMLElement {
        const element = document.getElementById(id);
        if (!(element instanceof HTMLElement)) {
            throw new Error(`Element with id ${id} does not exist.`);
        }
        return element;
    }
}

export default WeatherAppUI;