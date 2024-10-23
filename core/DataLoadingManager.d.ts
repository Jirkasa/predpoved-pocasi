declare abstract class DataLoadingManager<LoadingResult> {
    private onLoadingStartedEventSource;
    private onDataLoadedEventSource;
    private onLoadingErrorEventSource;
    private abortController;
    protected abstract getData(abortSignal: AbortSignal): Promise<LoadingResult>;
    loadData(): Promise<undefined>;
    addOnLoadingStartedListener(callback: () => void): void;
    addOnDataLoadedListener(callback: (data: LoadingResult) => void): void;
    addOnLoadingErrorListener(callback: () => void): void;
}
export default DataLoadingManager;
