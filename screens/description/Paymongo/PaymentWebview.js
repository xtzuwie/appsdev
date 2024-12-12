import React, { useEffect } from "react";
import { View, ActivityIndicator, Text, Linking, Button } from "react-native";

const PaymentWebBrowser = ({ route }) => {
  const { url } = route.params; // Extract the URL passed from Dermatologist screen

  useEffect(() => {
    const openUrlInBrowser = async () => {
      try {
        // Check if the URL can be opened
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          Linking.openURL(url); // Open the URL in the default browser
        } else {
          console.error("Unable to open URL");
        }
      } catch (error) {
        console.error("Error opening URL", error);
      }
    };

    openUrlInBrowser(); // Call the function to open the URL
  }, [url]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Opening in browser...</Text>
    </View>
  );
};

export default PaymentWebBrowser;
