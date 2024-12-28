import React, { useEffect, useState } from "react";
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

interface Service {
  _id: string;
  job_title: string;
  job_description: string;
  hours: number;
  price: number;
  requested_by: string | null; // Neighbor's email
  status: string;
}

const PostedServices = ({ route }: any) => {
  const { email } = route.params;
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPostedServices = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/jobs/my_jobs_student?email=${email}`
      );
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        Alert.alert("Error", "Failed to fetch posted services.");
      }
    } catch (error) {
      console.error("Error fetching posted services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostedServices();
  }, [email]);

  const handleAcceptRequest = async (jobId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/accept_job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, email }),
      });

      if (response.ok) {
        Alert.alert("Success", "Job accepted!");
        fetchPostedServices();
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Failed to accept the job.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const handleContactNeighbor = (neighborEmail: string) => {
    Alert.alert("Contact Neighbor", `You can contact the neighbor at: ${neighborEmail}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Loading your posted services...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Posted Services</Text>
      {services.length > 0 ? (
        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.serviceItem}>
              <Text style={styles.serviceTitle}>{item.job_title}</Text>
              <Text style={styles.serviceDetails}>{item.job_description}</Text>
              <Text style={styles.serviceDetails}>Hours: {item.hours}</Text>
              <Text style={styles.serviceDetails}>Price: ${item.price}</Text>
              <Text style={styles.serviceDetails}>
                Requested By:{" "}
                <Text style={styles.requestedBy}>
                  {item.requested_by || "No requests yet"}
                </Text>
              </Text>
              <Text style={styles.serviceDetails}>
                Status:{" "}
                <Text style={styles.acceptedStatus}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </Text>
              {item.status === "requested" && (
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptRequest(item._id)}
                >
                  <Text style={styles.acceptButtonText}>Accept Job</Text>
                </TouchableOpacity>
              )}
              {item.status === "accepted" && !!item.requested_by && (
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() =>
                    handleContactNeighbor(item.requested_by || "Email not available")
                  }
                >
                  <Text style={styles.contactButtonText}>Contact Neighbor</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noServices}>
          You have not posted any services yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  serviceItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  serviceTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  serviceDetails: { fontSize: 16, color: "#555", marginVertical: 5 },
  requestedBy: { color: "#007bff", fontWeight: "bold" },
  acceptedStatus: { color: "#28a745", fontWeight: "bold" },
  acceptButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  contactButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: { textAlign: "center", fontSize: 16, marginTop: 10 },
  noServices: { textAlign: "center", fontSize: 18, color: "#666", marginTop: 30 },
});

export default PostedServices;
