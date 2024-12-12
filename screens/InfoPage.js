import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { db, auth, ref, set, onValue, remove } from "./firebaseConfig";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for simplicity

const InfoPage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateNotice, setUpdateNotice] = useState(false); // Track if the info was updated

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigation.navigate("Login");
      return;
    }

    const userRef = ref(db, `users/${user.uid}`);

    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData(data);
          setOriginalData(data);
        } else {
          const defaultData = {
            firstName: "",
            lastName: "",
            birthday: "",
            gender: "",
            contact: "",
            address: "",
          };
          set(userRef, defaultData);
          setUserData(defaultData);
          setOriginalData(defaultData);
        }
        setLoading(false);
      },
      (error) => {
        setError("Error fetching user data: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [navigation]);

  const handleSave = async () => {
    try {
      const userRef = ref(db, `users/${auth.currentUser.uid}`);
      await set(userRef, userData);
      setOriginalData(userData);
      setIsEditing(false);
      setUpdateNotice(true); // Show the update notice
      setTimeout(() => setUpdateNotice(false), 3000); // Hide after 3 seconds
    } catch (error) {
      setError("Error updating user data: " + error.message);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your information?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const userRef = ref(db, `users/${auth.currentUser.uid}`);
              await remove(userRef);
              setUserData(null);
              setIsEditing(false);
              Alert.alert("Success", "Information deleted successfully.");
            } catch (error) {
              setError("Error deleting user data: " + error.message);
            }
          },
        },
      ]
    );
  };

  const handleDiscardChanges = () => {
    setUserData(originalData);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with icons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile Info</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isEditing}>
          <Icon name="check" size={30} color={isEditing ? "#6200ee" : "#ddd"} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.infoContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6200ee" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : userData ? (
          <>
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="First Name"
              value={userData.firstName}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, firstName: text }))
              }
            />
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="Last Name"
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, lastName: text }))
              }
            />
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="Birthday"
              value={userData.birthday}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, birthday: text }))
              }
            />
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="Gender"
              value={userData.gender}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, gender: text }))
              }
            />
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="Contact"
              value={userData.contact}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, contact: text }))
              }
            />
            <Text style={styles.emailText}>
              Email: {auth.currentUser.email}
            </Text>
            <TextInput
              style={styles.input}
              editable={isEditing}
              placeholder="Address"
              value={userData.address}
              onChangeText={(text) =>
                setUserData((prevData) => ({ ...prevData, address: text }))
              }
            />
            {isEditing ? (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleDiscardChanges}>
                  <Text style={styles.discardButton}>Discard</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noDataText}>No user data available</Text>
        )}
      </View>

      {/* Update notice */}
      {updateNotice && (
        <View style={styles.updateNotice}>
          <Text style={styles.updateNoticeText}>
            Information updated successfully!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa", // Light gray background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333", // Dark gray text for readability
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f7f7f7", // Soft background for inputs
    borderWidth: 1,
    borderColor: "#ddd", // Light border color
  },
  emailText: {
    fontSize: 16,
    color: "#555", // Darker text for email
    marginBottom: 12,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  discardButton: {
    fontSize: 16,
    color: "gray",
  },
  editButton: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  updateNotice: {
    backgroundColor: "#4CAF50", // Green background
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  updateNoticeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default InfoPage;
