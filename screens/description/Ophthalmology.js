import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createPaymentLink } from "./Paymongo/payApi"; // Import the API function
import { Linking } from "react-native"; // Import Linking to open the URL in a browser

const Ophthalmology = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState("details");
  const [loading, setLoading] = useState(false); // To show loading indicator during payment processing

  const handleBookConsultation = async () => {
    setLoading(true);
    try {
      // Create a payment link for ophthalmology consultation
      const paymentUrl = await createPaymentLink(
        1200,
        "Ophthalmology Consultation"
      );
      if (paymentUrl) {
        // Open the payment URL in the default browser
        Linking.openURL(paymentUrl);
      } else {
        console.error("Payment link not generated");
        alert("Failed to generate payment link.");
      }
    } catch (error) {
      console.error("Error in booking consultation:", error);
      alert("Error occurred during booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Section with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Fixed Title and Toggle Buttons */}
      <View style={styles.fixedTitleAndToggle}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ophthalmology</Text>
        </View>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeSection === "details" && styles.activeButton,
            ]}
            onPress={() => setActiveSection("details")}
          >
            <Text style={styles.toggleButtonText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeSection === "whom" && styles.activeButton,
            ]}
            onPress={() => setActiveSection("whom")}
          >
            <Text style={styles.toggleButtonText}>For Whom</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              activeSection === "reviews" && styles.activeButton,
            ]}
            onPress={() => setActiveSection("reviews")}
          >
            <Text style={styles.toggleButtonText}>Reviews</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display Content Based on Active Section */}
        {activeSection === "details" && (
          <View style={styles.section}>
            <Text style={styles.description}>
              Focuses on the diagnosis, treatment, and prevention of eye
              disorders. Whether you're seeking advice on vision correction,
              managing eye diseases, or maintaining eye health, our specialists
              are here to provide expert care tailored to your needs.
            </Text>

            <Text style={styles.subtitle}>What to Expect</Text>
            <View style={styles.expectations}>
              <View style={styles.expectation}>
                <FontAwesome name="clock-o" size={24} color="#ee82ee" />
                <Text style={styles.expectationText}>30 mins consultation</Text>
              </View>
              <View style={styles.expectation}>
                <FontAwesome name="user-md" size={24} color="#ee82ee" />
                <Text style={styles.expectationText}>Licensed Expert</Text>
              </View>
              <View style={styles.expectation}>
                <FontAwesome name="file-text" size={24} color="#ee82ee" />
                <Text style={styles.expectationText}>
                  Receive a Detailed Eye Health Report & Care Plan
                </Text>
              </View>
            </View>

            <Text style={styles.subtitle}>Consultation Types</Text>
            <View style={styles.consultationTypes}>
              <TouchableOpacity style={styles.consultationType}>
                <FontAwesome name="stethoscope" size={24} color="#4caf50" />
                <Text style={styles.consultationTypeText}>
                  In-Person Consultation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeSection === "whom" && (
          <View style={styles.section}>
            <Text style={styles.whomText}>
              Our ophthalmology services are suitable for individuals of all
              ages, whether you're experiencing vision problems, have a family
              history of eye conditions, or simply need a routine eye exam.
            </Text>
          </View>
        )}

        {activeSection === "reviews" && (
          <View style={styles.section}>
            <Text style={styles.reviewsText}>No Reviews Yet</Text>
            <View style={styles.noReviewImage}>
              <FontAwesome name="smile-o" size={50} color="#ccc" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Fixed Footer Section - Consultation Box */}
      {activeSection === "details" && (
        <View style={styles.consultationBox}>
          <Text style={styles.priceText}>P1200</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookConsultation} // Call payment function
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.bookButtonText}>Book Consultation</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 10,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  fixedTitleAndToggle: {
    position: "absolute",
    top: 50, // Positioned below the header
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: "left",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#2196f3",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#333",
  },
  scrollContent: {
    padding: 16,
    paddingTop: 180, // Offset to avoid overlap with fixed header and title/toggle
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#444",
  },
  expectations: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },
  expectation: {
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
  },
  expectationText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "semibold",
    textAlign: "center",
    marginTop: 10,
  },
  consultationTypes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  consultationType: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    width: "45%",
  },
  consultationTypeText: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
  },
  whomText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  reviewsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  noReviewImage: {
    alignItems: "center",
  },
  consultationBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    backgroundColor: "#f5fffa",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    color: "#191970",
  },
  bookButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

export default Ophthalmology;
