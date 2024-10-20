import AppLanguage from "../AppLanguage";
import LanguageDataLoader from "./LanguageDataLoader";
import LocalizedData from "./LocalizedData";

class JSONLanguageDataLoader implements LanguageDataLoader {
    private static readonly CZECH_JSON_FILE_PATH = "./static/language/cz.json";
    private static readonly ENGLISH_JSON_FILE_PATH = "./static/language/en.json";
    private static readonly SLOVAK_JSON_FILE_PATH = "./static/language/sk.json";
    private static readonly GERMAN_JSON_FILE_PATH = "./static/language/de.json";

    public async loadLanguage(language: AppLanguage, abortSignal: AbortSignal): Promise<LocalizedData> {
        let jsonUrl: string;
        switch (language) {
            case AppLanguage.CZECH:
                jsonUrl = JSONLanguageDataLoader.CZECH_JSON_FILE_PATH;
                break;
            case AppLanguage.ENGLISH:
                jsonUrl = JSONLanguageDataLoader.ENGLISH_JSON_FILE_PATH;
                break;
            case AppLanguage.SLOVAK:
                jsonUrl = JSONLanguageDataLoader.SLOVAK_JSON_FILE_PATH;
                break;
            case AppLanguage.GERMAN:
                jsonUrl = JSONLanguageDataLoader.GERMAN_JSON_FILE_PATH;
                break;
        }

        const response = await fetch(jsonUrl, {
            signal: abortSignal
        });
        if (!response.ok) throw new Error("Language data could not be loaded.");

        const json = await response.json();
        
        const languageData : LocalizedData = json; // todo - kdyžtak to ještě zvalidovat, ale asi to není potřeba
        return languageData;
    }
}

export default JSONLanguageDataLoader;