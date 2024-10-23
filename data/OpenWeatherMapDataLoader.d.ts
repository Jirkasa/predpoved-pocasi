import CurrentWeatherData from "../core/data/CurrentWeatherData";
import WeatherData from "../core/data/WeatherData";
import WeatherDataLoader from "../core/data/WeatherDataLoader";
declare class OpenWeatherMapDataLoader implements WeatherDataLoader {
    private static readonly CURRENT_WEATHER_ENDPOINT;
    private static readonly FORECAST_WEATHER_ENDPOINT;
    private static readonly ICONS_URL;
    private static readonly UNITS;
    private appId;
    constructor(appId: string);
    loadCurrentWeatherData(latitude: number, longitude: number, language: string, abortSignal: AbortSignal): Promise<CurrentWeatherData>;
    loadForecastWeatherData(latitude: number, longitude: number, language: string, abortSignal: AbortSignal): Promise<WeatherData[]>;
    getIconURLByIconIdentifier(iconIdentifier: string, large?: boolean): string;
    private getCurrentWeatherDataFromJson;
    private getForecastWeatherDataFromJson;
}
export default OpenWeatherMapDataLoader;
