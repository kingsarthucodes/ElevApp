import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StudentRegistrationScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigation = useNavigation();

  // Function to send verification code
  const sendVerificationCode = async () => {
    try {
      const response = await fetch("http://<YOUR_BACKEND_URL>/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert(
          "Verification Code Sent",
          `A verification code has been sent to ${email}.`
        );
        setIsCodeSent(true);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to send verification code.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      Alert.alert("Error", "Failed to send verification code. Please try again.");
    }
  };

  // Function to verify the code
  const verifyCode = async () => {
    try {
      const response = await fetch("http://<YOUR_BACKEND_URL>/api/validate-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (response.ok) {
        Alert.alert("Success", "Your email has been verified.");
        setIsEmailVerified(true); // Proceed with registration
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Invalid verification code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      Alert.alert("Error", "Failed to verify the code. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!email.endsWith(".edu")) {
      Alert.alert("Invalid Email", "Please use a valid '.edu' email address.");
      return;
    }
    sendVerificationCode();
  };

  const handleFinalizeRegistration = () => {
    if (!isEmailVerified) {
      Alert.alert("Error", "Please verify your email before proceeding.");
      return;
    }
    // Proceed with the registration logic (e.g., navigating to another screen)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your .edu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {isCodeSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}

      {isEmailVerified && (
        <TouchableOpacity style={styles.finalizeButton} onPress={handleFinalizeRegistration}>
          <Text style={styles.finalizeButtonText}>Finalize Registration</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  finalizeButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  finalizeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default StudentRegistrationScreen;
