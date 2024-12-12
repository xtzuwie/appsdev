import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in successfully:", user);
        navigation.navigate("Landing"); // Navigates to Landing Page
      })
      .catch((error) => {
        Alert.alert("Error", "Invalid credentials");
      });
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <LinearGradient
      colors={["#0D1E4C", "#C48CB3", "#E5C9D7"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Image source={require("./assets/bg.png")} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>

        {/* Email Input with Icon */}
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input with Icon */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} // Toggle visibility here
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
          >
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"} // Change icon based on visibility
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* TouchableOpacity for Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    alignSelf: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#191970",
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
    color: "#000000",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  button: {
    width: "100%",
    backgroundColor: "#26415E",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotText: {
    textAlign: "right",
    color: "blue",
    marginVertical: 20,
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#000",
    marginVertical: 5,
    fontSize: 16,
    textAlign: "center",
  },
  signupText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
