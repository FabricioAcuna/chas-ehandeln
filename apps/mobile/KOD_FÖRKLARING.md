# Kodförklaring - Mobile App

Detta är en pedagogisk guide som förklarar hur koden fungerar. Den är skriven för att hjälpa dig förstå och förbereda dig inför presentationen.

---

## 📁 Mappstruktur - Översikt

```
apps/mobile/
├── app/                    # Alla skärmar (screens) i appen
├── components/             # Återanvändbara komponenter
├── lib/                    # Hjälpfunktioner och konfiguration
├── constants/              # Färger och tema
└── assets/                 # Bilder och statiska filer
```

---

## 🎯 Huvudfiler - Vad gör de?

### `app/_layout.tsx` - Appens startpunkt

**Vad gör den?** Detta är den första filen som körs när appen startar.

**Vad händer här?**

- Sätter upp React Query (för att hämta data från Strapi)
- Omsluter appen med CartProvider (så att varukorgen fungerar överallt)
- Detta är som en "wrapper" som ger alla skärmar tillgång till samma verktyg

**Enkelt sagt:** Detta är appens "grund" som gör att allt annat fungerar.

---

### `app/(tabs)/_layout.tsx` - Tab-navigation

**Vad gör den?** Skapar de nedre flikarna (tabs) i appen.

**Vad finns här?**

- **Hem** - Huvudskärmen
- **Produkter** - Alla produkter
- **Orders** - Orderhistorik
- **Korg** - Varukorg

**Enkelt sagt:** Detta är navigationsmenyn längst ner i appen.

---

## 📱 Skärmar (Screens) - Vad gör varje skärm?

### `app/(tabs)/index.tsx` - Hemskärmen

**Vad gör den?**

- Visar en hero-sektion (stor bild och text längst upp)
- Visar exempelprodukter (Chelsea Jersey och Pro Boots) med lokala bilder
- Visar produkter från Strapi under exempelprodukterna

**Hur fungerar den?**

1. Hämtar produkter från Strapi med `strapiGetProducts()`
2. Skapar två exempelprodukter lokalt
3. Kombinerar dem och visar alla tillsammans

**Viktiga delar:**

- `useQuery` - Hämtar produkter från Strapi
- `exampleProducts` - Två produkter med lokala bilder
- `allProducts` - Kombinerar exempelprodukter + Strapi-produkter

---

### `app/(tabs)/products.tsx` - Produktsidan

**Vad gör den?** Visar alla produkter i en lista.

**Hur fungerar den?**

1. Visar två exempelprodukter (Chelsea Jersey och Pro Boots) med lokala bilder
2. Hämtar produkter från Strapi
3. Kombinerar exempelprodukter och Strapi-produkter
4. Visar varje produkt som ett kort med bild, namn och pris
5. När man klickar på ett kort → går till produktdetaljer

**Viktiga delar:**

- `exampleProducts` - Två produkter med lokala bilder
- `strapiGetProducts()` - Hämtar produkter från Strapi
- `getStrapiImageUrl()` - Fixar bild-URL:er så de fungerar på mobil
- `allProducts` - Kombinerar exempelprodukter + Strapi-produkter

---

### `app/(tabs)/ProductDetail.tsx` - Produktdetaljer

**Vad gör den?** Visar detaljerad information om en produkt.

**Hur fungerar den?**

1. Tar emot produkt-ID från navigering
2. Kontrollerar om det är en exempelprodukt eller Strapi-produkt
3. Visar bild, namn, pris, beskrivning
4. Låter användaren välja storlek (S, M, L, XL)
5. Knapp för att lägga till i varukorg

**Viktiga delar:**

- `exampleProducts` - Lista med exempelprodukter
- `handleAddToCart()` - Lägger till produkt i varukorg
- Hanterar både exempelprodukter och Strapi-produkter

---

### `app/(tabs)/cart.tsx` - Varukorg

**Vad gör den?** Visar alla produkter som användaren lagt i varukorgen.

**Hur fungerar den?**

1. Hämtar produkter från `CartContext` (varukorgens state)
2. Visar varje produkt med bild, namn, pris, storlek
3. Låter användaren ändra antal (+/-)
4. Låter användaren ta bort produkter
5. Visar total summa
6. Knapp för att gå till kassan

**Viktiga delar:**

- `useCart()` - Hämtar varukorgens funktioner
- `updateQuantity()` - Ändrar antal produkter
- `removeFromCart()` - Tar bort produkt

---

### `app/(tabs)/CheckoutScreen.tsx` - Kassan

**Vad gör den?** Formulär för att slutföra en beställning.

