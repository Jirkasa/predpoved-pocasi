import PartOfDay from "../data/PartOfDay";
import WeatherData from "../data/WeatherData";

export type DayWeatherData = {
    date: Date;
    data: WeatherData[]
}

export type AverageTemperatures = {
    dayTemperature: number | null;
    nightTemperature: number | null;
}

class WeatherDataHelper {
    public static unixTimeToDate(unixTime: number): Date {
        return new Date(unixTime * 1000);
    }

    public static groupWeatherDataByDay(data: WeatherData[]): DayWeatherData[] {
        const dataGroupedByDay = data.reduce((map: Map<number, WeatherData[]>, currentData: WeatherData) => {
            const date = this.unixTimeToDate(currentData.time);
            date.setHours(0, 0, 0, 0);
            const timeStamp = date.getTime();

            let dataList = map.get(timeStamp);
            if (!dataList) {
                dataList = [];
                map.set(timeStamp, dataList);
            }
            dataList.push(currentData);

            return map;
        }, new Map<number, WeatherData[]>());

        const dataDays: DayWeatherData[] = [];

        dataGroupedByDay.forEach((data, timeStamp) => {
            dataDays.push({
                date: new Date(timeStamp),
                data: data
            });
        });

        return dataDays;
    }

    public static getAverageTemperatures(dataList: WeatherData[]): AverageTemperatures {
        let dayCount = 0;
        let dayTemperatureSum = 0;
        let nightCount = 0;
        let nightTemperatureSum = 0;

        for (let data of dataList) {
            if (data.partOfDay === PartOfDay.DAY) {
                dayCount++;
                dayTemperatureSum += data.temperature;
            } else {
                nightCount++;
                nightTemperatureSum += data.temperature;
            }
        }

        return {
            dayTemperature: dayCount > 0 ? (dayTemperatureSum/dayCount) : null,
            nightTemperature: nightCount > 0 ? (nightTemperatureSum/nightCount) : null
        };
    }

    public static getPrevailingIconId(dataList: WeatherData[], partOfDay: PartOfDay): string | null {
        const iconIdCountMap = new Map<string, number>();

        for (let data of dataList) {
            if (data.partOfDay !== partOfDay) continue;
            let count = iconIdCountMap.get(data.iconIdentifier);
            if (count === undefined) count = 0;
            count++;
            iconIdCountMap.set(data.iconIdentifier, count);
        }

        let prevailingIconId: string | null = null;
        let count = 0;

        iconIdCountMap.forEach((iconIdCount, iconId) => {
            if (iconIdCount > count) {
                prevailingIconId = iconId;
                count = iconIdCount;
            }
        });

        return prevailingIconId;
    }
}

export default WeatherDataHelper;