import AppLanguage from "../AppLanguage";
import LocalizedData from "./LocalizedData";
interface LanguageDataLoader {
    loadLanguage(language: AppLanguage, abortSignal: AbortSignal): Promise<LocalizedData>;
}
export default LanguageDataLoader;
