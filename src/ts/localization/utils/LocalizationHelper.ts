import AppLanguage from "../AppLanguage";

class LocalizationHelper {
    public static getLocale(language: AppLanguage): string {
        switch (language) {
            case AppLanguage.ENGLISH:
                return "en";
            case AppLanguage.CZECH:
                return "cs";
            case AppLanguage.SLOVAK:
                return "sk";
            case AppLanguage.GERMAN:
                return "de";
        }
    }
}

export default LocalizationHelper;