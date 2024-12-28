import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { io, Socket } from "socket.io-client";
import { API_BASE_URL } from "../../config";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
}

const NotificationsScreen = ({ route }: any) => {
  const { email } = route.params;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  let socket: Socket | null = null;

  // Fetch existing notifications (for initial load)
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications?email=${email}`);
      if (response.ok) {
        const data: Notification[] = await response.json();
        setNotifications(data || []);
      } else {
        Alert.alert("Error", "Failed to fetch notifications.");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      Alert.alert("Error", "An error occurred while fetching notifications.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Connect to WebSocket
  const initializeSocket = () => {
    socket = io(`${API_BASE_URL}`, {
      transports: ["websocket"], // Explicitly use WebSocket transport
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server!");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server!");
    });

    // Listen for new notifications
    socket.on("notification", (data: Notification) => {
      console.log("Received new notification:", data);
      setNotifications((prev) => [data, ...prev]); // Add new notification to the top
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  };

  // Disconnect socket on unmount
  const cleanupSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    fetchNotifications(); // Load existing notifications
    initializeSocket(); // Initialize WebSocket connection

    return () => {
      cleanupSocket(); // Cleanup on unmount
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading notifications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.noResults}>No notifications found.</Text>
          }
        />
      ) : (
        <Text style={styles.noResults}>No notifications found.</Text>
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
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  notificationMessage: {
    fontSize: 16,
    color: "#333",
  },
  notificationTimestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
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

export default NotificationsScreen;
