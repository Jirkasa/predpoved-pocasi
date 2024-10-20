import CurrentWeatherData from "../core/data/CurrentWeatherData";
import WeatherData from "../core/data/WeatherData";
import WeatherDataLoader from "../core/data/WeatherDataLoader";

class OpenWeatherMapDataLoader implements WeatherDataLoader {
    private static readonly CURRENT_WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
    private static readonly FORECAST_WEATHER_ENDPOINT = "https://api.openweathermap.org/data/2.5/forecast";
    private static readonly ICONS_URL = "https://openweathermap.org/img/wn/";
    private static readonly UNITS = "metric";

    private appId : string;

    constructor(appId : string) {
        this.appId = appId;
    }

    public async loadCurrentWeatherData(latitude: number, longitude: number, language: string, abortSignal: AbortSignal): Promise<CurrentWeatherData> {
        const queryParams = new URLSearchParams({
            appid: this.appId,
            lat: latitude.toString(),
            lon: longitude.toString(),
            units: OpenWeatherMapDataLoader.UNITS,
            lang: language
        });

        const response = await fetch(`${OpenWeatherMapDataLoader.CURRENT_WEATHER_ENDPOINT}?${queryParams.toString()}`, {
            signal: abortSignal
        });
        if (!response.ok) throw new Error("Current weather data could not be loaded.");

        const json = await response.json();
        console.log(json);

        const data = this.getCurrentWeatherDataFromJson(json);
        if (data === null) throw new Error("Current weather data could not be loaded.");

        return data;
    }

    public async loadForecastWeatherData(latitude: number, longitude: number, language: string, abortSignal: AbortSignal): Promise<WeatherData[]> {
        const queryParams = new URLSearchParams({
            appid: this.appId,
            lat: latitude.toString(),
            lon: longitude.toString(),
            units: OpenWeatherMapDataLoader.UNITS,
            lang: language
        });
        const response = await fetch(`${OpenWeatherMapDataLoader.FORECAST_WEATHER_ENDPOINT}?${queryParams.toString()}`, {
            signal: abortSignal
        });
        if (!response.ok) throw new Error("Forecast weather data could not be loaded.");

        const json = await response.json();

        const data = this.getForecastWeatherDataFromJson(json);
        if (data === null) throw new Error("Forecast weather data could not be loaded.");
        
        return data;
    }

    public getIconURLByIconIdentifier(iconIdentifier: string, large: boolean = false): string {
        const sizeValue = large ? "4x" : "2x";
        return `${OpenWeatherMapDataLoader.ICONS_URL}${iconIdentifier}@${sizeValue}.png`;
    }

    private getCurrentWeatherDataFromJson(json: any): CurrentWeatherData | null {
        if (typeof json !== "object") return null;

        const main = json.main;
        if (typeof main !== "object") return null;
        if (typeof main.temp !== "number") return null;
        if (typeof main.feels_like !== "number") return null;
        if (typeof main.humidity !== "number") return null;

        const weatherList = json.weather;
        if (!(weatherList instanceof Array)) return null;
        const weather = weatherList[0];
        if (typeof weather !== "object") return null;
        if (typeof weather.description !== "string") return null;
        if (typeof weather.icon !== "string") return null;

        const wind = json.wind;
        if (typeof wind !== "object") return null;
        if (typeof wind.speed !== "number") return null;

        return {
            temperature: main.temp,
            feelsLike: main.feels_like,
            description: weather.description,
            iconIdentifier: weather.icon,
            humidity: main.humidity,
            windSpeed: wind.speed
        };
    }

    private getForecastWeatherDataFromJson(json: any) : WeatherData[] | null {
        if (typeof json !== "object") return null;

        const list = json.list;
        if (!(list instanceof Array)) return null;

        const weatherDataList : WeatherData[] = [];

        for (let item of list) {
            if (typeof item.dt !== "number") return null;

            const main = item.main;
            if (typeof main !== "object") return null;
            if (typeof main.temp !== "number") return null;
            if (typeof main.feels_like !== "number") return null;
            if (typeof main.humidity !== "number") return null;

            const weatherList = item.weather;
            if (!(weatherList instanceof Array)) return null;
            const weather = weatherList[0];
            if (typeof weather !== "object") return null;
            if (typeof weather.icon !== "string") return null;

            if (typeof item.pop !== "number") return null;

            const wind = item.wind;
            if (typeof wind !== "object") return null;
            if (typeof wind.speed !== "number") return null;

            weatherDataList.push({
                time: item.dt,
                temperature: main.temp,
                feelsLike: main.feels_like,
                iconIdentifier: weather.icon,
                probabilityOfPrecipitation: item.pop,
                humidity: main.humidity,
                windSpeed: wind.speed
            });
        }

        return weatherDataList;
    }
}

export default OpenWeatherMapDataLoader;