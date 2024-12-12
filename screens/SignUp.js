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
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const validateEmail = () => {
    if (!email.includes("@")) {
      setEmailError("Email must contain '@'");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (!hasSpecialChar) {
      setPasswordError("Password must contain at least one special character");
    } else if (!hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else if (!hasLowerCase) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!hasNumber) {
      setPasswordError("Password must contain at least one number");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignUp = async () => {
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    if (emailError || passwordError || confirmPasswordError) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Signup Error", `Error creating user: ${error.message}`);
    }
  };

  return (
    <LinearGradient
      colors={["#ffdab9", "#add8e6", "#ffdab9"]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <Image source={require("./assets/bg.png")} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#fff"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
            }}
            onBlur={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
            }}
            onBlur={validatePassword}
            secureTextEntry={!passwordVisible} // Toggle visibility here
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)} // Toggle the password visibility
          >
            <Icon
              name={passwordVisible ? "eye" : "eye-slash"} // Change icon based on visibility
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#fff"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
            onBlur={validateConfirmPassword}
            secureTextEntry={!confirmPasswordVisible} // Toggle visibility here too
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle the confirm password visibility
          >
            <Icon
              name={confirmPasswordVisible ? "eye" : "eye-slash"} // Change icon based on visibility
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signupText}>Login</Text>
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
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#191970",
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#fff",
  },
  icon: {
    marginRight: 10,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  button: {
    width: "100%",
    backgroundColor: "#000080",
    borderWidth: 1,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    paddingLeft: 15,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
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
