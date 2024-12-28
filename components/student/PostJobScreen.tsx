import React, { useState } from "react";
import { API_BASE_URL } from "../../config";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from "react-native";

const PostJobScreen = ({ route }: any) => {
  const { email } = route.params; // Extract email from route.params

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    "Tutoring",
    "Cleaning",
    "Dogwalking",
    "Gardening",
    "Babysitting",
    "Personal Training",
  ];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const postJob = async () => {
    if (!title || !description || !hours || !price || selectedServices.length === 0) {
      Alert.alert("Error", "Please fill out all fields and select at least one service!");
      return;
    }
  
    const jobData = {
      email: email, // Use dynamic email from route.params
      job_title: title,
      job_description: description,
      hours: parseInt(hours, 10),
      price: parseFloat(price),
      services: selectedServices,
    };
    
  
    console.log("Posting Job:", jobData);
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Job posted successfully:", result);
        Alert.alert("Success", "Job posted successfully!");
  
        // Clear the form
        setTitle("");
        setDescription("");
        setHours("");
        setPrice("");
        setSelectedServices([]);
      } else {
        const errorData = await response.json();
        console.error("Error posting job:", errorData);
        Alert.alert("Error", errorData.error || "Failed to post job");
      }
    } catch (error) {
      console.error("Error during job posting:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post a Service</Text>

      {/* Job Title Input */}
      <Text style={styles.boldLabel}>Enter Service Title Here:</Text>
      <TextInput
        style={styles.input}
        placeholder="Job Title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Job Description Input */}
      <Text style={styles.boldLabel}>Enter Job Description Here:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Number of Hours Input */}
      <Text style={styles.boldLabel}>Enter Number of Hours Here:</Text>
      <TextInput
        style={styles.input}
        placeholder="Number of Hours (e.g., 5)"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />

      {/* Price Input */}
      <Text style={styles.boldLabel}>Enter Price Here:</Text>
      <TextInput
        style={styles.input}
        placeholder="Price ($) (e.g., 100)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Service Selection */}
      <Text style={styles.boldLabel}>Select Services:</Text>
      {services.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <Text style={styles.serviceText}>{service}</Text>
          <Switch
            value={selectedServices.includes(service)}
            onValueChange={() => toggleService(service)}
          />
        </View>
      ))}

      {/* Image Upload Section */}
      <Text style={styles.boldLabel}>Upload Images:</Text>
      <View style={styles.imageUploadContainer}>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Select Images</Text>
        </TouchableOpacity>
        <Text style={styles.uploadHint}>Upload images related to the job.</Text>
      </View>

      {/* Post Job Button */}
      <TouchableOpacity style={styles.postButton} onPress={postJob}>
        <Text style={styles.postButtonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  boldLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: "500",
  },
  imageUploadContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  uploadHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  postButton: {
    backgroundColor: "#FF5733",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PostJobScreen;
