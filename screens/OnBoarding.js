import React from "react";
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";


const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('SignUp');
  }

  const doneButton = ({...props})=>{
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        // bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#afeeee',
            image: (
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('./assets/animations/Animation - 1731229928322.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Welcome to iHealth',
            subtitle: 'Your Healthcare Companion',
          },
          {
            backgroundColor: '#87ceeb',
            image: (
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('./assets/animations/Animation - 1731254135778.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Book a Consultation',
            subtitle: 'Appoint in a minute',
          },
          {
            backgroundColor: '#ffdab9',
            image: (
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('./assets/animations/Animation - 1731254571009.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: 'Hassle Free',
            subtitle: 'Cleanse your mind as the appointment goes on.',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  doneButton: {
    padding: 20,
    // backgroundColor: 'white',
    // borderTopLeftRadius: '100%',
    // borderBottomLeftRadius: '100%',
  }
});
