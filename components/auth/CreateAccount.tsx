import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  const handleStudentSelection = () => {
    navigation.navigate("StudentRegistration"); // Navigate to student registration
  };

  const handleNeighborSelection = () => {
    //navigation.navigate("NeighborRegistration"); // Navigate to neighbor registration
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pankins! </Text>

      <Text style={styles.subtitle}>Select one of the options to get started. </Text>

      {/* Button for Students */}
      <TouchableOpacity style={styles.button} onPress={handleStudentSelection}>
        <Text style={styles.buttonText}>I'm a Student</Text>
      </TouchableOpacity>

      {/* Button for Neighbors */}
      <TouchableOpacity style={styles.button} onPress={handleNeighborSelection}>
        <Text style={styles.buttonText}>I'm a Neighbor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateAccountScreen;
