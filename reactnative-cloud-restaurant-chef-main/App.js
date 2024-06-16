import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect, useState } from "react";
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
import img from "./assets/favicon.png";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from "./screens/Home";
import Auth from "./screens/Auth/Auth";
import ThankYou from "./screens/ThankYouPage/ThankYou.jsx";
import Fragments from "./screens/Fragments.jsx";
import AddMealPage from "./screens/AddMealPage/AddMealPage";
import SearchPage from "./screens/SearchPage/SearchPage";
import OrderPage from "./screens/OrderPage/OrderPage";
import RecipeDetailScreen from "./screens/ReceipeDetails/RecipeDetailScreen";

const Stack = createStackNavigator();

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 20;
  };

  const handleSignUp = () => {
    if (username.length < 3 || username.length > 20) {
      setErrorMessage("Username must be between 3 and 20 characters");
    } else if (!validateEmail(email)) {
      setErrorMessage("Invalid email address");
    } else if (!validatePassword(password)) {
      setErrorMessage("Password must be between 8 and 20 characters");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      // Handle sign up logic here
      setErrorMessage("");
      console.log("Sign up successful");
    }
  };

  const onChangeEmail = (e) => {
    setemail(e);
  };
  const onChangeNumber = (e) => {
    setnumber(e + "");
  };
  const onChangePassword = (e) => {
    setpassword(e);
  };
  const [number, setnumber] = useState("");

  const hundleGoSignIn = () => {};
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Fragments"
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="ThankYou" component={ThankYou} />
          <Stack.Screen name="Fragments" component={Fragments} />
          <Stack.Screen name="AddMeal" component={AddMealPage} />
          <Stack.Screen name="SearchPage" component={SearchPage} />
          <Stack.Screen name="MealPage" component={RecipeDetailScreen} />
          <Stack.Screen name="OrderPage" component={OrderPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
