import WeatherApp from "../../../core/WeatherApp";
import LanguageManager from "../../../localization/LanguageManager";
declare class LocationNameDisplay {
    private locationNameElement;
    private weatherApp;
    private languageManager;
    constructor(locationNameElement: HTMLElement, weatherApp: WeatherApp, languageManager: LanguageManager);
    private updateLocationName;
}
export default LocationNameDisplay;
