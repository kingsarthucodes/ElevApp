import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { API_BASE_URL } from "../../config";

interface Job {
  _id: string;
  job_title: string;
  job_description: string;
  hours?: number;
  price?: number;
  services?: string[];
  email: string; // Add this line
}

const SearchForServicesScreen = ({ navigation, route }: any) => {
  const { email } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students/services`);

        if (response.ok) {
          const data: Job[] = await response.json();
          setJobs(data);
          setFilteredJobs(data);
        } else {
          Alert.alert("Error", "Failed to fetch jobs.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      job.job_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

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
      <Text style={styles.title}>Search for Services</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a service..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.job_title || "N/A"}</Text>
            <Text style={styles.jobDescription}>{item.job_description || "No description available."}</Text>
            <Text style={styles.jobDetails}>
              Hours: {item.hours || "N/A"} | Price: ${item.price?.toFixed(2) || "0.00"}
            </Text>
            <Text style={styles.jobServices}>
              Services: {item.services?.join(", ") || "No services listed."}
            </Text>
            {/* View Service Button */}
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() =>
                navigation.navigate("ViewService", {
                  jobId: item._id,
                  jobTitle: item.job_title,
                  jobDescription: item.job_description,
                  hours: item.hours,
                  price: item.price,
                  services: item.services,
                  email: item.email,
                  neighborEmail: route.params.email,
                })
              }
            >
              <Text style={styles.viewButtonText}>View Service</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResults}>No jobs found. Try another search!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  jobDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  jobDetails: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  jobServices: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
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

export default SearchForServicesScreen;
