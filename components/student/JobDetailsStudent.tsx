import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { API_BASE_URL } from "../../config";

const JobDetailsStudent = ({ route }: any) => {
  const { jobId, email } = route.params; // Get jobId and student email from route params
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch job details when the component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/neighbor/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Job Details:", data); // Debugging
          setJobDetails(data);
        } else {
          Alert.alert("Error", "Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        Alert.alert("Error", "An error occurred while fetching job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  // Handle the job request logic
  const handleRequestJob = async () => {
    if (!email) {
      Alert.alert("Error", "Student email is missing!");
      return;
    }

    if (!jobDetails) {
      Alert.alert("Error", "Job details are not loaded yet!");
      return;
    }

    try {
      // Sending a POST request to the `/api/students/request_job` endpoint
      const response = await fetch(`${API_BASE_URL}/api/students/request_job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          studentEmail: email,
          jobDetails: {
            job_title: jobDetails.title, // Corrected key to match the backend
            job_description: jobDetails.additional_details,
            hours: jobDetails.hours,
            price: jobDetails.pay,
            services: jobDetails.category,
            posted_by: jobDetails.posted_by_email,
          },
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "You have successfully requested this job!");
        setJobDetails((prevDetails: any) => ({
          ...prevDetails,
          status: "requested", // Update the status to reflect the request
        }));
      } else {
        const errorData = await response.json();
        console.error("Error requesting job:", errorData);
        Alert.alert("Error", errorData.error || "Failed to request the job.");
      }
    } catch (error) {
      console.error("Error requesting job:", error);
      Alert.alert("Error", "An error occurred while requesting the job.");
    }
  };

  // Render a loading screen while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  // Render an error message if job details fail to load
  if (!jobDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job details could not be loaded.</Text>
      </View>
    );
  }

  // Render the job details and the request button
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{jobDetails.title || "No Title"}</Text>
      <Text style={styles.details}>Hours: {jobDetails.hours || "N/A"}</Text>
      <Text style={styles.details}>Pay: ${jobDetails.pay?.toFixed(2) || "N/A"}</Text>
      <Text style={styles.details}>
        Additional Details: {jobDetails.additional_details || "None"}
      </Text>
      <Text style={styles.details}>Category: {jobDetails.category || "Uncategorized"}</Text>
      <Text style={styles.details}>
        Posted By: {jobDetails.posted_by_email || "Unknown"}
      </Text>

      {jobDetails.status === "requested" ? (
        <Text style={styles.requestedText}>You have already requested this job.</Text>
      ) : (
        <TouchableOpacity style={styles.requestButton} onPress={handleRequestJob}>
          <Text style={styles.requestButtonText}>Request Job</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  requestedText: {
    marginTop: 20,
    fontSize: 16,
    color: "#FF5733", // Orange for requested message
    textAlign: "center",
  },
  requestButton: {
    marginTop: 20,
    backgroundColor: "#007bff", // Blue for Request button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default JobDetailsStudent;

