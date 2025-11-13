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
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../../packages/shared/src/strapiClient";
import type { Product } from "../../../../packages/shared/src/types";
import { getStrapiImageUrl } from "@/lib/strapiConfig";

const exampleProducts = [
  {
    documentId: "example-1",
    name: "Chelsea Home Jersey 2024",
    price: 899,
    image: require("@/assets/images/chelsea.jpg"),
    inStock: true,
  },
  {
    documentId: "example-2",
    name: "Pro Boots Premium",
    price: 1299,
    image: require("@/assets/images/hero-boost.jpg"),
    inStock: true,
  },
];

export default function ProductsScreen() {
  const router = useRouter();

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
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Kunde inte ladda produkter</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.replace("/(tabs)/products")}
        >
          <Text style={styles.retryButtonText}>Försök igen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const allProducts = [
    ...exampleProducts,
    ...(products || []),
  ];

  if (allProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Inga produkter tillgängliga</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Fotbollströjor</Text>
      </View>

      <View style={styles.productsGrid}>
        {allProducts.map((product: any) => {
          const isExample = product.documentId?.startsWith("example-");
          let imageSource = null;

          if (isExample) {
            imageSource = product.image;
          } else {
            const imageUrl =
              product.image?.[0]?.formats?.large?.url ||
              product.image?.[0]?.url ||
              null;
            if (imageUrl) {
              imageSource = { uri: getStrapiImageUrl(imageUrl) };
            }
          }

          return (
            <TouchableOpacity
              key={product.documentId || product.id}
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
                {imageSource ? (
                  <ExpoImage
                    source={imageSource}
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
                  <Text style={styles.productCardButtonText}>
                    Se tillgänglighet
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.light.background,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.light.icon,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  productsGrid: {
    padding: 20,
    gap: 20,
  },
  productCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardImageContainer: {
    width: "100%",
    height: 300,
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
    padding: 16,
    gap: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  productCardButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  productCardButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
