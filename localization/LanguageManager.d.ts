import AppLanguage from "./AppLanguage";
import LanguageDataLoader from "./data/LanguageDataLoader";
import LanguageInfo from "./LanguageInfo";
declare class LanguageManager {
    private languageLoadingManager;
    private onLanguageChangeEventSource;
    private currentLanguage;
    constructor(languageDataLoader: LanguageDataLoader);
    changeLanguage(language: AppLanguage): Promise<undefined>;
    getCurrentLanguage(): AppLanguage;
    addOnLanguageLoadingStartedListener(callback: () => void): void;
    addOnLanguageChangeListener(callback: (languageInfo: LanguageInfo) => void): void;
    addOnLanguageLoadingErrorListener(callback: () => void): void;
    private onLanguageDataLoaded;
}
export default LanguageManager;
