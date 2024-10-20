class PagesToggle {
    private loadingPage: HTMLElement;
    private weatherAppPage: HTMLElement;

    constructor(loadingPage: HTMLElement, weatherAppPage: HTMLElement) {
        this.loadingPage = loadingPage;
        this.weatherAppPage = weatherAppPage;
    }

    public showLoadingPage(): void {
        this.loadingPage.style.removeProperty("display");
        this.weatherAppPage.style.display = "none";
    }

    public showWeatherAppPage(): void {
        this.loadingPage.style.display = "none";
        this.weatherAppPage.style.removeProperty("display");
    }
}

export default PagesToggle;