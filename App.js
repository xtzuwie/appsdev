import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from "./screens/OnBoarding";
import LoginPage from "./screens/LoginPage";
import Landing from "./screens/Landing";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import AboutUs from "./screens/AboutUs";
import Book from "./screens/Book";
import ForgotPassword from "./screens/ForgotPassword";
import GeneralMedicine from "./screens/description/GeneralMedicine";
import Pediatrics from "./screens/description/Pediatrics";
import Dermatologist from "./screens/description/Dermatologist";
import Neurology from "./screens/description/Neurology";
import Ophthalmology from "./screens/description/Ophthalmology";
import Urology from "./screens/description/Urology";
import ConsultHistory from "./screens/ConsultHistory";
import MyInfo from "./screens/MyInfo";
import InfoPage from "./screens/InfoPage";
import PaymentWebView from "./screens/description/Paymongo/PaymentWebview";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Book"
          component={Book}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConsultHistory"
          component={ConsultHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GeneralMedicine"
          component={GeneralMedicine}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pediatrics"
          component={Pediatrics}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dermatologist"
          component={Dermatologist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Neurology"
          component={Neurology}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ophthalmology"
          component={Ophthalmology}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Urology"
          component={Urology}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyInfo"
          component={MyInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InfoPage"
          component={InfoPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PaymentWebview" component={PaymentWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
