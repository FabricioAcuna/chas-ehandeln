import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ChelseaProducts from "./ChelseaProducts";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <ChelseaProducts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});

export default HomeScreen;
