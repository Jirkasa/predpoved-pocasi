import EventSourcePoint from "./utils/EventSourcePoint";

abstract class DataLoadingManager<LoadingResult> {
    private onLoadingStartedEventSource = new EventSourcePoint<undefined>();
    private onDataLoadedEventSource = new EventSourcePoint<LoadingResult>();
    private onLoadingErrorEventSource = new EventSourcePoint<undefined>();

    private abortController: AbortController | null = null;

    protected abstract getData(abortSignal: AbortSignal): Promise<LoadingResult>;

    public async loadData(): Promise<undefined> {
        if (this.abortController) {
            this.abortController.abort();
        } else {
            this.onLoadingStartedEventSource.fire(undefined);
        }

        this.abortController = new AbortController();

        try {
            const data = await this.getData(this.abortController.signal);
            this.onDataLoadedEventSource.fire(data);
        } catch(err) {
            if (err instanceof Error && err.name === "AbortError") return;
            console.error(err);
            this.onLoadingErrorEventSource.fire(undefined);
        }

        this.abortController = null;
    }

    public addOnLoadingStartedListener(callback: () => void): void {
        this.onLoadingStartedEventSource.subscribe(callback);
    }

    public addOnDataLoadedListener(callback: (data: LoadingResult) => void): void {
        this.onDataLoadedEventSource.subscribe(callback);
    }

    public addOnLoadingErrorListener(callback: () => void): void {
        this.onLoadingErrorEventSource.subscribe(callback);
    }
}

export default DataLoadingManager;