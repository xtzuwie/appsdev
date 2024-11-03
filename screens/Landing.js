import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // For navigation and focus effect

export default function LandingPage({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

  // useFocusEffect to trigger animation every time the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Start the animation when the screen is focused
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade to full opacity
        duration: 2000, // Duration for the animation (2 seconds)
        useNativeDriver: true,
      }).start(() => {
        // Automatically navigate to the Content screen after the animation
        setTimeout(() => {
          navigation.navigate('Content');
        }, 1000); // Add a 1-second delay after the animation completes
      });

      // Reset opacity when the screen loses focus
      return () => {
        fadeAnim.setValue(0); // Reset animation state for when user returns to this page
      };
    }, [fadeAnim, navigation])
  );

  return (
    <ImageBackground
      source={require('./assets/bg.jpg')} // Replace with your background image
      style={styles.backgroundImage}
    >
      <View style={styles.content}>
        {/* Semi-circular gradient background */}
        <LinearGradient
          colors={['#191970', '#00008B']} // Navy gradient colors
          style={styles.semiCircle}
        >
          <Animated.View style={{ ...styles.animatedContent, opacity: fadeAnim }}>
            <Text style={styles.welcomeText}>Welcome to Health App</Text>

            {/* Button (can be removed if you don't need it for the animation) */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Content')}>
              <Icon name="sign-in" size={20} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',  // Align the content to the bottom of the screen
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',  // Make sure the content stays at the bottom
  },
  semiCircle: {
    height: '40%',  // Adjust the height of the semi-circle
    width: '100%',
    borderTopLeftRadius: 100,  // Creating the circular effect
    borderTopRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,  // Space for the button
  },
  animatedContent: {
    alignItems: 'center',
  },
  welcomeText: {
    color: '#FFA500', // Orange text
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0000FF',  // Blue button background
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,  // Circular button
    marginTop: 10,
  },
});
