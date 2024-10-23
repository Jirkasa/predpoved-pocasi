import AppLanguage from "../AppLanguage";
import LanguageDataLoader from "./LanguageDataLoader";
import LocalizedData from "./LocalizedData";
declare class JSONLanguageDataLoader implements LanguageDataLoader {
    private static readonly CZECH_JSON_FILE_PATH;
    private static readonly ENGLISH_JSON_FILE_PATH;
    private static readonly SLOVAK_JSON_FILE_PATH;
    private static readonly GERMAN_JSON_FILE_PATH;
    loadLanguage(language: AppLanguage, abortSignal: AbortSignal): Promise<LocalizedData>;
}
export default JSONLanguageDataLoader;
