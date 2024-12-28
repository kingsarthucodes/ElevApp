import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles/ProfileStyles";
import { API_BASE_URL } from "../../config";

const NeighborProfileScreen = ({ route, navigation }: any) => {
  const { email } = route.params; // Email passed from the previous screen

  // States for form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNbr, setPhoneNbr] = useState("");
  const [school, setSchool] = useState("");

  // Logging when state changes
  const logStateChange = (field: string, value: string) => {
    console.log(`State Update - ${field}: ${value}`);
  };

  const saveProfile = async () => {
    if (!name || !address || !phoneNbr || !school) {
      Alert.alert("Error", "Please fill in all fields.");
      console.warn("Validation Error: All fields are required.");
      return;
    }

    const profileData = {
      email, // Email is tied to the user
      name,
      address,
      phoneNbr,
      school,
    };

    console.log("Attempting to save profile data:", profileData);

    try {
      const response = await fetch(`${API_BASE_URL}/api/neighbors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Profile saved successfully. Response:", responseData);
        Alert.alert("Success", "Profile saved successfully!");
        navigation.goBack(); // Navigate back to the previous screen
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        Alert.alert("Error", errorData.error || "Failed to save profile.");
      }
    } catch (error) {
      console.error("Unexpected Error Saving Profile:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Profile</Text>

        {/* Name Input */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            logStateChange("Name", value);
          }}
        />

        {/* Address Input */}
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={(value) => {
            setAddress(value);
            logStateChange("Address", value);
          }}
        />

        {/* Phone Number Input */}
        <Text style={styles.label}>Contact:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your contact number"
          value={phoneNbr}
          onChangeText={(value) => {
            setPhoneNbr(value);
            logStateChange("Contact", value);
          }}
          keyboardType="phone-pad"
        />

        {/* School Picker */}
        <Text style={styles.label}>Select School:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={school}
            onValueChange={(value) => {
              setSchool(value);
              logStateChange("School", value);
            }}
          >
            <Picker.Item label="Select a school" value="" />
            <Picker.Item label="UC Merced" value="UC Merced" />
            <Picker.Item label="UC Berkeley" value="UC Berkeley" />
            <Picker.Item label="UCLA" value="UCLA" />
            <Picker.Item label="Harvard" value="Harvard" />
            <Picker.Item label="MIT" value="MIT" />
          </Picker>
        </View>

        {/* Save Profile Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NeighborProfileScreen;
