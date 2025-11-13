import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "@/constants/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  hero: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  heroContent: {
    marginBottom: 24,
    alignItems: "center",
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.light.text,
    lineHeight: 40,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 28,
    lineHeight: 24,
    textAlign: "center",
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
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
    maxWidth: 600,
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
});
