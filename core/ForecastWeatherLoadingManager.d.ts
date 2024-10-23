import WeatherData from "./data/WeatherData";
import WeatherDataLoader from "./data/WeatherDataLoader";
import DataLoadingManager from "./DataLoadingManager";
declare class ForecastWeatherLoadingManager extends DataLoadingManager<WeatherData[]> {
    private weatherDataLoader;
    private latitude;
    private longitude;
    private language;
    constructor(weatherDataLoader: WeatherDataLoader, latitude: number, longitude: number, language: string);
    setCoordinates(latitude: number, longitude: number): void;
    setLanguage(language: string): void;
    protected getData(abortSignal: AbortSignal): Promise<WeatherData[]>;
}
export default ForecastWeatherLoadingManager;
