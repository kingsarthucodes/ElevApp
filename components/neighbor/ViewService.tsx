import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { API_BASE_URL } from "../../config";

const ViewServiceScreen = ({ route, navigation }: any) => {
  const { jobId, jobTitle, jobDescription, hours, price, services, email, neighborEmail } = route.params;
  const [isRequesting, setIsRequesting] = useState(false); // State for request progress
  const [hasRequested, setHasRequested] = useState(false); // State to track if already requested

  useEffect(() => {
    // Check if the service has already been requested
    const checkRequestStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/check_request?serviceId=${jobId}&neighborEmail=${neighborEmail}`
        );
        const data = await response.json();
        if (response.ok && data.hasRequested) {
          setHasRequested(true);
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    };

    checkRequestStatus();
  }, [jobId, neighborEmail]);

  const handleRequestService = async () => {
    if (!jobId || !neighborEmail) {
      Alert.alert("Error", "Service ID and neighbor email are required");
      return;
    }

    setIsRequesting(true); // Disable button while request is in progress

    try {
      const response = await fetch(`${API_BASE_URL}/api/services/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: jobId,
          neighborEmail,
          serviceDetails: {
            jobTitle,
            jobDescription,
            hours,
            price,
            services,
            postedBy: email,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setHasRequested(true); // Mark as requested
        Alert.alert("Success", "Service requested successfully!");
      } else if (response.status === 400 && data.error === "You have already requested this service") {
        setHasRequested(true); // Mark as requested
        Alert.alert("Info", "You have already requested this service.");
      } else {
        Alert.alert("Error", data.error || "Failed to request service.");
      }
    } catch (error) {
      console.error("Request service error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsRequesting(false); // Re-enable button after request
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{jobTitle || "Service Details"}</Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Description:</Text> {jobDescription || "N/A"}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Hours:</Text> {hours || "N/A"}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Price:</Text> ${price?.toFixed(2) || "0.00"}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Services:</Text> {services?.join(", ") || "N/A"}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Posted By:</Text> {email || "No email available"}
      </Text>

      {/* Contact Button */}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => Alert.alert("Contact", `Contacting ${email || "student"}`)}
      >
        <Text style={styles.contactButtonText}>Contact Student</Text>
      </TouchableOpacity>

      {/* Request Service Button */}
      <TouchableOpacity
        style={[
          styles.requestButton,
          isRequesting || hasRequested ? styles.disabledButton : null,
        ]}
        onPress={handleRequestService}
        disabled={isRequesting || hasRequested} // Disable if already requested or requesting
      >
        <Text style={styles.requestButtonText}>
          {hasRequested ? "Service Requested" : isRequesting ? "Requesting..." : "Request Service"}
        </Text>
      </TouchableOpacity>
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
  details: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  requestButton: {
    marginTop: 16,
    backgroundColor: "#28a745", // Green color for "Request Service" button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#94d3a2", // Lighter green to indicate disabled state
  },
});

export default ViewServiceScreen;
