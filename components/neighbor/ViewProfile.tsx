import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/ViewProfileStyles";
import { API_BASE_URL } from "../../config";

const ViewProfile = ({ route, navigation }: any) => {
  const { email } = route.params || {}; // Safely destructure email to avoid undefined error
  const [profile, setProfile] = useState<any>(null); // Profile data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!email) {
      Alert.alert("Error", "Email is missing. Unable to fetch profile.");
      navigation.goBack(); // Navigate back if email is not available
      return;
    }

    // Fetch profile data when the component mounts
    const fetchProfile = async () => {
      console.log(`Fetching profile for email: ${email}`);
      try {
        const response = await fetch(`${API_BASE_URL}/api/neighbors/search?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Profile fetched successfully:", data);
          setProfile(data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch profile:", errorData);
          Alert.alert("Error", errorData.error || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email, navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No profile found.</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate("NeighborProfile", { email })}
        >
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>View Profile</Text>

      <View style={styles.profileDetail}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile.name || "N/A"}</Text>
      </View>

      <View style={styles.profileDetail}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{profile.address || "N/A"}</Text>
      </View>

      <View style={styles.profileDetail}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{profile.phoneNbr || "N/A"}</Text>
      </View>

      <View style={styles.profileDetail}>
        <Text style={styles.label}>School:</Text>
        <Text style={styles.value}>{profile.school || "N/A"}</Text>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate("NeighborProfile", { email })}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ViewProfile;