**Hur fungerar den?**

1. Visar formulär för leveransinformation (namn, email, adress, etc.)
2. Visar orderöversikt (vad användaren köper)
3. Validerar att alla fält är ifyllda
4. När användaren bekräftar:
   - Simulerar betalning (väntar 1.5 sekunder)
   - Skapar ett order-objekt
   - Sparar order lokalt i AsyncStorage
   - Rensar varukorgen
   - Navigerar till bekräftelseskärmen

**Viktiga delar:**

- `validateForm()` - Kontrollerar att formuläret är korrekt ifyllt
- `handleCheckout()` - Hanterar hela checkout-processen
- `saveLocalOrder()` - Sparar order lokalt

---

### `app/(tabs)/OrderConfirmationScreen.tsx` - Bekräftelse

**Vad gör den?** Visar bekräftelse efter slutförd beställning.

**Hur fungerar den?**

1. Visar en grön bock-ikon
2. Visar "Tack för din beställning!"
3. Två knappar:
   - "Tillbaka till hem" - Går till hemskärmen
   - "Visa mina ordrar" - Går till orderhistoriken

**Enkelt sagt:** En bekräftelseskärm som säger "Klar!".

---

### `app/(tabs)/orders.tsx` - Orderhistorik

**Vad gör den?** Visar alla tidigare beställningar.

**Hur fungerar den?**

1. Hämtar orders från lokal lagring (AsyncStorage)
2. Visar varje order som ett kort med:
   - Ordernummer
   - Datum
   - Status (Betalad/Väntande/Skickad)
   - Alla produkter i ordern
   - Total summa
3. Sorterar orders med nyaste först

**Viktiga delar:**

- `getLocalOrders()` - Hämtar orders från AsyncStorage
- `useEffect()` - Laddar orders när skärmen öppnas
- Orders sparas bara lokalt (inte i Strapi) - endast för demonstration

---

## 🧩 Komponenter - Återanvändbara delar

### `components/CartContext.tsx` - Varukorgens hjärna

**Vad gör den?** Hanterar allt som har med varukorgen att göra.

**Vad kan den göra?**

- `addToCart()` - Lägger till produkt i varukorg
- `removeFromCart()` - Tar bort produkt
- `updateQuantity()` - Ändrar antal
- `clearCart()` - Tömmer varukorgen
- `total` - Räknar ut total summa
- `totalItems` - Räknar totalt antal produkter

**Hur fungerar den?**

- Använder React Context (delar state mellan alla skärmar)
- Sparar automatiskt i AsyncStorage (så varukorgen behålls mellan sessioner)
- Alla skärmar kan använda `useCart()` för att komma åt varukorgen

**Enkelt sagt:** Detta är varukorgens "hjärna" som alla skärmar använder.

---

## 🔧 Hjälpfunktioner (lib/) - Tekniska verktyg

### `lib/strapiConfig.ts` - Strapi-konfiguration

**Vad gör den?** Konfigurerar anslutningen till Strapi (CMS).

**Vad gör den?**

1. Hämtar Strapi URL från environment variabel (`EXPO_PUBLIC_STRAPI_URL`)
2. `getStrapiImageUrl()` - Fixar bild-URL:er:
   - Om bild-URL innehåller `localhost` → ersätter med korrekt IP-adress
   - Detta behövs för att bilder ska fungera på fysiska enheter

**Varför behövs den?**

- På fysiska enheter fungerar inte `localhost`
- Måste använda datorns IP-adress (t.ex. `192.168.0.24:1337`)

---

### `lib/orderStorage.ts` - Lokal orderlagring

**Vad gör den?** Hanterar sparande och hämtning av orders lokalt.

**Funktioner:**

- `getLocalOrders()` - Hämtar alla orders från AsyncStorage
- `saveLocalOrder()` - Sparar en ny order lokalt

**Varför lokalt?**

- Orders sparas bara i appen (inte i Strapi)
- Endast för demonstration
- Orders försvinner om appen raderas

---

## 🎨 Design och färger

### `constants/theme.ts` - Färger och tema

**Vad gör den?** Definierar alla färger som används i appen.

**Vad finns här?**

- `Colors.light` - Färger för ljust tema
- `Colors.dark` - Färger för mörkt tema (används inte just nu)
- Primärfärg: `#0070f3` (blå)

**Hur används den?**

- Alla skärmar importerar `Colors` och använder färgerna
- Exempel: `backgroundColor: Colors.light.primary`

---

## 📦 Externa bibliotek - Vad används?

### React Query (`@tanstack/react-query`)

