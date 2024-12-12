import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for back button and toggle icon

const AboutUs = ({ navigation }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status

  // Function to toggle collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Description */}
        <Text style={styles.titleDescription}>iHealth</Text>

        {/* Title and description container */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Welcome to iHealth</Text>
          <Text style={styles.description}>
            App for consulting and more. See you on App.{" "}
          </Text>
        </View>

        {/* Our Mission */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.description}>
            We envision a world where everyone has access to the knowledge and
            resources necessary for maintaining a healthy lifestyle. We believe
            that small, sustainable changes can lead to significant improvements
            in health over time.
          </Text>
        </View>

        {/* Join our community */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>JOIN OUR COMMUNITY</Text>
          <Text style={styles.description}>
            Book your consultation today. Together let's redefine the future of
            health and wellness.
          </Text>
        </View>

        {/* Collapsible Members Section */}
        <TouchableOpacity
          style={styles.collapseButton}
          onPress={toggleCollapse}
        >
          <Text style={styles.collapseButtonText}>Members</Text>
          <Icon
            name={isCollapsed ? "angle-down" : "angle-up"}
            size={20}
            color="#6A1B9A"
          />
        </TouchableOpacity>

        {/* Collapsible content - only visible if not collapsed */}
        {!isCollapsed && (
          <View style={styles.contentContainer}>
            <Text style={styles.memberItem}>
              React Native with CHATGPT: Josh Anastacio
            </Text>
            <Text style={styles.memberItem}>
              System : Briton Tanelon - Murillo
            </Text>
            <Text style={styles.memberItem}>
              Color Theory and 60,30,10 Rule: Shien Sejera
            </Text>
            <Text style={styles.memberItem}>Arduino Device: John Bautista</Text>
            <Text style={styles.memberItem}>Navigation: Andre Anderson</Text>
            <Text style={styles.memberItem}>Manuscript: Carmena Olojan</Text>
          </View>
        )}
        {/* Footer */}
        <Text style={styles.textFooter}>iHealth v. 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fdf6f0",
  },
  header: {
    backgroundColor: "#6A1B9A", // Purple background for the header
    paddingTop: 20, // To adjust for status bar
    paddingBottom: 20, // Extra padding for space below
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 25, // Align it vertically in the header
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  titleDescription: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#6A1B9A",
    textShadowColor: "#000",
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 20,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5, // Adding some shadow to the title description box
  },
  contentContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow effect
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
  },
  collapseButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  collapseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A1B9A",
  },
  memberItem: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginVertical: 5,
  },
  textFooter: {
    alignSelf: "flex-end",
    color: "#6A1B9A",
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default AboutUs;
