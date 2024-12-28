import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { API_BASE_URL } from "../../config";

const JobDetailsScreen = ({ route, navigation }: any) => {
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/neighbors/post_job${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJobDetails(data);
        } else {
          Alert.alert("Error", "Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        Alert.alert("Error", "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const postJob = async () => {
    if (!jobDetails) {
      Alert.alert("Error", "No job details available to post!");
      return;
    }

    setPosting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Job posted successfully:", result);
        Alert.alert("Success", "Job has been posted successfully!");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error("Error posting job:", errorData);
        Alert.alert("Error", errorData.error || "Failed to post the job.");
      }
    } catch (error) {
      console.error("Error during job posting:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading job details...</Text>
      </View>
    );
  }

  if (!jobDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job details not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{jobDetails.title}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Category:</Text>
        <Text style={styles.value}>{jobDetails.category || "N/A"}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Hours:</Text>
        <Text style={styles.value}>{jobDetails.hours || "N/A"}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Pay Range:</Text>
        <Text style={styles.value}>{jobDetails.pay_range || "N/A"}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Additional Details:</Text>
        <Text style={styles.value}>
          {jobDetails.additional_details || "No additional details provided."}
        </Text>
      </View>

      {/* Upload Images Button */}
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Images</Text>
      </TouchableOpacity>

      {/* Post Job Button */}
      <TouchableOpacity style={styles.postButton} onPress={postJob} disabled={posting}>
        {posting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.postButtonText}>Post Job</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  detailContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
    textAlign: "left",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  postButton: {
    marginTop: 20,
    backgroundColor: "#FF5733",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;
