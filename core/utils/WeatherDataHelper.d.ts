import PartOfDay from "../data/PartOfDay";
import WeatherData from "../data/WeatherData";
export type DayWeatherData = {
    date: Date;
    data: WeatherData[];
};
export type AverageTemperatures = {
    dayTemperature: number | null;
    nightTemperature: number | null;
};
declare class WeatherDataHelper {
    static unixTimeToDate(unixTime: number): Date;
    static groupWeatherDataByDay(data: WeatherData[]): DayWeatherData[];
    static getAverageTemperatures(dataList: WeatherData[]): AverageTemperatures;
    static getPrevailingIconId(dataList: WeatherData[], partOfDay: PartOfDay): string | null;
}
export default WeatherDataHelper;
