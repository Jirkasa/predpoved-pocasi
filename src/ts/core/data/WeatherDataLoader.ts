import CurrentWeatherData from "./CurrentWeatherData";
import WeatherData from "./WeatherData";

interface WeatherDataLoader {
    loadCurrentWeatherData(latitude: number, longitude: number, language: string) : Promise<CurrentWeatherData>;
    loadForecastWeatherData(latitude: number, longitude: number, language: string) : Promise<WeatherData[]>;
    getIconURLByIconIdentifier(iconIdentifier : string, large : boolean) : string;
}

export default WeatherDataLoader;