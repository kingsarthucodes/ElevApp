import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Switch } from "react-native";
import styles from "./styles/StudentProfileStyles";
import { useRoute, RouteProp } from "@react-navigation/native";
import { API_BASE_URL } from "../../config";

// Define type for the profile
type Profile = {
  email: string;
  idImage: string;
  school: string;
  services: string[];
  studyField: string;
  travelDistance: string;
  _id?: string; // Optional _id field for updates
};

// Define navigation route parameters
type RootStackParamList = {
  StudentProfile: { email: string; editable: boolean };
};

const StudentProfileScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "StudentProfile">>();
  const { email, editable } = route.params;

  const [profile, setProfile] = useState<Profile>({
    email: email,
    idImage: "",
    school: "",
    services: [],
    studyField: "",
    travelDistance: "",
  });

  const [schools, setSchools] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch dropdown data and student profile on load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch services and schools
        const [servicesRes, schoolsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/services`),
          fetch(`${API_BASE_URL}/api/schools`),
        ]);

        if (!servicesRes.ok || !schoolsRes.ok) {
          throw new Error("Failed to fetch dropdown data.");
        }

        setServices(await servicesRes.json());
        setSchools(await schoolsRes.json());

        // Fetch student profile by email
        const studentRes = await fetch(
          `${API_BASE_URL}/api/students/search?email=${email}`
        );

        if (studentRes.ok) {
          const studentData = await studentRes.json();
          setProfile(studentData);
          setSelectedServices(studentData.services || []);
        } else {
          console.log("Student not found. Initializing new profile.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [email]);

  // Handle save or update
  const handleSave = async () => {
    if (!profile.school) {
      Alert.alert("Error", "Please select a school.");
      return;
    }

    if (selectedServices.length === 0) {
      Alert.alert("Error", "Please select at least one service.");
      return;
    }

    const payload = {
      ...profile,
      services: selectedServices,
    };

    try {
      const method = profile._id ? "PUT" : "POST";
      const url = profile._id
        ? `${API_BASE_URL}/api/students/${profile._id}`
        : `${API_BASE_URL}/api/students`;

      console.log("Saving to:", url);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save profile.");
      }

      const result = await response.json();
      Alert.alert(
        "Success",
        profile._id
          ? "Profile updated successfully!"
          : "Profile created successfully!"
      );

      if (!profile._id && result._id) {
        setProfile({ ...profile, _id: result._id });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {profile._id ? "Edit Profile" : "Create Profile"}
      </Text>

      {/* School Selection */}
      <Text style={styles.label}>Select School:</Text>
      <Picker
        selectedValue={profile.school}
        onValueChange={(itemValue) =>
          setProfile({ ...profile, school: itemValue })
        }
        enabled={editable}
      >
        <Picker.Item label="Select a school" value="" />
        {schools.map((school) => (
          <Picker.Item key={school} label={school} value={school} />
        ))}
      </Picker>

      {/* Services Selection */}
      <Text style={styles.label}>Select Services:</Text>
      {services.map((service) => (
        <View key={service} style={styles.checkboxContainer}>
          <Switch
            value={selectedServices.includes(service)}
            onValueChange={() => toggleService(service)}
            disabled={!editable}
          />
          <Text style={styles.checkboxLabel}>{service}</Text>
        </View>
      ))}

      {/* Study Field */}
      <Text style={styles.label}>Study Field:</Text>
      <TextInput
        style={styles.input}
        value={profile.studyField}
        onChangeText={(text) => setProfile({ ...profile, studyField: text })}
        editable={editable}
      />

      {/* Travel Distance */}
      <Text style={styles.label}>Travel Distance:</Text>
      <TextInput
        style={styles.input}
        value={profile.travelDistance}
        onChangeText={(text) =>
          setProfile({ ...profile, travelDistance: text })
        }
        editable={editable}
      />

      {/* Save Button */}
      {editable && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {profile._id ? "Update Profile" : "Create Profile"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default StudentProfileScreen;
