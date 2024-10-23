import DataLoadingManager from "../core/DataLoadingManager";
import AppLanguage from "./AppLanguage";
import LanguageDataLoader from "./data/LanguageDataLoader";
import LocalizedData from "./data/LocalizedData";
declare class LanguageLoadingManager extends DataLoadingManager<LocalizedData> {
    private languageDataLoader;
    private language;
    constructor(languageDataLoader: LanguageDataLoader, language: AppLanguage);
    setLanguage(language: AppLanguage): void;
    protected getData(abortSignal: AbortSignal): Promise<LocalizedData>;
}
export default LanguageLoadingManager;
