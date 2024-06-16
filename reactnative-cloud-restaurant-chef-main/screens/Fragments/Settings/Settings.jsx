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
  ScrollView,
  TouchableHighlight,
  Platform,
} from "react-native";
import profileImage from "../../../assets/profileImage.png";
import burgerImage from "../../../assets/burgerImage.png";
import pizza from "../../../assets/pizzaImage.png";
import * as ImagePicker from "expo-image-picker";
import beefImage from "../../../assets/beefBurgerImage.png";
import meatImage from "../../../assets/meatImage.png";
import React, { useEffect, useRef, useState } from "react";
import { Swipeable, TextInput } from "react-native-gesture-handler";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import {
  FontAwesome6,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { mainColor } from "../../../constants/theme";
import img from "../../../assets/meatImage.png";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { Switch } from "react-native-paper";
import { useGetMeQuery } from "../../../redux/APIs/userServiceApi";

const categories = [
  { id: "1", name: "All", icon: "filter" },
  { id: "2", name: "Category 2dsaf", icon: "search" },
  { id: "3", name: "Category 3", icon: "settings" },
  { id: "4", name: "Category 3", icon: "key" },
  { id: "5", name: "Category 1", icon: "filter" },
  { id: "6", name: "Category 2", icon: "search" },
  // Add more categories as needed
];
const foodItems = [
  {
    id: "1",
    name: "classic double cheeseburger with beef",
    calories: "360",
    price: "250.00",
    image: beefImage,
    review: 4.5,
    available: true,
  },
  {
    id: "2",
    name: "Pizza with ham and vegetables",
    calories: "450",
    price: "1000.00",
    image: pizza,
    review: 4.8,
    available: true,
  },
  {
    id: "3",
    name: "Classic cheeseburger with beef",
    calories: "500",
    price: "500.00",
    image: burgerImage,
    available: false,
  },
  {
    id: "4",
    name: "Cheeseburger with fries",
    calories: "230",
    price: "450.00",
    image: meatImage,
    review: 3.9,
    available: true,
  },
  {
    id: "5",
    name: "classic double cheeseburger with beef",
    calories: "360",
    price: "250.00",
    image: burgerImage,
    review: 4.5,
    available: true,
  },
  {
    id: "6",
    name: "Pizza with ham and vegetables",
    calories: "450",
    price: "1000.00",
    image: meatImage,
    available: true,
  },
  {
    id: "7",
    name: "Classic cheeseburger with beef",
    calories: "500",
    price: "500.00",
    image: pizza,
    review: 4.5,
    available: true,
  },
  {
    id: "8",
    name: "Cheeseburger with fries",
    calories: "230",
    price: "450.00",
    image: null,
    review: 4.5,
    available: false,
  },
  // Add more categories as needed
];
const SCREEN_WIDTH = Dimensions.get("window").width;

const Settings = ({ route, navigation }) => {
  //input
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const { data: profile } = useGetMeQuery();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    if (!mealName) {
      errors.mealName = "Meal name is required";
    }
    if (!mealDescription) {
      errors.mealDescription = "Meal description is required";
    }
    if (!mealCalories) {
      errors.mealCalories = "Meal calories is required";
    }
    if (!mealPrice) {
      errors.mealPrice = "Meal price is required";
    }
    if (!mealIngredients) {
      errors.mealIngredients = "Meal ingredients are required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  //input

  // const RenderPicker = () => {
  //     if (Platform.OS === 'ios') {
  //       return (
  //         <View style={styles.pickerContainer}>
  //           <PickerIOS
  //             selectedValue={mealCategory}
  //             onValueChange={setMealCategory}
  //             style={styles.picker}
  //           >
  //             <PickerIOS.Item label="Select meal category" value="" />
  //             {/* Add options dynamically based on your category table */}
  //             <PickerIOS.Item label="Category 1" value="category1" />
  //             <PickerIOS.Item label="Category 2" value="category2" />
  //           </PickerIOS>
  //         </View>
  //       );
  //     } else {
  //       return (
  //         <Picker
  //           selectedValue={mealCategory}
  //           onValueChange={setMealCategory}
  //           style={styles.picker}
  //         >
  //           <Picker.Item label="Select meal category" value="" />
  //           {/* Add options dynamically based on your category table */}
  //           <Picker.Item label="Category 1" value="category1" />
  //           <Picker.Item label="Category 2" value="category2" />
  //         </Picker>
  //       );
  //     }
  //   };

  const scrollViewRef = useRef();

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const [images, setimages] = useState([]);
  const [firstImage, setfirstImage] = useState();
  const [secondImage, setsecondImage] = useState();
  const [thirdImage, setthirdImage] = useState();
  const [fourthImage, setfourthImage] = useState();
  const [fifthImage, setfifthImage] = useState();
  const [imgIndex, setimgIndex] = useState(0);

  const handleRemoveImg = (index) => {
    let theimage = images.filter((item, ind) => {
      return ind != index;
    });
    setimages(theimage);
    setimgIndex(imgIndex - 1);
  };
  const pickImage = async (index) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      let theimages = [];
      theimages = images;
      theimages.push(result?.assets[0]?.uri);
      setimages(theimages);
      setimgIndex(imgIndex + 1);
      scrollToBottom();
    }
  };

  //..

  const [nameFocus, setnameFocus] = useState(false);
  const [descriptionFocus, setdescriptionFocus] = useState(false);
  const [availabilityFocus, setavailabilityFocus] = useState(false);
  const [caloriesFocus, setCaloriesFocus] = useState(false);
  const [priceFocus, setpriceFocus] = useState(false);
  const [ingredientsFocus, setingredientsFocus] = useState(false);
  const [categoryFocus, setCategoryFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [target, settarget] = useState(0);

  const nameInput = useRef();
  const descriptionInput = useRef();
  const availabilityInput = useRef();
  const caloriesInput = useRef();
  const priceInput = useRef();
  const ingredientInput = useRef();
  const categoryInput = useRef();

  const [formData, setFormData] = useState({
    mealName: "",
    mealDescription: "",
    mealAvailability: "Available",
    mealCalories: "",
    mealPrice: "",
    mealIngredients: "",
    mealCategory: "",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          width: "100%",
        }}
        style={styles.scrollviewvertical}
      >
        {/* <View style={{ width: "100%" }}></View> */}
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            style={styles.itemImage}
            source={{
              uri:
                profile?.data?.nationalCard?.photo ||
                "https://firebasestorage.googleapis.com/v0/b/projet-4eme.appspot.com/o/uploads%2fchefs%2fgabel-758eda1d-549b-4c6a-a839-d4229660990f-chef.webp?alt=media&token=a9a43b4a-b839-4901-aabf-ddb65bbc11c7",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.bigText}>{profile?.data?.name}</Text>
        <Text style={styles.secondoryText}>{profile?.data?.email}</Text>

        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={30}
                color={mainColor}
              />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                Seller Account
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={mainColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="clipboard-text-outline"
                size={30}
                color={mainColor}
              />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                General Statement
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={mainColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={30}
                color={mainColor}
              />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                Notifications
              </Text>
            </View>

            <Switch
              value={isSwitchOn}
              color={mainColor}
              onValueChange={onToggleSwitch}
            ></Switch>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={30}
                color={mainColor}
              />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                Seller Help Center
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={mainColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={30}
                color={mainColor}
              />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                About
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={mainColor}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.settingItemContainer}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <MaterialIcons name="logout" size={30} color={mainColor} />
              <Text style={{ fontSize: 15, fontWeight: 400, color: "#222" }}>
                Log Out
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color={mainColor}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    height: 95,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.8,
    borderColor: "#ddd",
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
    height: 100,
    width: 100,
    backgroundColor: "#ff550085",
    borderRadius: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
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
    justifyContent: "center",
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    shadowColor: "#555", // Shadow color
    borderRadius: 10,
    padding: 10,
    height: 120,
    width: 120,
    backgroundColor: "white",
    margin: 5,
    paddingHorizontal: 15,
  },
  label: {
    color: "#555",
    position: "absolute",
    top: -11,
    fontSize: 13,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  scrollviewvertical: {
    width: "100%",
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

  error: {
    color: "red",
    marginBottom: 5,
    fontSize: 12,
    marginTop: -7,
    alignSelf: "flex-start",
  },
  picker: {
    padding: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  imageContainer: {
    width: 130,
    alignItems: "center",
    marginEnd: 10,
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  scrollview: {
    alignItems: "center",
    width: "100%",
    height: 110,
    marginBottom: 15,
  },
  removeimg: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 5,
    backgroundColor: "#F12727dd",
    padding: 4,
    paddingTop: 3,
    borderRadius: 4,
    marginEnd: 15,
  },
  inputContainer: (firstnameFocus) => ({
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: firstnameFocus ? mainColor : "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 3,
    height: 55,
  }),
  settingItemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    shadowColor: "#555", // Shadow color
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    height: 55,
  },
  input: {
    width: "100%",
    flex: 1,
    height: "100%",
    paddingStart: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 5,
    fontSize: 12,
    marginTop: -7,
    alignSelf: "flex-start",
  },

  bigText: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    marginTop: 10,
    width: "100%",
    marginVertical: 5,
    fontWeight: "500",
  },
  biglabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#444",
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  secondoryText: {
    color: "#777",
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 15,
  },

  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
});
