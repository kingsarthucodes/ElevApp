import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome5"; // Updated to FontAwesome5
import { LogBox } from "react-native";

// Import Auth Screens
import LoginScreen from "./components/auth/LoginScreen";
import CreateAccountScreen from "./components/auth/CreateAccount";
import StudentRegistrationScreen from "./components/auth/StudentRegistrationScreen";

// Student Screens
import StudentHomeScreen from "./components/student/HomeScreen";
import StudentProfileScreen from "./components/student/ProfileScreen";
import EnterJobScreen from "./components/student/EnterJobScreen";
import JobListScreen from "./components/student/JobListScreen";
import JobDetailsStudentScreen from "./components/student/JobDetailsStudent";
import PostJobScreen from "./components/student/PostJobScreen";
import MyJobsStudents from "./components/student/MyJobsStudents";
import PostedServices from "./components/student/PostedServices";
import RequestedJobsScreen from "./components/student/RequestedJobsScreen";

// Neighbor Screens
import NeighborHomeScreen from "./components/neighbor/HomeScreen";
import NeighborProfileScreen from "./components/neighbor/ProfileScreen";
import EnterRequestScreen from "./components/neighbor/EnterRequestScreen";
import RequestListScreen from "./components/neighbor/RequestListScreen";
import RequestDetailsScreen from "./components/neighbor/RequestDetailsScreen";
import ViewProfile from "./components/neighbor/ViewProfile";
import SearchForServicesScreen from "./components/neighbor/SearchForServicesScreen";
import NotificationsScreen from "./components/neighbor/NotificationsScreen";
import CreateJobScreen from "./components/neighbor/CreateJobScreen";
import JobDetailsNeighborScreen from "./components/neighbor/JobDetailsNeighbor";
import MyJobsNeighbors from "./components/neighbor/MyJobsNeighbors";
import MyPostedJobs from "./components/neighbor/MyPostedJobs";
import PostedJobDetails from "./components/neighbor/PostedJobDetails";
import ViewServiceScreen from "./components/neighbor/ViewService";



LogBox.ignoreAllLogs();

// Define the RootStackParamList for navigation
export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  StudentRegistration: undefined;
  StudentTabs: { email: string };
  NeighborTabs: { email: string };
  EnterJob: undefined;
  JobDetailsStudent: { jobId: string };
  RequestList: { email: string };
  RequestDetails: undefined;
  JobDetailsNeighbor: { jobId: string };
  MyPostedJobs: { email: string };
  PostedJobDetails: { email: string };
  StudentProfile: { email: string; editable: boolean; studentDetails?: any };
  PostedServices: { email: string };
  RequestedJobs: { email: string };
  ViewService: { email: string };
};

// Define the Stack and Tab navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const StudentTabs = ({ route }: { route: any }) => {
  const { email } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Profile":
              iconName = "user";
              break;
            case "Post Service":
              iconName = "plus-circle";
              break;
            case "Search Jobs":
              iconName = "search";
              break;
            case "Notifications":
              iconName = "bell";
              break;
            case "My Jobs":
              iconName = "briefcase";
              break;
            default:
              iconName = "circle";
          }

          return (
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
              solid // Enforce FontAwesome5 solid style
            />
          );
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "#aaa",
      })}
    >
      <Tab.Screen
        name="Home"
        component={StudentHomeScreen}
        initialParams={{ email }}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Profile"
        component={StudentProfileScreen}
        initialParams={{ email, editable: false }}
        options={{ title: "Profile" }}
      />
      <Tab.Screen
        name="Post Service"
        component={PostJobScreen}
        initialParams={{ email }}
        options={{ title: "Post Service" }}
      />
      <Tab.Screen
        name="Search Jobs"
        component={JobListScreen}
        initialParams={{ email }}
        options={{ title: "Search Jobs" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        initialParams={{ email }}
        options={{ title: "Notifications" }}
      />
      <Tab.Screen
        name="My Jobs"
        component={MyJobsStudents}
        initialParams={{ email }}
        options={{ title: "My Jobs" }}
      />
    </Tab.Navigator>
  );
};

const NeighborTabs = ({ route }: any) => {
  const { email } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Profile":
              iconName = "user";
              break;
            case "View Profile":
              iconName = "eye";
              break;
            case "Create Job":
              iconName = "plus-circle";
              break;
            case "Search Services":
              iconName = "search";
              break;
            case "Notifications":
              iconName = "bell";
              break;
            case "My Jobs":
              iconName = "briefcase";
              break;
            default:
              iconName = "circle";
          }

          return (
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
              solid // Enforce FontAwesome5 solid style
            />
          );
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "#aaa",
      })}
    >
      <Tab.Screen
        name="Home"
        component={NeighborHomeScreen}
        initialParams={{ email }}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Profile"
        component={NeighborProfileScreen}
        initialParams={{ email }}
        options={{ title: "Profile" }}
      />
      <Tab.Screen
        name="View Profile"
        component={ViewProfile}
        initialParams={{ email }}
        options={{ title: "View Profile" }}
      />
      <Tab.Screen
        name="Create Job"
        component={CreateJobScreen}
        initialParams={{ email }}
        options={{ title: "Create Job" }}
      />
      <Tab.Screen
        name="Search Services"
        component={SearchForServicesScreen}
        initialParams={{ email }}
        options={{ title: "Search Services" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        initialParams={{ email }}
        options={{ title: "Notifications" }}
      />
      <Tab.Screen
        name="My Jobs"
        component={MyJobsNeighbors}
        initialParams={{ email }}
        options={{ title: "My Jobs" }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen
            name="StudentRegistration"
            component={StudentRegistrationScreen}
          />
          <Stack.Screen
            name="StudentTabs"
            component={StudentTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NeighborTabs"
            component={NeighborTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
