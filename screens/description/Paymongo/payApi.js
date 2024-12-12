import { encode } from "base-64";

export const createPaymentLink = async (amount, description) => {
  // Prepare the payment details
  const paymentDetails = {
    amount: amount * 100, // PayMongo requires the amount in cents
    currency: "PHP",
    description: description,
    remarks: "Thank you.",
  };

  console.log("Payment details:", paymentDetails); // Log payment details for debugging

  try {
    // Make the POST request to PayMongo API
    const response = await fetch("https://api.paymongo.com/v1/links", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encode("sk_test_kwwPmT4juUjy2CdQoBEVPez7")}`, // Replace with your secret key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { attributes: paymentDetails } }), // Send payment details as the body
    });

    // Check if the response status is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response body
      console.error("API Error:", errorData); // Log API error
      return null; // Return null on error
    }

    // Parse the successful response
    const data = await response.json();
    console.log("API response:", data); // Log the response data for debugging

    // Ensure the checkout URL is present in the response
    const checkoutUrl = data?.data?.attributes?.checkout_url;
    if (checkoutUrl) {
      return checkoutUrl; // Return the checkout URL for use in WebView
    } else {
      console.error("No checkout URL found in the response.");
      return null; // Return null if checkout URL is missing
    }
  } catch (error) {
    console.error("Error creating payment link:", error); // Log any errors that occur during the request
    return null; // Return null if an error occurs
  }
};
