declare class WeatherWebApp {
    private static readonly OPEN_WEATHER_MAP_APP_ID;
    private static readonly LOCAL_STORAGE_COORDINATES_FIELD;
    private weatherApp;
    private languageManager;
    constructor();
    private onLocationChange;
    private onLanguageChange;
    private getCoordinatesFromLocalStorage;
    private getDefaultCoordinatesByLanguage;
    private getDefaultLanguage;
}
export default WeatherWebApp;
