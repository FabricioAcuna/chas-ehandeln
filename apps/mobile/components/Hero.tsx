import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Hero: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Elevate Your Game with Premium Football Gear
      </Text>
      <Image
        source={require("../assets/images/hero-boost.jpg")}
        style={styles.heroImage}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Collections</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  heroImage: { width: 300, height: 200, borderRadius: 12, marginBottom: 10 },
  buttons: { flexDirection: "row", gap: 10 },
  button: { backgroundColor: "#1e40af", padding: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default Hero;
