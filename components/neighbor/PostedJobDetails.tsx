import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const PostedJobDetails = ({ route }: any) => {
  const { acceptedBy, title, details, hours, pay } = route.params;

  const handleMessage = () => {
    // Functionality to send a message or navigate to a messaging screen
    Alert.alert("Message", `Messaging ${acceptedBy}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Details</Text>
      
      {/* Job Title */}
      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{title}</Text>

      {/* Accepted By */}
      <Text style={styles.label}>Accepted By:</Text>
      <Text style={styles.value}>{acceptedBy || "Unknown"}</Text>

      {/* Hours */}
      <Text style={styles.label}>Hours:</Text>
      <Text style={styles.value}>{hours || "N/A"} hours</Text>

      {/* Pay */}
      <Text style={styles.label}>Pay:</Text>
      <Text style={styles.value}>${pay || "N/A"}</Text>

      {/* Additional Details */}
      <Text style={styles.label}>Additional Details:</Text>
      <Text style={styles.value}>{details || "None"}</Text>

      {/* Message Button */}
      <TouchableOpacity style={styles.button} onPress={handleMessage}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
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
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#777",
    marginBottom: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostedJobDetails;
