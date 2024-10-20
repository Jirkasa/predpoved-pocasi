import DataLoadingManager from "../core/DataLoadingManager";
import AppLanguage from "./AppLanguage";
import LanguageDataLoader from "./data/LanguageDataLoader";
import LocalizedData from "./data/LocalizedData";

class LanguageLoadingManager extends DataLoadingManager<LocalizedData> {
    private languageDataLoader: LanguageDataLoader;
    private language: AppLanguage;

    constructor(languageDataLoader: LanguageDataLoader, language: AppLanguage) {
        super();
        this.languageDataLoader = languageDataLoader;
        this.language = language;
    }

    public setLanguage(language: AppLanguage): void {
        this.language = language;
    }

    protected async getData(abortSignal: AbortSignal): Promise<LocalizedData> {
        return await this.languageDataLoader.loadLanguage(this.language, abortSignal);
    }
}

export default LanguageLoadingManager;