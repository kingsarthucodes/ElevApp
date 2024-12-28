import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { API_BASE_URL } from "../../config";

interface ServiceDetails {
  jobTitle: string | null;
  jobDescription: string | null;
  hours?: number | null;
  price?: number | null;
  services?: string[] | null;
  postedBy?: string | null; // Student's email
}

interface Request {
  _id: string;
  status: string;
  service_details: ServiceDetails;
}

const RequestListScreen = ({ route, navigation }: any) => {
  const { email } = route.params; // Neighbor's email
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch requested services
  const fetchRequestedServices = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/requests?email=${email}`);
      if (response.ok) {
        const data: Request[] = await response.json();
        console.log("Fetched Requests:", data); // Debug log to check API response
        setRequests(data || []); // Fallback to an empty array if data is null
      } else {
        Alert.alert("Error", "Failed to fetch requested services.");
      }
    } catch (error) {
      console.error("Error fetching requested services:", error);
      Alert.alert("Error", "An error occurred while fetching requested services.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [email]);

  useEffect(() => {
    fetchRequestedServices();
  }, [fetchRequestedServices]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRequestedServices();
  };

  // Handle "Contact Student" button press
  const handleContactStudent = (studentEmail: string) => {
    Alert.alert(
      "Contact Student",
      `You can contact the student at: ${studentEmail}`
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading requested services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requested Services</Text>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const serviceDetails = item.service_details || {}; // Ensure service_details is defined

            return (
              <View style={styles.requestItem}>
                <Text style={styles.requestTitle}>
                  {serviceDetails.jobTitle || "N/A"}
                </Text>
                <Text style={styles.requestDescription}>
                  {serviceDetails.jobDescription || "No description available"}
                </Text>
                <Text style={styles.requestDetails}>
                  Hours: {serviceDetails.hours ?? "N/A"} | Price: $
                  {serviceDetails.price !== undefined && serviceDetails.price !== null
                    ? serviceDetails.price.toFixed(2)
                    : "0.00"}
                </Text>
                <Text style={styles.requestDetails}>
                  Services:{" "}
                  {serviceDetails.services?.join(", ") || "None specified"}
                </Text>
                <Text style={styles.requestDetails}>
                  Posted By: {serviceDetails.postedBy || "Unknown"}
                </Text>

                {/* Status */}
                <Text
                  style={[
                    styles.requestStatus,
                    item.status === "accepted"
                      ? styles.acceptedStatus
                      : styles.pendingStatus,
                  ]}
                >
                  Status: {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>

                {/* Contact Student Button */}
                {item.status === "accepted" && serviceDetails.postedBy && (
                  <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleContactStudent(serviceDetails.postedBy || "Unknown")}
                >
                  <Text style={styles.contactButtonText}>Contact Student</Text>
                </TouchableOpacity>
                
                )}
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.noResults}>No requested services found.</Text>
          }
        />
      ) : (
        <Text style={styles.noResults}>No requested services found.</Text>
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
  requestItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  requestDescription: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  requestDetails: {
    fontSize: 14,
    color: "#555",
  },
  requestStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  acceptedStatus: {
    color: "#28a745", // Green for accepted status
  },
  pendingStatus: {
    color: "#007bff", // Blue for pending status
  },
  contactButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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

export default RequestListScreen;
