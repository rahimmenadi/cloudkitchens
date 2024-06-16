import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
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
import { mainColor } from "../../../constants/theme";
import { useLoginChefMutation } from "../../../redux/APIs/userServiceApi";
export default function LogIn({ navigation }) {
  const [focus, setFocus] = useState(false);
  const [emailfocus, setemailFocus] = useState(false);
  const emailinput = useRef();
  const passwordinput = useRef();
  const [email, setemail] = useState("");
  const [target, settarget] = useState(0);
  const [password, setpassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //    const [login , {data , isError , isLoading , isSuccess , error}] = useLogInMutation();

  //   useEffect(() => {
  //     if(isSuccess){
  //         navigation.navigate('Home')
  //         saveToken(data?.token)
  //         console.log(data?.token)
  //     }
  //   }, [data])

  // const saveToken = async (token) => {
  //   try {
  //     await AsyncStorage.setItem('token', token);
  //     console.log('Token saved successfully');
  //   } catch (error) {
  //     console.error('Error saving token:', error);
  //   }
  // };
  // const getToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token !== null) {
  //       console.log('Token retrieved successfully:', token);
  //       return token;
  //     } else {
  //       console.log('No token found');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving token:', error);
  //     return null;
  //   }
  // };
  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     console.log('Token removed successfully');
  //   } catch (error) {
  //     console.error('Error removing token:', error);
  //   }
  // };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      settarget(1);
    }
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (!(password.length >= 8 && password.length <= 20)) {
      settarget(2);
    }
    return password.length >= 8 && password.length <= 20;
  };

  const [login, { data, isError, isLoading, isSuccess, error }] =
    useLoginChefMutation();

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address");
    } else if (!validatePassword(password)) {
      setErrorMessage("Password must be between 8 and 20 characters");
    } else {
      setErrorMessage("");
      // Handle sign up logic here
      // navigation.navigate('Home')
      const user = {
        email: email,
        password: password,
      };
      console.log(user);
      await login(user);
    }
  };
  async function savetoken(token) {
    if (!data?.data?.verified) {
      return console.log("you are not verified");
    }
    await SecureStore.setItemAsync("token", token);
    navigation.navigate("Fragments");
  }
  useEffect(() => {
    // localStorage.setItem("token",data?.token);
    if (isSuccess) {
      savetoken(data?.token);
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error]);

  const onChangeNumber = (e) => {
    setnumber(e + "");
  };
  const [number, setnumber] = useState("");

  const hundleGoSignIn = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.inputContainer(emailfocus)}>
          {emailfocus ? (
            <Fontisto name="email" size={24} color={mainColor} />
          ) : (
            <Fontisto name="email" size={24} color="#ddd" />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            selectionColor={mainColor}
            returnKeyType={"next"}
            onFocus={() => setemailFocus(true)}
            onBlur={() => setemailFocus(false)}
            ref={emailinput}
            onChangeText={(text) => {
              setemail(text);
            }}
            onSubmitEditing={() => passwordinput.current.focus()}
          />
        </View>
        {errorMessage && target == 1 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <View style={styles.inputContainer(focus)}>
          {focus ? (
            <Fontisto name="email" size={24} color={mainColor} />
          ) : (
            <Fontisto name="email" size={24} color="#ddd" />
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            ref={passwordinput}
            onChangeText={(text) => {
              setpassword(text);
            }}
            selectionColor={mainColor}
          />
        </View>
        {errorMessage && target == 2 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <TouchableHighlight
          underlayColor="none"
          style={[styles.goSignInButton]}
          onPress={hundleGoSignIn}
        >
          <Text style={[styles.secondoryText, styles.buttonText]}>
            Forget Password ?
          </Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
            Login
          </Text>
          {isLoading ? (
            <FontAwesome
              name="circle"
              size={14}
              style={{ marginStart: 10 }}
              color="#FFFFFF"
            />
          ) : null}
        </TouchableOpacity>
        {errorMessage && target == 4 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
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
    justifyContent: "center",
  },
  inputContainer: (focus) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: focus ? mainColor : "#ddd",
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
    justifyContent: "center",
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 30,
  },
  image: {
    width: 300,
    height: 308,
    marginTop: -40,
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
    color: "#ddd",
    fontSize: 12,
    width: "100%",
    textAlign: "right",
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
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: mainColor,
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
    shadowColor: mainColor, // Shadow color
    color: "white",
    alignItems: "center",
  },
  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
});
