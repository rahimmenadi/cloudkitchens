import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LogIn from "./Auth/components/Login";
import SignUp from "./Auth/components/SignUp";
import Home from "./Home";
import Dashboard from "./Fragments/Dashboard/Dashboard";
import Menu from "./Fragments/Menu/Menu";
import Orders from "./Fragments/Orders/Orders";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Swipeable, TextInput } from "react-native-gesture-handler";

import { MaterialIcons } from "@expo/vector-icons";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import { LinearGradient } from "expo-linear-gradient";
import { mainColor } from "../constants/theme";
import profileImage from "../assets/profileImage.png";
import Settings from "./Fragments/Settings/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialBottomTabNavigator();

const Fragments = ({ navigation }) => {
  const removeToken = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("Token removed successfully");
      navigation.navigate("Auth", { screen: "LogIn" });
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
  const handlePressAccount = async () => {
    await removeToken();
  };
  return (
    <>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={handlePressAccount}
            style={styles.profileImageContainer}
          >
            <Image style={styles.profileImage} source={profileImage} />
          </TouchableOpacity>
        </View>
        <Text style={styles.bigText}>Eat Iot</Text>
        <View style={styles.rightHeader}>
          <View style={styles.iconContainer}>
            <Feather name="bell" size={24} color={mainColor} />
          </View>
        </View>
      </View>
      <Tab.Navigator
        initialRouteName="SignUp"
        inactiveColor="#877"
        activeColor={mainColor}
        activeIndicatorStyle={{ backgroundColor: "#5E3D1E33" }}
        sceneAnimationEnabled={true}
        sceneAnimationType="shifting"
        backBehavior="history"
        barStyle={{
          backgroundColor: "white",
          shadowRadius: 2,
          shadowOffset: {
            width: 0,
            height: -20,
          },
          shadowColor: "black",
          borderTopWidth: 0.5,
          borderColor: "#ddd",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            tabBarLabel: "DashBoard",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="space-dashboard" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant-menu" size={26} color={color} />
            ),
          }}
          name="SignUp"
          component={Menu}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="fastfood" size={26} color={color} />
            ),
          }}
          name="Orders"
          component={Orders}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="settings" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Fragments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#ddd",
    width: "100%",
    margin: 10,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: 15,
    fontSize: 12,
  },
  scrollview: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    width: "100%",
    paddingHorizontal: 30,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#ff5500",
    alignItems: "center",
    paddingVertical: 50,
  },
  image: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 117,
  },
  secondoryText: {
    color: "#777",
    fontSize: 12,
  },
  goSignInButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: "#494554",
    fontWeight: "bold",
  },
  mainButton: {
    backgroundColor: "#484bf2",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    color: "white",
    alignItems: "center",
  },
  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
  header: {
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
    height: 95,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  rightHeader: {
    flexDirection: "row",
    width: "auto",
    gap: 10,
  },
  profileImage: {
    objectFit: "cover",
    backgroundColor: "#ff550085",
    borderRadius: 8,
    height: "100%",
    width: 40,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 3,
    //   shadowColor: '#555', // Shadow color
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 3,
    //   shadowColor: '#555', // Shadow color
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  profileImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 3,
    //   shadowColor: '#555', // Shadow color
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    height: 50,
  },
});
