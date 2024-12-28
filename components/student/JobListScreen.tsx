import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { API_BASE_URL } from "../../config";

interface Job {
  _id: string;
  title: string;
  hours: number;
  pay: number;
  additional_details: string;
  category: string;
}

const JobListScreen = ({ navigation, route }: any) => {
  const { email } = route.params; // Get studentEmail from navigation params
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/neighbor`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          Alert.alert("Error", "Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        Alert.alert("Error", "An error occurred while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading jobs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobs Posted by Neighbors</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.jobItem}
            onPress={() =>
              navigation.navigate("JobDetailsStudent", {
                jobId: item._id,
                email, // Pass studentEmail here
              })
            }
          >
            <Text style={styles.jobTitle}>{item.title || "No Title"}</Text>
            <Text style={styles.jobDetails}>
              Hours: {item.hours || "N/A"} | Pay: ${item.pay?.toFixed(2) || "N/A"}
            </Text>
            <Text style={styles.jobDescription}>
              {item.additional_details || "No additional details provided."}
            </Text>
            <Text style={styles.jobCategory}>
              Category: {item.category || "Uncategorized"}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No jobs found. Try again later!</Text>
        }
      />
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
  jobDetails: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  jobDescription: {
    fontSize: 14,
    color: "#555",
  },
  jobCategory: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007bff",
    marginTop: 8,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});

export default JobListScreen;
