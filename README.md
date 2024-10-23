
# Předpověď počasí

Tento projekt je jednoduchá aplikace, která zobrazuje aktuální počasí a předpověď na dalších 5 dní. Je k dispozici [zde](https://jirkasa.github.io/predpoved-pocasi/).

## Spuštění/Sestavení aplikace lokálně

Pokud si chcete tuto aplikaci spustit/sestavit lokálně u sebe, tak můžete. Po stažení tohoto repozitáře spusťte příkaz `npm install`, pomocí kterého se nainstalují všechny potřebné balíčky definované v souboru package.json. Po instalaci můžete aplikaci spustit pro vývoj nebo ji sestavit do složky "dist" pro produkční užití. Následující tabulka popisuje příkazy definované v souboru package.json, pomocí kterých to můžete udělat.

| Příkaz | Popis |
| ------ | ----- |
| npm run dev | Spustí aplikaci pro vývoj na adrese http://localhost:3000/. |
| npm run build | Sestaví aplikaci pro produkční užití do složky "dist".

## Souborová struktura projektu

V kořenové složce projektu se nachází jen pár souborů a složka src obsahující zdrojový kód aplikace. Tyto soubory jsou popsány v následující tabulce.

| Soubor | Popis |
| ------ | ----- |
| package.json | Tento soubor obsahuje NPM balíčky, které je potřeba pro projekt nainstalovat, a také definuje příkazy pro sestavení aplikace a její spuštění pro vývoj. |
| README.md | Soubor s popisem aplikace, který si právě čtete |
| tsconfig.json | Soubor s konfigurací TypeScriptu |
| .gitignore | Tento soubor informuje Git o tom, které složky mají být ignorovány. Ignoruje se složka /node_modules a složka /dist, kterou vytváří Webpack a nachází se v ní sestavená aplikace |
| webpack.common.js | Tento soubor obsahuje společnou konfiguraci Webpacku pro vývoj a produkci. |
| webpack.dev.js | Tento soubor obsahuje konfiguraci Webpacku specifickou pro vývoj. |
| webpack.prod.js | Tento soubor obsahuje konfiguraci Webpacku pro produkci. |

Složka src obsahuje následující složky a soubory.

| Složka/Soubor | Popis |
| ------------- | ----- |
| icons/ | V této složce jsou umístěny SVG ikony spolu se souborem "main.js", do kterého se importují. Webpack ikony, které jsou v tomto souboru naimportované, bere a vytváří z nich SVG sprite. |
| less/ | V této složce jsou umístěny soubory pro CSS styly. Struktura této složky je popsána níže. |
| static/ | Tato složka obsahuje soubory jako jsou obrázky a tak podobně. Obsah této složky Webpack jednoduše jen kopíruje. |
| ts/ | V této složce jsou umístěny TypeScript soubory. Struktura této složky je popsána níže. |
| index.html | Tento soubor je hlavní (a jen jedna) stránka aplikace |

### Struktura složky less

Složka src/less obsahuje soubory s CSS styly, napsanými pomocí preprocesoru LESS. Pro jejich organizaci je použit [7-1 vzor](https://strukturovani-css-kodu.4fan.cz/rozdeleni-kodu-do-slozek/) a BEM metodika. Složka less tedy obsahuje hlavní soubor main.less, do kterého se importují ostatní soubory z jiných složek. Následující tabulka alespoň krátce popisuje, co jednotlivé podsložky složky less uchovávají za soubory.

| složka | Popis |
| ------ | ----- |
| abstracts/ | Obsahuje věci, které nejsou obsaženy ve vygenerovaném CSS souboru. |
| base/ | Obsahuje základní styly, jako je třeba reset CSS stylů, nastavení rem jednotky nebo třeba styly pro typografii. |
| components/ | Obsahuje různé komponenty (třeba search bar, tlačítko, atp.). |
| layout/ | Obsahuje komponenty pro tvorbu layoutu. |

### Struktura složky ts

Složka ts obsahuje veškeré TypeScript soubory. Nachází se v ní soubor main.ts, který představuje vstupní soubor, který je zpracováván Webpackem, soubor WeatherWebApp.ts, představující hlavní třídu aplikace (více o architektuře aplikace níže) a pár další podsložek. Tyto podsložky popisuje následující tabulka.

| Složka | Popis |
| ------ | ----- |
| core | V této složce se nachází kód pro jádro aplikace. Je nezávislé na GUI a použitém API. |
| data | V této složce se nachází komponenty, implementující rozhraní z jádra aplikace pro dotahování dat o počasí a lokací z Open Weather Map API. |
| localization | V této složce se nachází komponenty pro vytváření aplikace s podporou pro více jazyků. Až na typ LocalizedData, který obsahuje přeložená data pro konkrétní jazyk, jsou komponenty z této složky nezávislé na GUI. |
| gui | V této složce se nachází komponenty pro GUI (grafické uživatelské rozhraní) aplikace. Využívají kód ze složky core a localization. |

## Jak je nakonfigurován Webpack

Pro sestavení aplikace je použit Webpack. Pokud jej umíte, tak se můžete podívat do souborů webpack.common.js, webpack.dev.js a webpack.prod.js, jak je projekt nakonfigurovaný. Pokud ale Webpacku nerozumíte nebo nechcete konfigurační soubory zkoumat, tak jsem to tu stručně popsal.

Po spuštění příkazu `npm run build` dělá Webpack následující věci:
- V kořenové složce vytvoří složku dist, ve které bude sestavená aplikace pro produkční užití.
- Vytvoří HTML stránku pro aplikaci (vezme soubor src/index.html, zpracuje jej a umístí do složky dist).
- Vytvoří CSS soubor podle less souborů (souboru main.less ve složce src/less) a připojí jej na HTML stránku.
- Vytvoří JavaScript soubor podle souboru main.ts ve složce src/ts a připojí jej na HTML stránku.
- Zkopíruje složku static do složky dist.
- Podle ikon naimportovaný do souboru main.js ve složce src/icons vytvoří SVG sprite a umístí jej do složky dist/static.

## Architektura aplikace

Architektura aplikace byla již mírně popsána výše v částí "Struktura složky ts". Vstupním souborem, ze kterého začíná Webpack zpracovávat kód je soubor main.ts, který se nachází přímo ve složce ts. Jediný kód, který obsahuje, je vytvoření instance třídy WeatherWebApp, která je obsažena v souboru WeatherWebApp.ts a představuje hlavní třídu aplikace. V této třídě se aplikace inicializuje.

Jak je patrné již z částí o struktuře složky ts, kód aplikace je v podstatě rozčleněn na takové čtyři moduly, které tu teď jen krátce popíšu.

### Jádro aplikace

Složka core obsahuje kód pro jádro aplikace, které je nezávislé na jakémkoliv jiném kódu. Hlavní komponentou je třída WeatherApp, kterou potom používají různé GUI komponenty a načítají přes ni data o počasí, přihlašují se k odběru různých událostí, a tak podobně.

### Načítání dat

Jako parametr se do konstruktoru při vytváření instance třídy WeatherApp předává instance třídy implementující rozhraní WeatherDataLoader a LocationSearch. Rozhraní WeatherDataLoader definuje metody, které slouží k načítání dat o počasí, a rozhraní LocationSearch definuje metody pro načítání lokací podle textu nebo souřadnic.

Aplikace používá pro načítání dat o počasí a lokací Open Weather Map API. Projekt tedy obsahuje třídy OpenWeatherMapDataLoader a OpenWeatherMaLocationSearch, které rozhraní WeatherDataLoader a LocationSearch implementují. Najdete je ve složce data.

### Lokalizace

Aplikace je přeložena do více jazyků (v současnosti do čtyř). Kód pro lokalizaci se nachází ve složce localization. Takovou hlavní komponentou je třída LanguageManager, kterou mohou používat GUI komponenty a reagovat tak na změnu jazyka, nebo jazyk změnit.

### GUI

Veškeré komponenty týkající se GUI, najdete ve složce ui. Hlavní třídou je třída WeatherAppUI, pomocí které se GUI komponenty vytváří.

## Podpora prohlížečů

Aplikace by měla být podporována běžnými prohlížeči jako je Google Chrome, Microsoft Edge, atp.