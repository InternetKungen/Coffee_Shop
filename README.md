# Coffee Shop

Coffee Shop är en e-handelsplattform riktad till caféer. Projektet är byggt med Vite, React och TypeScript, och använder Firebase-tjänster för databas, hosting, autentisering och lagring.

## Funktioner

- **Inbyggd CMS - Admin Panel**
  - **Product Manager**: Hantera produkter, lägg till nya, redigera befintliga och ta bort produkter.
  - **Order Manager**: Överblicka och hantera kundbeställningar.
  - **Profile Manager**: Hantera användarprofiler och deras behörigheter.

## Teknologier

- **Vite**: Byggverktyg och utvecklingsserver.
- **React**: JavaScript-bibliotek för att bygga användargränssnitt.
- **TypeScript**: Programmeringsspråk som bygger på JavaScript och lägger till statisk typkontroll.
- **Firebase**:
  - **Authentication**: Hanterar användarinloggningar och autentisering.
  - **Firestore**: Databastjänst för att lagra och synkronisera data.
  - **Hosting**: Webbhosting för att distribuera projektet.
  - **Storage**: Lagring av bilder och andra filer.

## Installation

Följ dessa steg för att installera och köra projektet lokalt:

1. Klona detta repository:
   ```sh
   git clone https://github.com/InternetKungen/Coffee_Shop.git
   ```
2. Navigera till projektets mapp:
  ```sh
  cd coffee-shop
  ```

3. Installera nödvändiga paket:
  ```sh
  npm install
  ```

4. Skapa en Firebase-projekt och konfigurera dina Firebase-nycklar i src/config/firebaseConfig.ts:

src/config/firebaseConfig.ts

## Starta utvecklingsservern:

```sh
npm run dev
```

## Distribution
För att distribuera projektet, kör följande kommando:

```sh
npm run build
```

Detta kommer att skapa en produktionsklar byggmapp som kan laddas upp till Firebase Hosting.

## Bidrag
Bidrag är välkomna! Skapa en pull request eller öppna en issue för att rapportera buggar eller föreslå förbättringar.

## Licens
~

Byggt med ❤️ och ☕
