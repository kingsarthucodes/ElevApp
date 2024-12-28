import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { API_BASE_URL } from "../../config";

interface ServiceDetails {
  job_title: string;
  job_description: string;
  hours?: number;
  price?: number;
  services?: string[];
  posted_by: string; // Neighbor who posted the job
}

interface RequestedJob {
  request_id: string;
  service_details: ServiceDetails;
  status: string;
}

const RequestedJobsScreen = ({ route }: any) => {
  const { email } = route.params; // Student's email
  const [requestedJobs, setRequestedJobs] = useState<RequestedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestedJobs = async () => {
      try {
        console.log(`Fetching requested jobs for email: ${email}`);
        const response = await fetch(`${API_BASE_URL}/api/students/my-requests?email=${email}`);
        console.log("API Response Status:", response.status); // Log response status
        const responseText = await response.text();
        console.log("Raw API Response:", responseText); // Log raw response for debugging
  
        if (response.ok) {
          const data: RequestedJob[] = JSON.parse(responseText);
          console.log("Parsed Requested Jobs:", data);
          setRequestedJobs(data || []);
        } else {
          Alert.alert("Error", "Failed to fetch requested jobs.");
        }
      } catch (error) {
        console.error("Error fetching requested jobs:", error);
        Alert.alert("Error", "An error occurred while fetching your requested jobs.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchRequestedJobs();
  }, [email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading your requested jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs I've Requested</Text>
      {requestedJobs.length > 0 ? (
        <FlatList
          data={requestedJobs}
          keyExtractor={(item) => item.request_id}
          renderItem={({ item }) => (
            <View style={styles.jobItem}>
              <Text style={styles.jobTitle}>{item.service_details?.job_title || "N/A"}</Text>
              <Text style={styles.jobDescription}>
                {item.service_details?.job_description || "No description available"}
              </Text>
              <Text style={styles.jobDetails}>
                Hours: {item.service_details?.hours || "N/A"} | Price: $
                {item.service_details?.price?.toFixed(2) || "0.00"}
              </Text>
              <Text style={styles.jobDetails}>
                Posted By: {item.service_details?.posted_by || "Unknown"}
              </Text>
              <Text style={styles.jobStatus}>Status: {item.status || "Pending"}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.noResults}>You have not requested any jobs yet.</Text>
          }
        />
      ) : (
        <Text style={styles.noResults}>You have not requested any jobs yet.</Text>
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
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  jobItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  jobDetails: {
    fontSize: 14,
    color: "#555",
  },
  jobStatus: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 8,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default RequestedJobsScreen;
