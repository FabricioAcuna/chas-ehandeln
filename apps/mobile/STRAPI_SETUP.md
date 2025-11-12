# Strapi Integration Setup

Mobile-appen är nu konfigurerad för att hämta produkter från Strapi API.

## Environment Variables

För att appen ska kunna ansluta till din Strapi-instans behöver du sätta en environment variabel.

### För Expo/React Native

Skapa en `.env` fil i `apps/mobile/` mappen med följande innehåll:

```
EXPO_PUBLIC_STRAPI_URL=http://localhost:1337
```

Eller om din Strapi kör på en annan adress:

```
EXPO_PUBLIC_STRAPI_URL=http://192.168.1.100:1337
```

**Viktigt för mobil enheter:**
- Om du testar på en fysisk enhet eller emulator, använd din dators lokala IP-adress istället för `localhost`
- För Android emulator kan du använda `10.0.2.2:1337`
- För iOS simulator kan du använda `localhost:1337`

### Exempel

Om din Strapi kör på `http://localhost:1337`:

```env
EXPO_PUBLIC_STRAPI_URL=http://localhost:1337
```

Om din Strapi kör på en annan server:

```env
EXPO_PUBLIC_STRAPI_URL=https://your-strapi-server.com
```

## Installation

Efter att ha satt environment variabeln, installera dependencies:

```bash
cd apps/mobile
yarn install
```

## Starta appen

```bash
yarn start
```

## Funktioner

- ✅ Hämtar produkter från Strapi API
- ✅ Visar produktbilder från Strapi
- ✅ Stöd för produktbeskrivningar från Strapi
- ✅ Visar lagerstatus (inStock)
- ✅ Automatisk caching med React Query
- ✅ Error handling och loading states

## Teknisk information

Appen använder:
- `@tanstack/react-query` för data fetching
- `packages/shared/src/strapiClient.ts` för API-anrop
- `lib/strapiConfig.ts` för Strapi URL-konfiguration

