# Mobile App - E-handel

En React Native-app byggd med Expo som visar och hanterar produkter från Strapi CMS.

## Funktioner

### Produkter
- **Hemskärm**: Visar hero-sektion och produkter från Strapi
- **Exempelprodukter**: Två produkter med lokala bilder visas ovanför Strapi-produkterna
- **Produktsida**: Visar alla produkter från Strapi med bilder och priser
- **Produktdetaljer**: Visar detaljerad information om en produkt med möjlighet att välja storlek

### Varukorg
- Lägga till produkter i varukorgen
- Ändra antal produkter
- Ta bort produkter
- Varukorgen sparas automatiskt och behålls mellan sessioner

### Beställningar
- **Kassa**: Formulär för att slutföra en beställning
- **Orderbekräftelse**: Bekräftelseskärm efter beställning
- **Orderhistorik**: Visar alla tidigare beställningar från Strapi

## Teknisk information

### Huvudkomponenter

- **CartContext** (`components/CartContext.tsx`): Hanterar varukorgens state och sparar i AsyncStorage
- **strapiConfig** (`lib/strapiConfig.ts`): Konfiguration för Strapi API-anslutning och bild-URL:er
- **strapiClient** (`packages/shared/src/strapiClient.ts`): Funktioner för att hämta produkter och orders från Strapi

### Screens

- **index.tsx**: Huvudskärm med hero-sektion och produkter
- **products.tsx**: Alla produkter från Strapi
- **ProductDetail.tsx**: Detaljerad produktvy
- **cart.tsx**: Varukorg
- **CheckoutScreen.tsx**: Kassa och beställningsformulär
- **OrderConfirmationScreen.tsx**: Bekräftelse efter beställning
- **orders.tsx**: Orderhistorik

### Datahantering

- **React Query**: Används för att hämta data från Strapi API
- **AsyncStorage**: Sparar varukorgen lokalt på enheten
- **Strapi Integration**: Produkter och orders hämtas från Strapi CMS

## Miljövariabler

Skapa en `.env` fil i `apps/mobile/` mappen:

```env
EXPO_PUBLIC_STRAPI_URL=http://192.168.0.24:1337
```

**Viktigt**: För fysiska enheter (iOS/Android) måste du använda din dators IP-adress istället för `localhost`.

## Installation och körning

```bash
# Installera dependencies
yarn install

# Starta appen
yarn start
```

## Struktur

```
apps/mobile/
├── app/                    # Screens och routing
│   └── (tabs)/            # Tab-navigation
├── components/            # Återanvändbara komponenter
├── lib/                   # Konfiguration och utilities
├── constants/             # Färger och tema
└── assets/               # Bilder och statiska filer
```

## Design

Appen använder en enkel och ren design med:
- Tydliga produktkort med bilder
- Enkel navigation med tabs
- Tydliga knappar och formulär
- Responsiv layout

## Funktioner som fungerar

✅ Visa produkter från Strapi  
✅ Lägga till produkter i varukorg  
✅ Hantera varukorg (lägg till, ta bort, ändra antal)  
✅ Slutföra beställning och spara i Strapi  
✅ Visa orderhistorik från Strapi  
✅ Exempelprodukter med lokala bilder  
