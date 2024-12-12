import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getAuth, signOut } from "firebase/auth";
import { db, ref, onValue } from "./firebaseConfig"; // Import Firebase functions

const Profile = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [user, setUser] = useState({
    name: "Loading...", // Default placeholder text
    email: "Loading...",
    location: "Loading...",
    image: "https://via.placeholder.com/100", // Placeholder image URL
  });
  const [loading, setLoading] = useState(true); // Loading state

  const auth = getAuth(); // Initialize Firebase Auth

  useEffect(() => {
    const currentUser = auth.currentUser;
    console.log("Current User:", currentUser); // Log the current user to check if they are authenticated

    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);

      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("User Data:", data); // Log the data fetched from Firebase
          setUser({
            name:
              `${data.firstName || ""} ${data.lastName || ""}`.trim() ||
              currentUser.displayName ||
              "Anonymous", // Default to Firebase displayName or "Anonymous"
            email: currentUser.email,
            location:
              data.address && data.address !== ""
                ? data.address
                : "Not Available", // Show a default message if location is not set
            image: currentUser.photoURL || "https://via.placeholder.com/100", // Get profile image if available
          });
        } else {
          console.log("No user data found");
          // Optionally, you can update state here if no data exists
        }
        setLoading(false); // Set loading to false after fetching user info
      });

      return () => unsubscribe(); // Cleanup the listener on unmount
    } else {
      console.log("No user is logged in");
      setLoading(false); // Stop loading if no user is logged in
    }
  }, [auth]);

  const menuItems = [
    {
      id: "1",
      title: "Consultations",
      navigate: "ConsultHistory",
      icon: "history",
    },
    { id: "2", title: "My Information", navigate: "MyInfo", icon: "info" },
    { id: "3", title: "About", navigate: "AboutUs", icon: "info-circle" },
  ];

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login"); // Navigate back to the Login page after sign-out
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {user.location && <Text style={styles.location}>{user.location}</Text>}
      </View>

      {/* Menu */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.navigate)}
          >
            <FontAwesome name={item.icon} size={22} color="#662249" />
            <Text style={styles.menuText}>{item.title}</Text>
            <FontAwesome name="chevron-right" size={22} color="#b0848e" />
          </TouchableOpacity>
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome name="sign-out" size={24} color="#662249" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Home");
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            name="home"
            size={24}
            color={activeTab === "Home" ? "#8c2b8f" : "#bbb"}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Book");
            navigation.navigate("Book");
          }}
        >
          <FontAwesome
            name="calendar"
            size={24}
            color={activeTab === "Book" ? "#8c2b8f" : "#bbb"}
          />
          <Text style={styles.navText}>Book</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Profile");
            navigation.navigate("Profile");
          }}
        >
          <FontAwesome
            name="user"
            size={24}
            color={activeTab === "Profile" ? "#8c2b8f" : "#bbb"}
          />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#7A7A7A",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#7A7A7A",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#44174e",
    marginLeft: 10,
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
    color: "#1b1931",
    fontWeight: "semibold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#29104a",
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 16,
    color: "#a34054",
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#4A4A4A",
  },
});

export default Profile;
