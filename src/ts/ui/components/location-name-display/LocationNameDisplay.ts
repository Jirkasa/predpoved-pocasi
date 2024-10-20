import WeatherApp from "../../../core/WeatherApp";
import LanguageManager from "../../../localization/LanguageManager";
import LocalizationHelper from "../../../localization/utils/LocalizationHelper";

class LocationNameDisplay {
    private locationNameElement: HTMLElement;
    private weatherApp: WeatherApp;
    private languageManager: LanguageManager;

    constructor(locationNameElement: HTMLElement, weatherApp: WeatherApp, languageManager: LanguageManager) {
        this.locationNameElement = locationNameElement;
        this.weatherApp = weatherApp;
        this.languageManager = languageManager;

        this.updateLocationName();
        weatherApp.addOnLocationChangeListener(() => this.updateLocationName());
        languageManager.addOnLanguageChangeListener(() => this.updateLocationName());
    }

    private updateLocationName(): void {
        const locale = LocalizationHelper.getLocale(this.languageManager.getCurrentLanguage());
        this.locationNameElement.innerText = this.weatherApp.getCurrentLocationName(locale);
    }
}

export default LocationNameDisplay;