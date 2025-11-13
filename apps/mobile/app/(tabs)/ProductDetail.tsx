import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/theme";
import { useCart } from "@/components/CartContext";
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../../packages/shared/src/strapiClient";
import type { Product } from "../../../../packages/shared/src/types";
import { getStrapiImageUrl } from "@/lib/strapiConfig";

const sizes = ["S", "M", "L", "XL"];

const exampleProducts = [
  {
    documentId: "example-1",
    name: "Chelsea Home Jersey 2024",
    price: 899,
    image: require("@/assets/images/chelsea.jpg"),
    description:
      "Officiell Chelsea hemtröja 2024. Premium kvalitet med adidas teknologi.",
    inStock: true,
  },
  {
    documentId: "example-2",
    name: "Pro Boots Premium",
    price: 1299,
    image: require("@/assets/images/hero-boost.jpg"),
    description:
      "Professionella fotbollsskor med boost-teknologi för maximal komfort och prestanda.",
    inStock: true,
  },
];

export default function ProductDetail() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const isExample = documentId.startsWith("example-");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: strapiGetProducts,
    enabled: !isExample,
  });

  let product: any;
  let imageSource: any = null;
  let description = "";

  if (isExample) {
    product = exampleProducts.find((p) => p.documentId === documentId);
    if (product) {
      imageSource = product.image;
      description = product.description;
    }
  } else {
    product = products?.find((p: Product) => p.documentId === documentId);
    if (product) {
      const imageUrl =
        product.image?.[0]?.formats?.medium?.url || product.image?.[0]?.url;
      if (imageUrl) {
        imageSource = { uri: getStrapiImageUrl(imageUrl) };
      }
      description = product.description?.[0]?.children?.[0]?.text || "";
    }
  }

  if (!isExample && isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
        <Text style={styles.loadingText}>Laddar produkt...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Produkt hittades inte.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Tillbaka</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Välj en storlek");
      return;
    }

    let imageUrl: string | undefined;
    if (isExample) {
      // För exempelprodukter kan vi inte spara bild-URL, men vi kan identifiera dem
      imageUrl = undefined;
    } else if (imageSource && "uri" in imageSource) {
      imageUrl = imageSource.uri;
    } else if (product.image?.[0]) {
      const imageUrlFromProduct =
        product.image[0].formats?.medium?.url || product.image[0].url;
      if (imageUrlFromProduct) {
        const fullUrl = getStrapiImageUrl(imageUrlFromProduct);
        imageUrl = fullUrl || undefined;
      }
    }

    addToCart({
      documentId: product.documentId,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: imageUrl,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageSection}>
        {imageSource ? (
          <ExpoImage
            source={imageSource}
            style={styles.productImage}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Ingen bild</Text>
          </View>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <Text style={styles.productPrice}>
          <Text style={styles.priceLabel}>Pris: </Text>
          {product.price} kr
        </Text>
        <Text style={styles.productDescription}>{description}</Text>

        <View style={styles.sizesSection}>
          <Text style={styles.sizesTitle}>Välj Storlek:</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeBtn,
                  selectedSize === size && styles.sizeBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeBtnText,
                    selectedSize === size && styles.sizeBtnTextActive,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {product.inStock ? (
          <TouchableOpacity
            style={[styles.addToCartBtn, added && styles.addToCartBtnAdded]}
            onPress={handleAddToCart}
            disabled={added}
          >
            <Text style={styles.addToCartBtnText}>
              {added ? "Tillagd!" : "Lägg i kundkorg"}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.outOfStock}>
            <Text style={styles.outOfStockText}>Slut i lager</Text>
          </View>
        )}
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
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 16,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  backButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  imageSection: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.light.backgroundSecondary,
  },
  productImage: {
    width: "100%",
    maxWidth: 400,
    height: 400,
    borderRadius: 12,
  },
  placeholderImage: {
    width: "100%",
    maxWidth: 400,
    height: 400,
    borderRadius: 12,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: Colors.light.icon,
    fontSize: 16,
  },
  infoSection: {
    padding: 20,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.light.text,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 16,
  },
  priceLabel: {
    fontWeight: "normal",
    fontSize: 20,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 24,
  },
  sizesSection: {
    marginBottom: 24,
  },
  sizesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.light.text,
  },
  sizeOptions: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  sizeBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    minWidth: 60,
    alignItems: "center",
  },
  sizeBtnActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  sizeBtnText: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: "500",
  },
  sizeBtnTextActive: {
    color: "white",
  },
  addToCartBtn: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  addToCartBtnAdded: {
    backgroundColor: "#10b981",
  },
  addToCartBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  outOfStock: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  outOfStockText: {
    color: "#6b7280",
    fontWeight: "600",
    fontSize: 18,
  },
});
