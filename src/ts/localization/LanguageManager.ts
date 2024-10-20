import EventSourcePoint from "../core/utils/EventSourcePoint";
import AppLanguage from "./AppLanguage";
import LanguageDataLoader from "./data/LanguageDataLoader";
import LocalizedData from "./data/LocalizedData";
import LanguageInfo from "./LanguageInfo";
import LanguageLoadingManager from "./LanguageLoadingManager";

class LanguageManager {
    private languageLoadingManager: LanguageLoadingManager;
    private onLanguageChangeEventSource = new EventSourcePoint<LanguageInfo>();

    private currentLanguage: AppLanguage;

    constructor(languageDataLoader: LanguageDataLoader) {
        this.currentLanguage = AppLanguage.ENGLISH;
        this.languageLoadingManager = new LanguageLoadingManager(languageDataLoader, this.currentLanguage);

        this.languageLoadingManager.addOnDataLoadedListener(data => this.onLanguageDataLoaded(data));
    }

    public async changeLanguage(language: AppLanguage): Promise<undefined> {
        this.currentLanguage = language;
        this.languageLoadingManager.setLanguage(language);
        this.languageLoadingManager.loadData();
    }

    public getCurrentLanguage(): AppLanguage {
        return this.currentLanguage;
    }

    public addOnLanguageLoadingStartedListener(callback: () => void): void {
        this.languageLoadingManager.addOnLoadingStartedListener(callback);
    }

    public addOnLanguageChangeListener(callback: (languageInfo: LanguageInfo) => void): void {
        this.onLanguageChangeEventSource.subscribe(callback);
    }

    public addOnLanguageLoadingErrorListener(callback: () => void): void {
        this.languageLoadingManager.addOnLoadingErrorListener(callback);
    }

    private onLanguageDataLoaded(localizedData: LocalizedData): void {
        this.onLanguageChangeEventSource.fire({
            language: this.currentLanguage,
            localizedData: localizedData
        });
    }
}

export default LanguageManager;