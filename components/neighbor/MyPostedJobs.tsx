import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { API_BASE_URL } from "../../config";

interface Job {
  _id: string;
  title: string;
  hours: number;
  pay: number;
  additional_details: string;
  status: string; // Status field from the backend
  accepted_by?: string; // Email of the student who accepted the job
}

type RootStackParamList = {
  PostedJobDetails: {
    jobId: string;
    acceptedBy?: string;
    title: string;
    details: string;
    hours: number;
    pay: number;
  };
};

const MyPostedJobs = ({ route }: { route: any }) => {
    const { email } = route.params; // Access email passed through navigation
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const fetchPostedJobs = useCallback(async () => {
      try {
        console.log(`Fetching jobs posted by: ${email}`); // Debugging
        const response = await fetch(`${API_BASE_URL}/api/jobs/my_jobs?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Jobs:", data); // Debugging
          setJobs(data);
        } else {
          const errorData = await response.json();
          console.error("Error fetching jobs:", errorData);
          Alert.alert("Error", errorData.error || "Failed to fetch your posted jobs.");
        }
      } catch (error) {
        console.error("Error fetching posted jobs:", error);
        Alert.alert("Error", "An error occurred while fetching your posted jobs.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, [email]);
  
    const handleAcceptJob = async (jobId: string) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/jobs/accept_job`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId,
            email, // Neighbor's email
          }),
        });
  
        if (response.ok) {
          Alert.alert("Success", "Job accepted successfully!");
          fetchPostedJobs(); // Refresh the job list after accepting the job
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.error || "Failed to accept the job.");
        }
      } catch (error) {
        console.error("Error accepting job:", error);
        Alert.alert("Error", "An error occurred while accepting the job.");
      }
    };
  
    useEffect(() => {
      fetchPostedJobs();
    }, [fetchPostedJobs]);
  
    const handleRefresh = () => {
      setRefreshing(true);
      fetchPostedJobs();
    };
  
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>Loading your posted jobs...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Posted Jobs</Text>
  
        {jobs.length > 0 ? (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.jobItem}>
                <Text style={styles.jobTitle}>{item.title || "No Title"}</Text>
                <Text style={styles.jobDetails}>
                  Hours: {item.hours || "N/A"} | Pay: ${item.pay?.toFixed(2) || "N/A"}
                </Text>
                <Text style={styles.jobDescription}>
                  {item.additional_details || "No additional details provided."}
                </Text>
                <Text style={styles.jobStatus}>
                  Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
  
                {item.status === "requested" ? (
                  <TouchableOpacity
                    style={[styles.statusButton, styles.acceptButton]}
                    onPress={() => handleAcceptJob(item._id)}
                  >
                    <Text style={styles.statusButtonText}>Accept Job</Text>
                  </TouchableOpacity>
                ) : item.status === "accepted" ? (
                  <TouchableOpacity
                    style={[styles.statusButton, styles.accepted]}
                    onPress={() => {
                      console.log("Navigating to PostedJobDetails for:", item._id); // Debugging
                      navigation.navigate("PostedJobDetails", {
                        jobId: item._id,
                        acceptedBy: item.accepted_by,
                        title: item.title,
                        details: item.additional_details,
                        hours: item.hours,
                        pay: item.pay,
                      });
                    }}
                  >
                    <Text style={styles.statusButtonText}>View Accepted Job</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.pendingText}>
                    {item.status === "pending"
                      ? "Awaiting Student Request"
                      : "No Requests Yet"}
                  </Text>
                )}
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        ) : (
          <Text style={styles.noResults}>You have not posted any jobs yet.</Text>
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
    jobDetails: {
      fontSize: 14,
      color: "#666",
      marginVertical: 4,
    },
    jobDescription: {
      fontSize: 14,
      color: "#555",
    },
    jobStatus: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#007bff",
      marginTop: 8,
    },
    statusButton: {
      marginTop: 10,
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    accepted: {
      backgroundColor: "#28a745", // Green for accepted jobs
    },
    acceptButton: {
      backgroundColor: "#007bff", // Blue for accepting jobs
    },
    pendingText: {
      marginTop: 10,
      fontSize: 14,
      color: "#dc3545", // Red for pending/unaccepted jobs
    },
    statusButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
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
  
  export default MyPostedJobs;