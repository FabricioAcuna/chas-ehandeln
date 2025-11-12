import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ProductCardProps {
  product: { id: number; name: string; price: number; image: any };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} SEK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  image: { width: "100%", height: 100, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: "bold", fontSize: 14, marginBottom: 4 },
  price: { fontSize: 12, color: "green" },
});

export default ProductCard;
