class PagesToggle {
    private loadingPage: HTMLElement;
    private weatherAppPage: HTMLElement;
    private errorPage: HTMLElement;

    constructor(loadingPage: HTMLElement, weatherAppPage: HTMLElement, errorPage: HTMLElement) {
        this.loadingPage = loadingPage;
        this.weatherAppPage = weatherAppPage;
        this.errorPage = errorPage;
    }

    public showLoadingPage(): void {
        this.loadingPage.style.removeProperty("display");
        this.weatherAppPage.style.display = "none";
        this.errorPage.style.display = "none";
    }

    public showWeatherAppPage(): void {
        this.loadingPage.style.display = "none";
        this.weatherAppPage.style.removeProperty("display");
        this.errorPage.style.display = "none";
    }

    public showErrorPage(): void {
        this.loadingPage.style.display = "none";
        this.weatherAppPage.style.display = "none";
        this.errorPage.style.removeProperty("display");
    }
}

export default PagesToggle;