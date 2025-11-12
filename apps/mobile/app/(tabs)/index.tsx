import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/theme";
import { useCart } from "@/components/CartContext";
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../../packages/shared/src/strapiClient";
import type { Product } from "../../../../packages/shared/src/types";
import { getStrapiImageUrl } from "@/lib/strapiConfig";

export default function HomeScreen() {
  const router = useRouter();
  const { totalItems } = useCart();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: strapiGetProducts,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Laddar produkter...</Text>
      </View>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : "Okänt fel";
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Kunde inte ladda produkter</Text>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Text style={styles.errorHint}>
          Kontrollera att Strapi är igång och att EXPO_PUBLIC_STRAPI_URL är
          korrekt satt.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.retryButtonText}>Försök igen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Show all products from Strapi (same as web app)
  const allProducts = products || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Höj ditt spel med premium fotbollströjor
          </Text>
          <Text style={styles.heroSubtitle}>
            Fotbollströjor i premiumkvalitet, designade för maximal prestanda på
            planen. Tillverkade i slitstarka material som ger komfort och
            hållbarhet i varje match. Visa ditt stöd med officiella designer
            från världens främsta klubbar.
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => router.push("/(tabs)/products")}
              activeOpacity={0.8}
            >
              <Text style={styles.btnPrimaryText}>Shoppa nu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={() => router.push("/(tabs)/products")}
              activeOpacity={0.8}
            >
              <Text style={styles.btnSecondaryText}>Se fotbollströjor</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.heroImageContainer}>
          <ExpoImage
            source={require("@/assets/images/hero-boost.jpg")}
            style={styles.heroImage}
            contentFit="cover"
            transition={200}
          />
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.productsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.productsTitle}>Officiella Fotbollströjor</Text>
        </View>
        <View style={styles.productsGrid}>
          {allProducts.map((product: Product) => {
            const imageUrl =
              product.image?.[0]?.formats?.large?.url ||
              product.image?.[0]?.url ||
              null;
            const fullImageUrl = getStrapiImageUrl(imageUrl);

            return (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/ProductDetail",
                    params: { documentId: product.documentId },
                  })
                }
                activeOpacity={0.9}
              >
                <View style={styles.cardImageContainer}>
                  {fullImageUrl ? (
                    <ExpoImage
                      source={{ uri: fullImageUrl }}
                      style={styles.cardImage}
                      contentFit="cover"
                      transition={200}
                    />
                  ) : (
                    <View style={styles.placeholderImage}>
                      <Text style={styles.placeholderText}>Ingen bild</Text>
                    </View>
                  )}
                  {product.inStock && (
                    <View style={styles.inStockBadge}>
                      <Text style={styles.inStockText}>I lager</Text>
                    </View>
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPrice}>{product.price}:-</Text>
                </View>
                <View style={styles.productCardButtonContainer}>
                  <TouchableOpacity
                    style={styles.productCardButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push({
                        pathname: "/(tabs)/ProductDetail",
                        params: { documentId: product.documentId },
                      });
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.productCardButtonText}>Se produkt</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.light.background,
  },
  errorTitle: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
  errorHint: {
    textAlign: "center",
    color: Colors.light.icon,
    fontSize: 12,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  hero: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    paddingVertical: 50,
  },
  heroContent: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.light.text,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 28,
    lineHeight: 24,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  btnPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnPrimaryText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  btnSecondary: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  btnSecondaryText: {
    color: Colors.light.primary,
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  heroImageContainer: {
    width: "100%",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImage: {
    width: "100%",
    height: 240,
    borderRadius: 12,
  },
  productsSection: {
    padding: 20,
    paddingTop: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  productsTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.light.text,
    flex: 1,
  },
  viewAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  productsGrid: {
    gap: 20,
  },
  productCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardImageContainer: {
    width: "100%",
    height: 320,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: Colors.light.icon,
    fontSize: 14,
  },
  inStockBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#10b981",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  inStockText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardInfo: {
    padding: 18,
    gap: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    lineHeight: 26,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  productCardButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  productCardButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: Colors.light.primary,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  productCardButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
