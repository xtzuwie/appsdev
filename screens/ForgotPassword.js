import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "./firebaseConfig"; // Ensure the path is correct
import { sendPasswordResetEmail } from "firebase/auth"; // Firebase Auth method

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Check your email",
        "Password reset email sent successfully."
      );
      navigation.navigate("Login"); // Navigate back to the Login page after sending the email
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Back to Login Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  input: {
    height: 40,
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "#000080",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backToLoginText: {
    color: "#000080",
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});
