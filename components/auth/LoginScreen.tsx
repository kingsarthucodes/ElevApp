import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles/LoginStyles";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../App";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validateEmail = (email: string): "student" | "neighbor" | null => {
    if (email.startsWith("stu_")) {
      return "student";
    } else if (email.startsWith("nbr_")) {
      return "neighbor";
    }
    return null;
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const userType = validateEmail(email);

    if (!userType) {
      Alert.alert(
        "Invalid Email",
        "Student emails must start with 'stu_' and Neighbor emails must start with 'nbr_'."
      );
      return;
    }

    if (userType === "student") {
      navigation.reset({
        index: 0,
        routes: [{ name: "StudentTabs", params: { email } }],
      });
    } else if (userType === "neighbor") {
      navigation.reset({
        index: 0,
        routes: [{ name: "NeighborTabs", params: { email } }],
      });
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
