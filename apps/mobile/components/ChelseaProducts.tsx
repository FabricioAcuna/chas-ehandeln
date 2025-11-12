import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const products = [
  {
    id: 1,
    name: "Chelsea Jersey 1",
    price: 1200,
    image: require("../assets/images/chelsea.jpg"),
  },
  {
    id: 2,
    name: "Pro Boots",
    price: 1299,
    image: require("../assets/images/hero-boost.jpg"),
  },
];

const ChelseaProducts = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/ProductDetail",
              params: { documentId: product.id.toString() },
            })
          }
        >
          <Image source={product.image} style={styles.image} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price} SEK</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    padding: 10,
  },
  image: { width: "100%", height: 120, borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: "bold" },
  price: { color: "green" },
});

export default ChelseaProducts;
