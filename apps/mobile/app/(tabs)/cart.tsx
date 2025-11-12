import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image as RNImage,
} from "react-native";
import { useRouter } from "expo-router";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/theme";
import { useCart } from "@/components/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const router = useRouter();
  const { items, total, removeFromCart, clearCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color={Colors.light.icon} />
        <Text style={styles.emptyTitle}>Din kundkorg</Text>
        <Text style={styles.emptyText}>Din kundkorg är tom.</Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => router.push("/(tabs)/products")}
        >
          <Text style={styles.btnPrimaryText}>Shoppa nu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Din kundkorg</Text>
      </View>

      <View style={styles.cartItems}>
        {items.map((item) => (
          <View key={item.documentId} style={styles.cartItem}>
            {item.image && (
              <View style={styles.cartItemImageContainer}>
                <ExpoImage
                  source={{ uri: item.image }}
                  style={styles.cartItemImage}
                  contentFit="cover"
                />
              </View>
            )}
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              {item.size && (
                <Text style={styles.cartItemSize}>Storlek: {item.size}</Text>
              )}
              <Text style={styles.cartItemPrice}>
                {item.price} kr × {item.quantity} = {item.price * item.quantity}{" "}
                kr
              </Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    updateQuantity(item.documentId, item.quantity - 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    updateQuantity(item.documentId, item.quantity + 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.documentId)}
            >
              <Ionicons name="trash-outline" size={20} color="#DC2626" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.cartTotal}>
        <Text style={styles.totalText}>Total: {total} kr</Text>
      </View>

      <View style={styles.cartActions}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push("/(tabs)/CheckoutScreen")}
        >
          <Text style={styles.checkoutButtonText}>Gå till kassan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Töm kundkorg</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.light.background,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.icon,
    marginBottom: 24,
  },
  btnPrimary: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  btnPrimaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
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
  cartItems: {
    padding: 20,
    gap: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: 12,
  },
  cartItemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
  },
  cartItemImage: {
    width: "100%",
    height: "100%",
  },
  cartItemInfo: {
    flex: 1,
    gap: 4,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  cartItemSize: {
    fontSize: 14,
    color: Colors.light.icon,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: Colors.light.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    minWidth: 30,
    textAlign: "center",
  },
  removeButton: {
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  cartTotal: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    textAlign: "center",
  },
  cartActions: {
    padding: 20,
    gap: 12,
    paddingBottom: 40,
  },
  checkoutButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  clearButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  clearButtonText: {
    color: Colors.light.text,
    fontWeight: "600",
    fontSize: 16,
  },
});
