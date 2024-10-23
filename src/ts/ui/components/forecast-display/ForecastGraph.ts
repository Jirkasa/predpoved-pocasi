import WeatherData from "../../../core/data/WeatherData";
import WeatherDataHelper from "../../../core/utils/WeatherDataHelper";
import LanguageManager from "../../../localization/LanguageManager";
import LocalizationHelper from "../../../localization/utils/LocalizationHelper";

enum CurrentGraphDisplayState {
    NONE,
    TEMPERATURE,
    FEELS_LIKE,
    PROBABILITY_OF_PERCEPTION,
    HUMIDITY
}

type GraphColorsConfig = {
    line: string;
    lineBackground: string | null;
    point: string;
    text: string;
}

class ForecastGraph {
    private static readonly TIMELINE_POINT_CSS_CLASS = "graph__timeline-point";
    private static readonly GRAPH_VERTICAL_PADDING = 32;
    private static readonly GRAPH_POINT_RADIUS = 3;
    private static readonly GRAPH_TEXT_POINT_OFFSET = 7;

    private canvas: HTMLCanvasElement;
    private timelineElement: HTMLElement;
    private languageManager: LanguageManager;
    private canvasCtx: CanvasRenderingContext2D;
    private currentDisplayState: CurrentGraphDisplayState = CurrentGraphDisplayState.NONE;
    private currentWeatherData: WeatherData[] | null = null;
    private currentPreviousGraphLastValue: number | null = null;
    private currentNextGraphFirstValue: number | null = null;

    constructor(canvas: HTMLCanvasElement, timelineElement: HTMLElement, languageManager: LanguageManager) {
        this.canvas = canvas;
        this.timelineElement = timelineElement;
        this.languageManager = languageManager;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx === null) throw new Error("Canvas 2D context is not supported.");
        this.canvasCtx = ctx;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        this.canvasCtx.font = "12px Ubuntu";
        this.canvasCtx.textAlign = "center";

        this.displayNone();

