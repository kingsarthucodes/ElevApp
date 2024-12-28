import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { API_BASE_URL } from "../../config";

const CreateJobScreen = ({ route }: any) => {
  const { email } = route.params; // Get email from route params
  const [shortDescription, setShortDescription] = useState("");
  const [hours, setHours] = useState("");
  const [pay, setPay] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [jobs, setJobs] = useState<any[]>([]); // Store all jobs from the response
  const [loading, setLoading] = useState(false);

  const generateJobDetails = async () => {
    if (!shortDescription || !hours || !pay || !email) {
      Alert.alert("Error", "Please provide all required fields, including email!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/neighbors/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "generate", // Specify 'generate' mode
          text: shortDescription,
          hours: parseInt(hours, 10),
          pay: parseFloat(pay),
          additionalDetails,
          email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Generated Job Details:", result);

        if (result.jobs) {
          setJobs(result.jobs);
        } else {
          setJobs([]);
        }
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to generate job details.");
      }
    } catch (error) {
      console.error("Error during job detail generation:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const postJob = async (job: any) => {
    if (!email) {
      Alert.alert("Error", "Neighbor email is missing!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/neighbors/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "post", // Specify 'post' mode
          text: shortDescription,
          hours: parseInt(hours, 10),
          pay: parseFloat(pay),
          additionalDetails,
          category: job.category,
          title: job.title,
          email,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job successfully posted:", result);
        Alert.alert("Success", "Job posted successfully!");
        // Clear form
        setShortDescription("");
        setHours("");
        setPay("");
        setAdditionalDetails("");
        setJobs([]);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Job</Text>

      {/* Short Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter a short description"
        value={shortDescription}
        onChangeText={setShortDescription}
      />

      {/* Hours Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter number of hours"
        value={hours}
        onChangeText={setHours}
        keyboardType="numeric"
      />

      {/* Pay Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter pay (e.g., 100)"
        value={pay}
        onChangeText={setPay}
        keyboardType="numeric"
      />

      {/* Additional Details Input */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter additional details (optional)"
        value={additionalDetails}
        onChangeText={setAdditionalDetails}
        multiline
      />

      {/* Generate Job Details Button */}
      <TouchableOpacity style={styles.button} onPress={generateJobDetails} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generate Job Details</Text>
        )}
      </TouchableOpacity>

      {/* Generated Jobs List */}
      {jobs.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Generated Jobs:</Text>
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.job_id}
            renderItem={({ item }) => (
              <View style={styles.jobItem}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.jobCategory}>Category: {item.category}</Text>
                <TouchableOpacity style={styles.postButton} onPress={() => postJob(item)}>
                  <Text style={styles.postButtonText}>Post Job</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  jobItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  jobCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  postButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CreateJobScreen;
