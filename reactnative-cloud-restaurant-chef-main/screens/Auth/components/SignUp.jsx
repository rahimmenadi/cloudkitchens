import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
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
  Dimensions,
  useWindowDimensions,
  Alert,
  BackHandler,
} from "react-native";
import img from "../../../assets/no-img-avatar.8c84566a7ea4355ab04c.jpg";
import imlogoalt from "../../../assets/uploadlogo.png";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { Fontisto, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { mainColor } from "../../../constants/theme";
import {
  useSignUpChefMutation,
  useSignUpMutation,
} from "../../../redux/APIs/userServiceApi";

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      backgroundColor: "white",
      justifyContent: "center",
    },
    inputContainer: (firstnameFocus) => ({
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderColor: firstnameFocus ? mainColor : "#ddd",
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
    imageContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
    },
    image: {
      width: "100%",
      height: 220,
      borderRadius: 10,
    },
    bigText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    footerContainer: {
      flexDirection: "row",
      marginBottom: 10,
      marginTop: 10,
    },
    secondoryText: {
      color: "#777",
      fontSize: 12,
    },
    buttonText: {
      color: "#494554",
      fontWeight: "bold",
    },
    mainButton: {
      backgroundColor: mainColor,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
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
};

export default function SignUp({ navigation }) {
  const [nameFocus, setnameFocus] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);
  const [phoneNumberFocus, setphoneNumberFocus] = useState(false);
  const [ccpFocus, setccpFocus] = useState(false);
  const [restaurantNameFocus, setrestaurantNameFocus] = useState(false);
  const [wilayaFocus, setwilayaFocus] = useState(false);
  const [baladiyaFocus, setBaladiyaFocus] = useState(false);
  const [streetFocus, setstreetFocus] = useState(false);
  const [confirmpassFocus, setconfirmpassFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [target, settarget] = useState(0);
  const [page, setPage] = useState(1);

  const [termsChecked, settermsChecked] = useState(false);

  const emailinput = useRef();
  const passwordinput = useRef();
  const confirmpassinput = useRef();
  const phoneinput = useRef();
  const ccpinput = useRef();
  const restaurantinput = useRef();
  const wilayainput = useRef();
  const baladiyainput = useRef();
  const streetinput = useRef();
  const inputcardNumber = useRef();
  const inputissuedBy = useRef();
  const inputreleaseDate = useRef();
  const inputexpiryDate = useRef();
  const inputnationalNumber = useRef();
  const inputsurname = useRef();
  const inputname = useRef();
  const inputbirthDate = useRef();
  const inputsex = useRef();
  const inputrh = useRef();
  const inputbirthPlace = useRef();

  const styles = useStyles();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        switch (page) {
          case 1:
            navigation.goBack();
            break;
          case 2:
            setPage(1);
            break;
          case 3:
            setPage(2);
            break;
          default:
            setPage(3);
            break;
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => {
        backHandler.remove();
      };
    }, [page])
  );

  const [confirmpass, setconfirmpass] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    ccp: "",
    restaurantName: "",
    logo: "",
    photo: "",
    address: {
      wilaya: "",
      baladiya: "",
      street: "",
    },
    nationalCard: {
      cardNumber: "",
      issuedBy: "",
      releaseDate: "",
      expiryDate: "",
      nationalNumber: "",
      surname: "",
      name: "",
      birthDate: "",
      sex: "",
      rh: "",
      birthPlace: "",
    },
  });

  const handleNext = () => {
    if (page == 1) {
      // if (!formData.name || !formData.password || !formData.email || !formData.phoneNumber) {
      //   setErrorMessage('Please fill in all fields');
      //   settarget(5)
      //   return;
      // }
      if (!formData.photo) {
        setErrorMessage("The Photo is required");
        settarget(0);
      } else if (formData.name.length < 3 || formData.name.length > 20) {
        setErrorMessage("Name must be between 3 and 20 characters");
        settarget(1);
      } else if (!validateEmail(formData.email)) {
        setErrorMessage("Invalid email address");
      } else if (formData.phoneNumber.length != 10) {
        setErrorMessage("Invalid Phone Number");
        settarget(3);
      } else if (!validatePassword(formData.password)) {
        setErrorMessage("The password must be longer than 8 characters");
        settarget(4);
      } else if (formData.password != confirmpass) {
        setErrorMessage("The Confirm password does not match the password");
        settarget(5);
      } else {
        // Handle sign up logic here
        setErrorMessage("");
        setPage(page + 1);
      }
    }
    if (page == 2) {
      if (!formData.logo) {
        setErrorMessage("The logo is required");
        settarget(6);
      } else if (formData.ccp.length != 12) {
        setErrorMessage("CCP is not valid");
        settarget(7);
      } else if (
        formData.restaurantName.length < 3 ||
        formData.restaurantName.length > 20
      ) {
        setErrorMessage("restaurent name must be between 3 and 20 characters");
        settarget(8);
      } else {
        // Handle sign up logic here
        setErrorMessage("");
        setPage(page + 1);
      }
    }
    if (page == 3) {
      if (
        formData.address.wilaya.length < 3 ||
        formData.address.wilaya.length > 20
      ) {
        setErrorMessage("Wilaya must be between 3 and 20 characters");
        settarget(9);
      } else if (
        formData.address.baladiya.length < 3 ||
        formData.address.baladiya.length > 20
      ) {
        setErrorMessage("Baladiya must be between 3 and 20 characters");
        settarget(10);
      } else if (
        formData.address.street.length < 5 ||
        formData.address.street.length > 20
      ) {
        setErrorMessage("Street must be between 5 and 20 characters");
        settarget(11);
      } else if (!termsChecked) {
        setErrorMessage("You must accept our terms and conditions");
        settarget(12);
      } else {
        // Handle sign up logic here
        setErrorMessage("");
        setPage(page + 1);
      }
    }
    if (page == 4) {
      setErrorMessage("");
      setPage(page + 1);
    }
  };

  const handleChangeInputValidate = () => {
    if (page == 1) {
      // if (!formData.name || !formData.password || !formData.email || !formData.phoneNumber) {
      //   setErrorMessage('Please fill in all fields');
      //   settarget(5)
      //   return;
      // }
      if (!formData.photo) {
      } else if (formData.name.length < 3 || formData.name.length > 20) {
      } else if (!validateEmail(formData.email)) {
      } else if (formData.phoneNumber.length != 10) {
      } else if (!validatePassword(formData.password)) {
      } else if (formData.password != confirmpass) {
      } else {
        setErrorMessage("");
      }
    }
    if (page == 2) {
      if (!formData.logo) {
      } else if (formData.ccp.length != 12) {
      } else if (
        formData.restaurantName.length < 3 ||
        formData.restaurantName.length > 20
      ) {
      } else {
        // Handle sign up logic here
        setErrorMessage("");
      }
    }
    if (page == 3) {
      if (
        formData.address.wilaya.length < 3 ||
        formData.address.wilaya.length > 20
      ) {
      } else if (
        formData.address.baladiya.length < 3 ||
        formData.address.baladiya.length > 20
      ) {
      } else if (
        formData.address.street.length < 5 ||
        formData.address.street.length > 20
      ) {
      } else if (!termsChecked) {
      } else {
        setErrorMessage("");
      }
    }
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      settarget(2);
    }
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (!(password.length >= 8 && password.length <= 20)) {
      settarget(4);
    }
    return password.length >= 8 && password.length <= 20;
  };

  const hundleGoSignIn = () => {
    navigation.navigate("LogIn");
  };
  const hundleGoBack = () => {
    navigation.goBack();
  };
  const [image, setImage] = useState();
  const [photo, setPhoto] = useState();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
      setFormData({
        ...formData,
        logo: result?.assets[0]?.uri,
      });
    }
  };
  const pickPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result?.assets[0]?.uri);
      setFormData({
        ...formData,
        photo: result?.assets[0]?.uri,
      });
    }
  };
  const handleTermsAcceptance = (value) => {
    settermsChecked(value);
  };

  const [signUp, { data, isError, isLoading, isSuccess, error }] =
    useSignUpChefMutation();
  function dataURLtoFile(dataurl, filename) {
    console.log(dataurl);
    var arr = dataurl?.uri?.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleSignUp = async () => {
    if (
      formData.address.wilaya.length < 3 ||
      formData.address.wilaya.length > 20
    ) {
      setErrorMessage("Wilaya must be between 3 and 20 characters");
      settarget(9);
    } else if (
      formData.address.baladiya.length < 3 ||
      formData.address.baladiya.length > 20
    ) {
      setErrorMessage("Baladiya must be between 3 and 20 characters");
      settarget(10);
    } else if (
      formData.address.street.length < 5 ||
      formData.address.street.length > 20
    ) {
      setErrorMessage("Street must be between 5 and 20 characters");
      settarget(11);
    } else if (!termsChecked) {
      setErrorMessage("You must accept our terms and conditions");
      settarget(12);
    } else {
      // Handle sign up logic here
      setErrorMessage("");

      // Process sign-up logic here
      console.log("Form Data:", formData);
      const user = new FormData();
      user.append("name", formData.name);
      user.append("email", formData.email);
      user.append("password", formData.password);
      user.append("phoneNumber", formData.phoneNumber);

      user.append("logo", {
        uri: formData.logo,
        name: "photo",
        type: `image/${formData.logo.split(".").pop()}`,
      });
      user.append("ccp", formData.ccp);
      user.append("restaurantName", formData.restaurantName);
      user.append("address[wilaya]", formData.address.wilaya);
      user.append("address[baladiya]", formData.address.baladiya);
      user.append("address[street]", formData.address.street);
      user.append("photo", {
        uri: formData.photo,
        name: "photo",
        type: `image/${formData.photo.split(".").pop()}`,
      });

      user.append("nationalCard[cardNumber]", formData.nationalCard.cardNumber);
      user.append("nationalCard[issuedBy]", formData.nationalCard.issuedBy);
      user.append(
        "nationalCard[releaseDate]",
        formData.nationalCard.releaseDate
      );
      user.append("nationalCard[expiryDate]", formData.nationalCard.expiryDate);
      user.append(
        "nationalCard[nationalNumber]",
        formData.nationalCard.nationalNumber
      );
      user.append("nationalCard[surname]", formData.nationalCard.surname);
      user.append("nationalCard[name]", formData.nationalCard.name);
      user.append("nationalCard[birthDate]", formData.nationalCard.birthDate);
      user.append("nationalCard[sex]", formData.nationalCard.sex);
      user.append("nationalCard[rh]", formData.nationalCard.rh);
      user.append("nationalCard[birthPlace]", formData.nationalCard.birthDate);
      // console.log(user);
      await signUp(user);
    }
  };
  useEffect(() => {
    // localStorage.setItem("token",data?.token);
    if (isSuccess) {
      navigation.navigate("ThankYou");
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scrollview}
      >
        {page === 1 && (
          <>
            <TouchableHighlight
              style={styles.imageContainer}
              underlayColor="none"
              onPress={pickPhoto}
            >
              <Image
                source={photo ? { uri: photo } : img}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableHighlight>
            {errorMessage && target == 0 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <View style={styles.inputContainer(nameFocus)}>
              {nameFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                placeholder="Name"
                selectionColor={mainColor}
                returnKeyType={"next"}
                onFocus={() => setnameFocus(true)}
                onBlur={() => setnameFocus(false)}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                onSubmitEditing={() => emailinput.current.focus()}
              />
            </View>
            {errorMessage && target == 1 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(emailFocus)}>
              {emailFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.email}
                placeholder="Email"
                keyboardType="email-address"
                ref={emailinput}
                selectionColor={mainColor}
                returnKeyType={"next"}
                onFocus={() => setemailFocus(true)}
                onBlur={() => setemailFocus(false)}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                onSubmitEditing={() => phoneinput.current.focus()}
              />
            </View>
            {errorMessage && target == 2 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(phoneNumberFocus)}>
              {phoneNumberFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                placeholder="Phone"
                keyboardType="phone-pad"
                selectionColor={mainColor}
                returnKeyType={"next"}
                ref={phoneinput}
                onFocus={() => setphoneNumberFocus(true)}
                onBlur={() => setphoneNumberFocus(false)}
                onChangeText={(text) =>
                  setFormData({ ...formData, phoneNumber: text })
                }
                onSubmitEditing={() => passwordinput.current.focus()}
              />
            </View>
            {errorMessage && target == 3 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(passwordFocus)}>
              {passwordFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.password}
                placeholder="Password"
                secureTextEntry={true}
                selectionColor={mainColor}
                returnKeyType={"next"}
                ref={passwordinput}
                onFocus={() => setpasswordFocus(true)}
                onBlur={() => setpasswordFocus(false)}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                onSubmitEditing={() => confirmpassinput.current.focus()}
              />
            </View>
            {errorMessage && target == 4 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(confirmpassFocus)}>
              {confirmpassFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={confirmpass}
                placeholder="Confirm Password"
                secureTextEntry={true}
                selectionColor={mainColor}
                ref={confirmpassinput}
                onFocus={() => setconfirmpassFocus(true)}
                onBlur={() => setconfirmpassFocus(false)}
                onChangeText={(text) => setconfirmpass(text)}
              />
            </View>
            {errorMessage && target == 5 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.mainButton} onPress={handleNext}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </>
        )}
        {page === 2 && (
          <>
            <TouchableHighlight
              style={styles.imageContainer}
              underlayColor="none"
              onPress={pickImage}
            >
              <Image
                source={image ? { uri: image } : imlogoalt}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableHighlight>
            {errorMessage && target == 6 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(ccpFocus)}>
              {ccpFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.ccp}
                placeholder="CCP"
                keyboardType="numeric"
                selectionColor={mainColor}
                returnKeyType={"next"}
                ref={ccpinput}
                onFocus={() => setccpFocus(true)}
                onBlur={() => setccpFocus(false)}
                onChangeText={(text) => setFormData({ ...formData, ccp: text })}
                onSubmitEditing={() => restaurantinput.current.focus()}
              />
            </View>
            {errorMessage && target == 7 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(restaurantNameFocus)}>
              {restaurantNameFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.restaurantName}
                placeholder="Restaurant Name"
                selectionColor={mainColor}
                ref={restaurantinput}
                onFocus={() => setrestaurantNameFocus(true)}
                onBlur={() => setrestaurantNameFocus(false)}
                onChangeText={(text) =>
                  setFormData({ ...formData, restaurantName: text })
                }
              />
            </View>
            {errorMessage && target == 8 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.mainButton} onPress={handleNext}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </>
        )}
        {page === 3 && (
          <>
            <View style={styles.inputContainer(wilayaFocus)}>
              {wilayaFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.address.wilaya}
                placeholder="Wilaya"
                ref={wilayainput}
                selectionColor={mainColor}
                returnKeyType={"next"}
                onFocus={() => setwilayaFocus(true)}
                onBlur={() => setwilayaFocus(false)}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, wilaya: text },
                  })
                }
                onSubmitEditing={() => baladiyainput.current.focus()}
              />
            </View>
            {errorMessage && target == 9 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(baladiyaFocus)}>
              {baladiyaFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.address.baladiya}
                placeholder="Baladiya"
                ref={baladiyainput}
                selectionColor={mainColor}
                returnKeyType={"next"}
                onFocus={() => setBaladiyaFocus(true)}
                onBlur={() => setBaladiyaFocus(false)}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, baladiya: text },
                  })
                }
                onSubmitEditing={() => streetinput.current.focus()}
              />
            </View>
            {errorMessage && target == 10 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View style={styles.inputContainer(streetFocus)}>
              {streetFocus ? (
                <Fontisto name="email" size={24} color={mainColor} />
              ) : (
                <Fontisto name="email" size={24} color="#ddd" />
              )}

              <TextInput
                style={styles.input}
                value={formData.address.street}
                placeholder="Street"
                ref={streetinput}
                selectionColor={mainColor}
                onFocus={() => setstreetFocus(true)}
                onBlur={() => setstreetFocus(false)}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: text },
                  })
                }
              />
            </View>
            {errorMessage && target == 11 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginVertical: 10,
                marginBottom: 20,
              }}
            >
              <Checkbox
                value={termsChecked}
                style={{
                  marginEnd: 20,
                  marginStart: 7,
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                }}
                onValueChange={handleTermsAcceptance}
              />
              <Text>I accept the terms and conditions</Text>
            </View>

            {errorMessage && target == 12 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.mainButton} onPress={handleNext}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
              >
                Next
              </Text>
            </TouchableOpacity>
            {errorMessage && target == 13 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
          </>
        )}
        {page === 4 && (
          <>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.cardNumber}
                placeholder="card Number"
                ref={inputcardNumber}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      cardNumber: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.issuedBy}
                placeholder="issued by"
                ref={inputissuedBy}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      issuedBy: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.releaseDate}
                placeholder="release date"
                ref={inputreleaseDate}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      releaseDate: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.expiryDate}
                placeholder="expire date"
                selectionColor={mainColor}
                ref={inputexpiryDate}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      expiryDate: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.nationalNumber}
                placeholder="national Number"
                ref={inputnationalNumber}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      nationalNumber: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.surname}
                placeholder="surname"
                ref={inputsurname}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      surname: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.name}
                placeholder="name"
                ref={inputname}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      name: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.birthDate}
                placeholder="birth date"
                selectionColor={mainColor}
                ref={inputbirthDate}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      birthDate: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.sex}
                placeholder="Gender"
                ref={inputsex}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      sex: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.rh}
                placeholder="RH"
                ref={inputrh}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      rh: text,
                    },
                  })
                }
              />
            </View>
            <View style={styles.inputContainer(false)}>
              <TextInput
                style={styles.input}
                value={formData.nationalCard.birthPlace}
                placeholder="birth place"
                ref={inputbirthPlace}
                selectionColor={mainColor}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    nationalCard: {
                      ...formData.nationalCard,
                      birthPlace: text,
                    },
                  })
                }
              />
            </View>

            <TouchableOpacity style={styles.mainButton} onPress={handleSignUp}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
              >
                SIGN UP
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
            {errorMessage && target == 13 ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
          </>
        )}

        {/* <TouchableHighlight style={styles.imageContainer}  underlayColor='none' onPress={pickImage}>
      <Image 
             source={image?{ uri: image } : img}
      style={styles.image} resizeMode='cover'/>

        </TouchableHighlight>
      <Text style={[styles.bigText , styles.textStart]}>
        Create Account
      </Text>
      <Text style={[styles.secondoryText , styles.textStart]}>
        Please fill the inputs below here
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        maxLength={20}
        selectionColor={'#333'}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        selectionColor={'#333'}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        selectionColor={'#333'}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        selectionColor={'#333'}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Text style={styles.error}>{errorMessage}</Text>
      <TouchableOpacity style={styles.mainButton} onPress={handleSignUp} >
        <Text style={{color:"white", fontWeight:"bold" , fontSize:12}}>
          SIGN UP
        </Text>
      </TouchableOpacity>
      
      <View style={styles.footerContainer}>
        <Text style={styles.secondoryText}>
          Already have an Account
        </Text>
        <TouchableHighlight  underlayColor='none' style={styles.goSignInButton} onPress={hundleGoSignIn}>
          <Text style={[styles.secondoryText , styles.buttonText]}>
            Sing In
          </Text>
        </TouchableHighlight>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
