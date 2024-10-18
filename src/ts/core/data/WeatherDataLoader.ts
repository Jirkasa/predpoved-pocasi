import CurrentWeatherData from "./CurrentWeatherData";
import WeatherData from "./WeatherData";

interface WeatherDataLoader {
    loadCurrentWeatherData(latitude: number, longitude: number) : Promise<CurrentWeatherData>;
    loadForecastWeatherData(latitude: number, longitude: number) : Promise<WeatherData[]>;
    // todo - ještě přidat metodu pro získání odkazu na ikonu podle předaného identifikátoru
}

export default WeatherDataLoader;