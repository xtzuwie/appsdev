import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ConsultHistory = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [consultations, setConsultations] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();

  const fetchUserConsultations = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(firestore, "appointments"),
          where("uid", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const userConsultations = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConsultations(userConsultations);
      } else {
        alert("User not logged in.");
      }
    } catch (error) {
      console.error("Error fetching user consultations:", error);
      alert("Failed to fetch consultations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserConsultations();
  }, []);

  const handlePayment = async (consultation) => {
    try {
      const paymongoUrl = "https://www.paymongo.com/checkout"; // Replace with the actual payment URL
      alert(`Redirecting to payment for ${consultation.type}`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed.");
    }
  };

  const handlePayLater = () => {
    fetchUserConsultations();
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return styles.completedBadge;
      case "pending":
        return styles.pendingBadge;
      case "cancelled":
        return styles.cancelledBadge;
      default:
        return styles.pendingBadge;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading consultations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultation History</Text>
      </View>

      {/* Notice */}
      {consultations.length > 0 && (
        <View style={styles.noticeContainer}>
          <FontAwesome name="info-circle" size={18} color="#007BFF" />
          <Text style={styles.noticeText}>
            Please wait for approval before proceeding to payment.
          </Text>
        </View>
      )}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {consultations.length > 0 ? (
          consultations.map((consultation) => (
            <View key={consultation.id} style={styles.consultationCard}>
              {/* Type and Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.consultationType}>
                  {consultation.type || "General Consultation"}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    getStatusBadgeColor(consultation.status),
                  ]}
                >
                  <Text style={styles.statusText}>
                    {consultation.status || "Pending"}
                  </Text>
                </View>
              </View>

              {/* Details */}
              <View style={styles.cardContent}>
                <Text style={styles.consultationDetail}>
                  <Text style={styles.boldText}>Date: </Text>
                  {new Date(consultation.timestamp).toLocaleDateString()}
                </Text>
                <Text style={styles.consultationDetail}>
                  <Text style={styles.boldText}>Price: </Text>₱
                  {consultation.price || "N/A"}
                </Text>
                <Text style={styles.consultationDetail}>
                  <Text style={styles.boldText}>Notes: </Text>
                  {consultation.notes || "No additional details provided."}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => handlePayment(consultation)}
                >
                  <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.payLaterButton}
                  onPress={handlePayLater}
                >
                  <Text style={styles.buttonText}>Pay Later</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>
            No consultation history available.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#007BFF",
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  noticeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f4ff",
    padding: 10,
    margin: 16,
    borderRadius: 8,
    elevation: 1,
  },
  noticeText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#007BFF",
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  consultationCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  consultationType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  completedBadge: {
    backgroundColor: "#4CAF50",
  },
  pendingBadge: {
    backgroundColor: "#FFC107",
  },
  cancelledBadge: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    marginBottom: 10,
  },
  consultationDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  payNowButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  payLaterButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noHistoryText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default ConsultHistory;
