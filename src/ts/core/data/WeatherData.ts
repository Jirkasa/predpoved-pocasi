import PartOfDay from "./PartOfDay";

type WeatherData = {
    time: number;
    temperature: number;
    feelsLike: number;
    iconIdentifier: string;
    probabilityOfPrecipitation: number;
    humidity: number;
    windSpeed: number;
    partOfDay: PartOfDay;
}

export default WeatherData;