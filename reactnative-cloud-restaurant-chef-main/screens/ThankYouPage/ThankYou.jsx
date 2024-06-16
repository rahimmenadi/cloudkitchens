import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import img from "../../assets/mainlogo.png";
import { mainColor } from "./../../constants/theme";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function ThankYou({ navigation }) {
  // Get today's date
  const today = new Date();

  // Calculate the date of the next week
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  // Format the date as desired
  const nextWeekDate = nextWeek.toISOString().split("T")[0]; // Format as YYYY-MM-DD

  const handleLogin = async () => {
    navigation.navigate("Auth", { screen: "LogIn" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.section}>
          <Image source={img} style={styles.image} resizeMode="contain" />

          <Text style={styles.bigText}>Thank You!</Text>
          <Text style={styles.secondoryText}>
            You have successfully sign up
          </Text>
          <View style={styles.statesContainer}>
            <View style={styles.stateItem}>
              <AntDesign name="checkcircle" size={24} color="#46C562" />
              <Text style={styles.stateItemText}>
                Your order is verified you can login below.
              </Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.stateItem}>
              <AntDesign name="closecircle" size={24} color="#C54646" />
              <Text style={styles.stateItemText}>your order is rejected.</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.stateItem}>
              <AntDesign name="questioncircle" size={24} color="#46A6C5" />
              <Text style={styles.stateItemText}>your order is pending.</Text>
            </View>
          </View>
          <View style={styles.noteContainer}>
            <FontAwesome5 name="hand-point-right" size={22} color="#888" />
            <Text style={styles.noteText}>
              we will send an email to you when the proccess end.
            </Text>
          </View>
          <View style={styles.noteContainer}>
            <FontAwesome5 name="hand-point-right" size={22} color="#888" />
            <Text style={styles.noteText}>
              if this date belaw passed please contact us by the number below.
            </Text>
          </View>
          <View style={styles.noteContainer}>
            <FontAwesome5 name="hand-point-right" size={22} color="#888" />
            <Text style={styles.noteText}>
              if you have any another problem you can call us anytime.
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.orderInfo}>
            Warning delay : <Text style={styles.infoText}>{nextWeekDate}</Text>
          </Text>
          <Text style={styles.orderInfo}>
            Our Phone : <Text style={styles.infoText}>0569875826</Text>
          </Text>

          <View style={styles.orderInfoContainer}>
            <Text>State :</Text>
            <AntDesign name="questioncircle" size={22} color="#46A6C5" />
          </View>

          <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  inputContainer: (focus) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: focus ? "#4B1834" : "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 15,
    height: 50,
  }),
  input: {
    width: "100%",
    flex: 1,
    height: "100%",
    paddingStart: 15,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 5,
    fontSize: 12,
    marginTop: -7,
    alignSelf: "flex-start",
  },
  scrollview: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    minHeight: "100%",
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  section: {
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 150,
  },
  bigText: {
    fontSize: 20,
    margin: 10,
    color: mainColor,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 117,
  },
  secondoryText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  goSignInButton: {
    marginLeft: 10,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#aaa",
    fontWeight: "bold",
  },
  mainButton: {
    backgroundColor: "#4B1834",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: "#4B1834", // Shadow color
    color: "white",
    alignItems: "center",
  },
  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
  statesContainer: {
    width: "100%",
    padding: 20,
    borderColor: "#ddd",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    backgroundColor: "white",
  },
  stateItem: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    width: "100%",
  },
  stateItemText: {
    flex: 1,
    fontSize: 12,
  },
  line: {
    height: 1,
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#ddd",
  },
  noteContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    gap: 15,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  noteText: {
    flex: 1,
    fontSize: 12,
  },
  orderInfoContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 5,
    marginBottom: 8,
    marginStart: 10,
  },
  orderInfo: {
    width: "100%",
    marginStart: 10,
    marginBottom: 5,
  },
  infoText: {
    fontWeight: "500",
  },
});
