// SplashScreen.js
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const SplashScreen = ({ navigation }) => {
  const [thetoken, setthetoken] = useState("");
  const [isloading, setisloading] = useState(false);
  async function gettoken() {
    const token = await SecureStore.getItemAsync("token");
    setisloading(true);
    if (token) {
      setthetoken(token);
    } else {
      setthetoken("a");
    }
  }
  useEffect(() => {
    gettoken();
  }, []);

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      if (isloading) {
        if (thetoken?.length > 2) {
          console.log("the token" + thetoken);
          navigation.replace("Fragments"); // Replace splash screen with SignIn screen after 2 seconds
          // console.log(gettoken())
        } else if (thetoken?.length < 2) {
          navigation.replace("Auth"); // Replace splash screen with SignIn screen after 2 seconds
          console.log("the token " + thetoken);
        } else {
          console.log("9iiiiiw");
        }
      }
    }, 2000);
  }, [thetoken, isloading]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/youtbeblack.png")} // Replace with your splash screen image
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default SplashScreen;
