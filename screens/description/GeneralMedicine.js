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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { getAuth } from "firebase/auth";

const GeneralMedicine = () => {
  const navigation = useNavigation(); // Get the navigation prop
  const [activeSection, setActiveSection] = useState("details");
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const auth = getAuth();

  const handleBookConsultation = async () => {
    setLoading(true);

    const user = auth.currentUser;

    if (!user) {
      alert("You must logged in first");
      setLoading(false);
      return;
    }

    const consultationData = {
      type: "General Medicine",
      price: 850,
      status: "Pending",
      timestamp: new Date().toISOString(),
      uid: user.uid,
    };

    try {
      // Add to Firestore
      await addDoc(collection(firestore, "appointments"), consultationData);

      alert("Consultation booked successfully!");

      // Redirect to Profile > Consultation tab
      navigation.navigate("Profile", { screen: "ConsultationHistory" });
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert("Error booking consultation: " + error.message);
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
          <Text style={styles.title}>General Medicine</Text>
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
              General Practitioners (GPs) are your first line of support when it
              comes to any medical concern. They provide a wide range of
              healthcare services, including diagnosis, treatment, preventive
              care, and management of long-term conditions.
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
                  Receive Prescription & Personalized Care Plan
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
              Individuals with chronic conditions like asthma, diabetes, or
              those seeking preventive care, vaccinations, and general health
              check-ups would benefit from a consultation with a General
              Medicine specialist.
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
          <Text style={styles.priceText}>P850</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookConsultation}
            disabled={loading}
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
    top: 50,
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
    paddingTop: 180,
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  priceText: {
    fontSize: 16,
    color: "191970",
  },
  bookButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookButtonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default GeneralMedicine;
