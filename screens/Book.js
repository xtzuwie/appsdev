import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

// Categories (Your service types like General Checkup, Pediatrics, etc.)
const categories = [
  {
    id: "1",
    title: "General Checkup",
    color: "#d9e8ff",
    image: require("./assets/PCare.png"),
    screen: "GeneralMedicine",
  },
  {
    id: "2",
    title: "Pediatrics",
    color: "#e6d9ff",
    image: require("./assets/pedia.png"),
    screen: "Pediatrics",
  },
  {
    id: "3",
    title: "Dermatologist",
    color: "#d9ffda",
    image: require("./assets/derma.jpg"),
    screen: "Dermatologist",
  },
  {
    id: "4",
    title: "Neurology",
    color: "#ffd9d9",
    image: require("./assets/neurology.png"),
    screen: "Neurology",
  },
  {
    id: "5",
    title: "Ophthalmology",
    color: "#ffe6d9",
    image: require("./assets/oph.png"),
    screen: "Ophthalmology",
  },
  {
    id: "6",
    title: "Urology",
    color: "#f0fff0",
    image: require("./assets/uro.jpg"),
    screen: "Urology",
  },
];

export default function BookScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Book");

  const handleNavigation = (screenName, tabName) => {
    setActiveTab(tabName); // Update active tab when clicked
    navigation.navigate(screenName); // Navigate to the corresponding screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoriesContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.categoryCard, { backgroundColor: item.color }]}
              onPress={() => handleNavigation(item.screen, "Book")}
            >
              <Text style={styles.categoryTitle}>{item.title}</Text>
              {item.image && (
                <Image source={item.image} style={styles.categoryImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation("Home", "Home")}
        >
          <Icon
            name={activeTab === "Home" ? "home" : "home"}
            size={26}
            color={activeTab === "Home" ? "#4CAF50" : "#9e9e9e"}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation("Book", "Book")}
        >
          <Icon
            name={activeTab === "Book" ? "calendar" : "calendar"}
            size={26}
            color={activeTab === "Book" ? "#4CAF50" : "#9e9e9e"}
          />
          <Text style={styles.navText}>Book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleNavigation("Profile", "Profile")}
        >
          <Icon
            name={activeTab === "Profile" ? "user" : "user"}
            size={26}
            color={activeTab === "Profile" ? "#4CAF50" : "#9e9e9e"}
          />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    fontFamily: "Roboto",
    left: 10,
  },
  scrollContent: {
    paddingTop: 150, // Space for the fixed header
    paddingBottom: 100, // Space for the bottom navigation
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: "48%",
    height: 180,
    marginVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
    marginBottom: 12,
    fontFamily: "Roboto",
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#ffffff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    color: "#9e9e9e",
    marginTop: 4,
    fontFamily: "Roboto",
  },
});
