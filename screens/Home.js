import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Correct import for FontAwesome icons
import { useNavigation } from "@react-navigation/native";
import { auth } from "./firebaseConfig"; // Make sure this is the correct path to your firebaseConfig file
import { update } from "firebase/database";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");
  const [greeting, setGreeting] = useState("");
  const [activeTab, setActiveTab] = useState("Home"); // Track the active tab

  const updateGreeting = () => {
    const now = new Date();
    const currentHour = (now.getUTCHours() + 8) % 24;

    let greetingMessage = "";
    if (currentHour >= 0 && currentHour < 12) {
      greetingMessage = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      greetingMessage = "Good Afternoon";
    } else {
      greetingMessage = "Good Evening";
    }

    setGreeting(greetingMessage);
  };

  // Fetch the current user's email on component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email); // Set the email to display in the greeting
    }
    updateGreeting();
  }, []);

  const consultations = [
    {
      id: "1",
      title: "General Medicine",
      color: "#d9e8ff",
      image: require("./assets/PCare.png"),
    },
    {
      id: "2",
      title: "Pediatrics",
      color: "#e6d9ff",
      image: require("./assets/pedia.png"),
    },
    {
      id: "3",
      title: "Dermatologist",
      color: "#ffe4c4",
      image: require("./assets/derma.jpg"),
    },
    {
      id: "4",
      title: "Neurology",
      color: "#fff0f5",
      image: require("./assets/neurology.png"),
    },
    {
      id: "5",
      title: "Ophthalmology",
      color: "#fafad2",
      image: require("./assets/oph.png"),
    },
  ];

  const renderConsultation = ({ item }) => (
    <TouchableOpacity
      style={[styles.consultationCard, { backgroundColor: item.color }]}
      onPress={() => {
        if (item.title === "General Medicine") {
          navigation.navigate("GeneralMedicine");
        } else if (item.title === "Pediatrics") {
          navigation.navigate("Pediatrics");
        } else if (item.title === "Dermatologist") {
          navigation.navigate("Dermatologist");
        } else if (item.title === "Neurology") {
          navigation.navigate("Neurology");
        } else if (item.title === "Ophthalmology") {
          navigation.navigate("Ophthalmology");
        } else {
          console.log(`${item.title} clicked`);
        }
      }}
    >
      <Image source={item.image} style={styles.consultationImage} />
      <Text style={styles.consultationText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {greeting}, {userEmail ? userEmail.split("@")[0] : "Guest"}
        </Text>
        {/* Use FontAwesome icon for notification */}
        <FontAwesome name="bell" size={24} color="black" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.consultationBox}>
          <Text style={styles.consultText}>Need a Consultation?</Text>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate("Book")}
          >
            <Text style={styles.bookButtonText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Frequently Booked Consultations</Text>
        <FlatList
          data={consultations}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderConsultation}
          contentContainerStyle={styles.consultationList}
        />

        <Text style={styles.sectionTitle}>Popular Doctors</Text>
        <View style={styles.doctorList}>
          {/* Doctor 1 */}
          <View style={styles.doctorCard}>
            <Image
              source={require("./assets/doc1.png")}
              style={styles.doctorImage}
            />
            <Text style={styles.doctorDescription}>John Doe</Text>
            <Text style={styles.doctorSubtitle}>Pediatrician</Text>
          </View>

          {/* Doctor 2 */}
          <View style={styles.doctorCard}>
            <Image
              source={require("./assets/doc2.png")}
              style={styles.doctorImage}
            />
            <Text style={styles.doctorDescription}>Natasha Taran</Text>
            <Text style={styles.doctorSubtitle}>Ophthalmologist</Text>
          </View>

          {/* Doctor 3 */}
          <View style={styles.doctorCard}>
            <Image
              source={require("./assets/doc3.png")}
              style={styles.doctorImage}
            />
            <Text style={styles.doctorDescription}>Louie Briton</Text>
            <Text style={styles.doctorSubtitle}>Primary Care</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab("Home");
            navigation.navigate("Home");
          }}
        >
          <FontAwesome
            name={activeTab === "Home" ? "home" : "home"} // Switch between regular and solid icons
            size={24}
            color={activeTab === "Home" ? "#8c2b8f" : "#bbb"} // Active color vs inactive color
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
            name={activeTab === "Book" ? "calendar" : "calendar"} // Switch between regular and solid icons
            size={24}
            color={activeTab === "Book" ? "#8c2b8f" : "#bbb"} // Active color vs inactive color
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
            name={activeTab === "Profile" ? "user" : "user"} // Switch between regular and solid icons
            size={24}
            color={activeTab === "Profile" ? "#8c2b8f" : "#bbb"} // Active color vs inactive color
          />
          <Text style={styles.navText}>Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8fb", // Soft light blue background for freshness
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold", // Lighter, modern feel
    color: "#000", // Darker text for contrast
  },
  consultationBox: {
    backgroundColor: "#ffffff", // Clean white background for the consultation box
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: 16,
    shadowColor: "#2C3E50", // Soft shadow to elevate the card
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4, // Adds shadow on Android
    flexDirection: "row", // Arrange items in a row
    justifyContent: "space-between",
    alignItems: "center",
  },
  consultationText: {
    fontSize: 14,
    color: "#5A6E76", // Soft color for text
    fontWeight: "400", // Slightly lighter text
  },
  bookButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#8C2B8F", // Vibrant button color
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#8C2B8F", // Matching border color with button
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  bookButtonText: {
    color: "#fff", // White text for contrast
    fontWeight: "bold",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 20,
    color: "#2C3E50", // Darker color for headings
  },
  consultationList: {
    paddingBottom: 20,
  },
  consultationCard: {
    width: 130,
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    padding: 12,
    elevation: 3, // Adding slight shadow effect
  },
  consultationImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginBottom: 12,
  },
  consultationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2C3E50",
  },
  doctorList: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    padding: 10,
    shadowColor: "#2C3E50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    width: 100,
    marginRight: 10,
  },
  doctorImage: {
    width: 80,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  doctorDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  doctorSubtitle: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ecf0f1",
    shadowColor: "#2C3E50",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#8C2B8F",
    marginTop: 5,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 20,
  },
});