**Vad gör den?** Hanterar hämtning av data från Strapi.

**Varför används den?**

- Automatisk caching (sparar data så den inte behöver hämtas om och om igen)
- Automatisk uppdatering
- Enkel felhantering

**Var används den?**

- `index.tsx` - Hämtar produkter
- `products.tsx` - Hämtar produkter
- `ProductDetail.tsx` - Hämtar produkter

---

### AsyncStorage (`@react-native-async-storage/async-storage`)

**Vad gör den?** Sparar data lokalt på enheten.

**Vad sparas?**

- Varukorgens innehåll
- Orders (orderhistorik)

**Varför?**

- Så att varukorgen och orders behålls även om appen stängs

---

## 🔄 Dataflöde - Hur flyter data?

### 1. Produkter hämtas från Strapi

```
Strapi API → strapiGetProducts() → React Query → Skärmar
```

### 2. Produkter läggs i varukorg

```
Användare klickar "Lägg i kundkorg" → addToCart() → CartContext → AsyncStorage
```

### 3. Beställning skapas

```
CheckoutScreen → Sparar order lokalt → AsyncStorage → orders.tsx visar ordern
```

---

## 🎯 Viktiga koncept att förstå

### React Context

**Vad är det?** Ett sätt att dela data mellan komponenter utan att skicka props överallt.

**I vår app:**

- `CartContext` delar varukorgens state med alla skärmar
- Alla skärmar kan använda `useCart()` för att komma åt varukorgen

### AsyncStorage

**Vad är det?** Ett sätt att spara data lokalt på enheten.

**I vår app:**

- Sparar varukorgens innehåll
- Sparar orders
- Data behålls även om appen stängs

### React Query

**Vad är det?** Ett bibliotek för att hämta data från API:er.

**I vår app:**

- Hämtar produkter från Strapi
- Cachar data automatiskt
- Hanterar loading och error states

---

## 🚀 Flöde - Hur fungerar en beställning?

1. **Användare bläddrar produkter** (`index.tsx` eller `products.tsx`)
2. **Klickar på en produkt** → Går till `ProductDetail.tsx`
3. **Väljer storlek och lägger i varukorg** → `addToCart()` i `CartContext`
4. **Går till varukorg** (`cart.tsx`) → Ser alla produkter
5. **Går till kassan** (`CheckoutScreen.tsx`) → Fyller i formulär
6. **Bekräftar beställning** → `handleCheckout()`:
   - Validerar formulär
   - Simulerar betalning
   - Sparar order lokalt
   - Rensar varukorg
   - Navigerar till bekräftelse
7. **Ser bekräftelse** (`OrderConfirmationScreen.tsx`)
8. **Går till orders** (`orders.tsx`) → Ser sin order i listan

---

## 💡 Tips för presentationen

### Vad kan du förklara enkelt?

1. **Struktur:** "Appen är uppdelad i skärmar, komponenter och hjälpfunktioner"
2. **Varukorg:** "Varukorgen sparas automatiskt så den inte försvinner"
3. **Produkter:** "Produkter hämtas från Strapi, men vi har också två exempelprodukter"
4. **Orders:** "Orders sparas lokalt i appen för demonstration"
5. **Design:** "Vi använder samma färger som web-appen för konsistens"

### Vad är enkelt att demonstrera?

1. Lägga produkter i varukorg
2. Se att varukorgen behålls när man stänger appen
3. Slutföra en beställning
4. Se ordern i orderhistoriken

---

## ❓ Vanliga frågor

**Varför sparas orders bara lokalt?**

- För demonstration. I en riktig app skulle de sparas i en databas.

**Varför finns exempelprodukter?**

- För att visa produkter även om Strapi inte har bilder.

**Vad händer om Strapi är nere?**

- Appen visar ett felmeddelande och låter användaren försöka igen.

**Varför används React Query?**

- Det gör det enkelt att hämta data och hantera loading/error states.

---

## 📝 Sammanfattning

**Enkelt sagt:**

- Appen har flera skärmar (hem, produkter, varukorg, kassa, orders)
- Varukorgen fungerar överallt tack vare CartContext
- Produkter hämtas från Strapi
- Orders sparas lokalt för demonstration
- Allt är enkelt strukturerat och lätt att förstå

**Koden är:**

- ✅ Enkel och lättläst
- ✅ Väl kommenterad
- ✅ Strukturerad på ett logiskt sätt
- ✅ Lätt att förklara för andra

---

_Denna guide är skriven för att hjälpa dig förstå koden inför presentationen. Alla filer är kommenterade och strukturerade på ett pedagogiskt sätt._
