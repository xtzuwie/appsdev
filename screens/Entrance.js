import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function App() {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Define gradient colors and position
        colors={['#ffa500', '#00bfff', 'white']}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          {/* Image logo */}
          <Image source={require('./assets/logo.png')} style={styles.logo} /> 
          <Text style={styles.title}>HEALTH</Text>
          <Text style={styles.text}>Your Wellness, Starts Here!</Text>
        </View>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')} // Navigate to LoginPage.js
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Space between the logo and title
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#191970',
    fontWeight: "bold",
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff7f50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