        const resizeObserver = new ResizeObserver(() => this.onCanvasResize());
        resizeObserver.observe(canvas);
        languageManager.addOnLanguageChangeListener(() => this.onLanguageChange());
    }

    public displayNone(): void {
        this.updateCurrentState(CurrentGraphDisplayState.NONE, null, null, null);

        this.drawGraphBackground();
    }

    public displayTemperature(data: WeatherData[], previousGraphLastValue: number | null = null, nextGraphFirstValue: number | null = null): void {
        this.updateCurrentState(CurrentGraphDisplayState.TEMPERATURE, data, previousGraphLastValue, nextGraphFirstValue);

        const temperatures: number[] = [];
        for (let item of data) {
            temperatures.push(Math.round(item.temperature));
        }

        this.updateTimeline(data);
        this.drawGraph(
            temperatures,
            previousGraphLastValue !== null ? Math.round(previousGraphLastValue) : null,
            nextGraphFirstValue !== null ? Math.round(nextGraphFirstValue) : null,
            "°C",
            {
                line: "#FABB33",
                lineBackground: "#FEF1D6",
                point: "#FABB33",
                text: "#856215"
            }
        );
    }

    public displayFeelsLike(data: WeatherData[], previousGraphLastValue: number | null = null, nextGraphFirstValue: number | null = null): void {
        this.updateCurrentState(CurrentGraphDisplayState.FEELS_LIKE, data, previousGraphLastValue, nextGraphFirstValue);

        const temperatures: number[] = [];
        for (let item of data) {
            temperatures.push(Math.round(item.feelsLike));
        }

        this.updateTimeline(data);
        this.drawGraph(
            temperatures,
            previousGraphLastValue !== null ? Math.round(previousGraphLastValue) : null,
            nextGraphFirstValue !== null ? Math.round(nextGraphFirstValue) : null,
            "°C",
            {
                line: "#FABB33",
                lineBackground: "#FEF1D6",
                point: "#FABB33",
                text: "#856215"
            }
        );
    }

    public displayProbabilityOfPerception(data: WeatherData[], previousGraphLastValue: number | null = null, nextGraphFirstValue: number | null = null): void {
        this.updateCurrentState(CurrentGraphDisplayState.PROBABILITY_OF_PERCEPTION, data, previousGraphLastValue, nextGraphFirstValue);

        const percentages: number[] = [];
        for (let item of data) {
            percentages.push(Math.round(item.probabilityOfPrecipitation * 100));
        }

        this.updateTimeline(data);
        this.drawGraph(
            percentages,
            previousGraphLastValue !== null ? Math.round(previousGraphLastValue) : null,
            nextGraphFirstValue !== null ? Math.round(nextGraphFirstValue) : null,
            "%",
            {
                line: "#33A0FA",
                lineBackground: null,
                point: "#33A0FA",
                text: "#155385"
            }
        );
    }

    public displayHumidity(data: WeatherData[], previousGraphLastValue: number | null = null, nextGraphFirstValue: number | null = null): void {
        this.updateCurrentState(CurrentGraphDisplayState.HUMIDITY, data, previousGraphLastValue, nextGraphFirstValue);

        const percentages: number[] = [];
        for (let item of data) {
            percentages.push(Math.round(item.humidity));
        }

        this.updateTimeline(data);
        this.drawGraph(
            percentages,
            previousGraphLastValue !== null ? Math.round(previousGraphLastValue) : null,
            nextGraphFirstValue !== null ? Math.round(nextGraphFirstValue) : null,
            "%",
            {
                line: "#33A0FA",
                lineBackground: "#D6ECFE",
                point: "#33A0FA",
                text: "#155385"
            }
        )
    }

    private drawGraph(values: number[], previousGraphLastValue: number | null, nextGraphFirstValue: number | null, valueUnit: string | null, colors: GraphColorsConfig): void {
        const stepSize = this.canvas.width / (values.length+1);
        const maxValue = this.getMaxValue(values, previousGraphLastValue, nextGraphFirstValue);
        const minValue = this.getMinValue(values, previousGraphLastValue, nextGraphFirstValue);

        this.drawGraphBackground();
        if (colors.lineBackground !== null) {
            this.drawGraphLineBackground(values, previousGraphLastValue, nextGraphFirstValue, stepSize, minValue, maxValue, colors.lineBackground);
        }
        this.drawGraphLine(values, previousGraphLastValue, nextGraphFirstValue, stepSize, minValue, maxValue, colors.line);
        this.drawGraphPoints(values, stepSize, minValue, maxValue, colors.point, colors.text, valueUnit);
    }

    private drawGraphBackground(): void {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasCtx.fillStyle = "#F2F2F3";
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawGraphLine(values: number[], previousGraphLastValue: number | null, nextGraphFirstValue: number | null, stepSize: number, minValue: number, maxValue: number, color: string): void {
        this.canvasCtx.strokeStyle = color;
        this.canvasCtx.lineWidth = 2;

        let pathStarted = false;
        this.canvasCtx.beginPath();
        if (previousGraphLastValue !== null) {
            const scaledValue = this.getScaledValue(previousGraphLastValue, minValue, maxValue);
            this.canvasCtx.moveTo(0, ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2));
            pathStarted = true;
        }
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const x = (i+1) * stepSize;
            const scaledValue = this.getScaledValue(value, minValue, maxValue);
            const y = ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2);
            if (pathStarted) {
                this.canvasCtx.lineTo(x, y);
            } else {
                pathStarted = true;
                this.canvasCtx.moveTo(x, y);
            }
        }
        if (nextGraphFirstValue !== null) {
            const scaledValue = this.getScaledValue(nextGraphFirstValue, minValue, maxValue);
            this.canvasCtx.lineTo(this.canvas.width, ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2));
        }
        this.canvasCtx.stroke();
    }

    private drawGraphLineBackground(values: number[], previousGraphLastValue: number | null, nextGraphFirstValue: number | null, stepSize: number, minValue: number, maxValue: number, color: string): void {
        this.canvasCtx.fillStyle = color;

        let pathStarted = false;
        this.canvasCtx.beginPath();
        if (previousGraphLastValue !== null) {
            const scaledValue = this.getScaledValue(previousGraphLastValue, minValue, maxValue);
            this.canvasCtx.moveTo(0, ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2));
            pathStarted = true;
        }
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const x = (i+1) * stepSize;
            const scaledValue = this.getScaledValue(value, minValue, maxValue);
            const y = ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2);
            if (pathStarted) {
                this.canvasCtx.lineTo(x, y);
            } else {
                pathStarted = true;
                this.canvasCtx.moveTo(x, y);
            }
        }
        if (nextGraphFirstValue !== null) {
            const scaledValue = this.getScaledValue(nextGraphFirstValue, minValue, maxValue);
            this.canvasCtx.lineTo(this.canvas.width, ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2));
            this.canvasCtx.lineTo(this.canvas.width, this.canvas.height);
        } else {
            this.canvasCtx.lineTo(values.length * stepSize, this.canvas.height);
        }

        if (previousGraphLastValue !== null) {
            this.canvasCtx.lineTo(0, this.canvas.height);
        } else {
            this.canvasCtx.lineTo(stepSize, this.canvas.height);
        }

        this.canvasCtx.closePath();
        this.canvasCtx.fill();
    }

    private drawGraphPoints(values: number[], stepSize: number, minValue: number, maxValue: number, color: string, textColor: string, valueUnit: string | null = null): void {
        for (let i = 0; i < values.length; i++) {
            const value = values[i];
            const x = (i+1) * stepSize;
            const scaledValue = this.getScaledValue(value, minValue, maxValue);
            const y = ForecastGraph.GRAPH_VERTICAL_PADDING + (1 - scaledValue) * (this.canvas.height-ForecastGraph.GRAPH_VERTICAL_PADDING*2);
            
            this.canvasCtx.fillStyle = color;
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(x, y, ForecastGraph.GRAPH_POINT_RADIUS, 0, ForecastGraph.GRAPH_POINT_RADIUS/2 * Math.PI);
            this.canvasCtx.fill();

            this.canvasCtx.fillStyle = textColor;
            this.canvasCtx.fillText(`${value}${valueUnit || ""}`, x, y-ForecastGraph.GRAPH_TEXT_POINT_OFFSET);
        }
    }

    private updateTimeline(data: WeatherData[]): void {
        const times: string[] = [];

        for (let item of data) {
            const date = WeatherDataHelper.unixTimeToDate(item.time);
            const time = date.toLocaleTimeString(
                LocalizationHelper.getLocale(this.languageManager.getCurrentLanguage()),
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }
            );
            times.push(time);
        }

        this.timelineElement.innerHTML = "";
        const percentage = 100/(times.length+1);

        for (let i = 0; i < times.length; i++) {
            const timelinePoint = document.createElement("div");
            timelinePoint.classList.add(ForecastGraph.TIMELINE_POINT_CSS_CLASS);
            timelinePoint.innerText = times[i];
            timelinePoint.style.left = `${percentage*(i+1)}%`;
            this.timelineElement.appendChild(timelinePoint);
        }
    }

    private getScaledValue(value: number, minValue: number, maxValue: number): number {
        if (maxValue-minValue === 0) return 0;
        return (value - minValue) / (maxValue - minValue);
    }

    private getMaxValue(values: number[], previousGraphValue: number | null, nextGraphValue: number | null): number {
        const valuesList = values.slice();
        if (previousGraphValue !== null) {
            valuesList.push(previousGraphValue);
        }
        if (nextGraphValue !== null) {
            valuesList.push(nextGraphValue);
        }
        return Math.max(...valuesList);
    }

    private getMinValue(values: number[], previousGraphValue: number | null, nextGraphValue: number | null): number {
        const valuesList = values.slice();
        if (previousGraphValue !== null) {
            valuesList.push(previousGraphValue);
        }
        if (nextGraphValue !== null) {
            valuesList.push(nextGraphValue);
        }
        return Math.min(...valuesList);
    }

    private updateCurrentState(displayState: CurrentGraphDisplayState, weatherData: WeatherData[] | null, previousGraphLastValue: number | null, nextGraphFirstValue: number | null): void {
        this.currentDisplayState = displayState;
        this.currentWeatherData = weatherData;
        this.currentPreviousGraphLastValue = previousGraphLastValue;
        this.currentNextGraphFirstValue = nextGraphFirstValue;
    }

    private onLanguageChange(): void {
        this.rerender();
    }

    private onCanvasResize(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        this.canvasCtx.font = "12px Ubuntu";
        this.canvasCtx.textAlign = "center";
        this.canvasCtx.textBaseline = 'bottom';

        this.rerender();
    }

    private rerender(): void {
        if (this.currentWeatherData === null) {
            this.displayNone();
            return;
        }

        switch (this.currentDisplayState) {
            case CurrentGraphDisplayState.TEMPERATURE:
                this.displayTemperature(this.currentWeatherData, this.currentPreviousGraphLastValue, this.currentNextGraphFirstValue);
                break;
            case CurrentGraphDisplayState.FEELS_LIKE:
                this.displayFeelsLike(this.currentWeatherData, this.currentPreviousGraphLastValue, this.currentNextGraphFirstValue);
                break;
            case CurrentGraphDisplayState.PROBABILITY_OF_PERCEPTION:
                this.displayProbabilityOfPerception(this.currentWeatherData, this.currentPreviousGraphLastValue, this.currentNextGraphFirstValue);
                break;
            case CurrentGraphDisplayState.HUMIDITY:
                this.displayHumidity(this.currentWeatherData, this.currentPreviousGraphLastValue, this.currentNextGraphFirstValue);
                break;
        }
    }
}

export default ForecastGraph;