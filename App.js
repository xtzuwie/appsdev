import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Entrance from './screens/Entrance';
import LoginPage from './screens/LoginPage';
import Landing from './screens/Landing';
import SignUp from './screens/SignUp';  // This is for importing every component to see the output
import Content from './screens/Content';
import Profile from './screens/Profile';
import AboutUs from './screens/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entrance">
        <Stack.Screen 
          name="Entrance" 
          component={Entrance} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Landing" 
          component={Landing} 
          options={{ headerShown: false }} 
        />
          <Stack.Screen 
          name="Content" 
          component={Content} 
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false}}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
