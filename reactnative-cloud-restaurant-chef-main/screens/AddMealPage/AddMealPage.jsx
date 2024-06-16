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
import profileImage from "../../assets/profileImage.png";
import burgerImage from "../../assets/burgerImage.png";
import pizza from "../../assets/pizzaImage.png";
import * as ImagePicker from "expo-image-picker";
import beefImage from "../../assets/beefBurgerImage.png";
import meatImage from "../../assets/meatImage.png";
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
import * as SecureStore from "expo-secure-store";

import { LinearGradient } from "expo-linear-gradient";
import { mainColor } from "../../constants/theme";
import img from "../../assets/meatImage.png";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { useCreateProductMutation } from "../../redux/APIs/productServiceApi";
import { useGetCategoriesQuery } from "../../redux/APIs/categoryServiceApi";
import { useGetRestaurantofChefQuery } from "../../redux/APIs/userServiceApi";

const SCREEN_WIDTH = Dimensions.get("window").width;

const AddMealPage = ({ navigation }) => {
  //input

  const { data: profile, isSuccess: profilesuccse } =
    useGetRestaurantofChefQuery();

  const {
    data: categories,
    error: categoryerror,
    isSuccess: catsuc,
    isError: iscat,
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (iscat) {
      console.log(categoryerror);
    }
  }, [categoryerror]);

  const [addmeal, { data, isError, error, isSuccess }] =
    useCreateProductMutation();
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
  const [mintimeFocus, setmintimeFocus] = useState(false);
  const [maxtimeFocus, setmaxtimeFocus] = useState(false);
  const [minquantityFocus, setminquantityFocus] = useState(false);
  const [maxquantityFocus, setmaxquantityFocus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [target, settarget] = useState(0);

  const nameInput = useRef();
  const descriptionInput = useRef();
  const availabilityInput = useRef();
  const caloriesInput = useRef();
  const priceInput = useRef();
  const ingredientInput = useRef();
  const categoryInput = useRef();
  const minquantityInput = useRef();
  const maxquantityInput = useRef();
  const minpriceInput = useRef();
  const maxpriceInput = useRef();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    promoPrice: "",
    minTime: "",
    maxTime: "",
    calories: "",
    minQuantity: "",
    maxQuantity: "",
    availability: "",
    idCategory: "",
    wilaya: "",
  });
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
    if (isloading) {
      if (thetoken?.length > 2) {
        console.log("the token" + thetoken);
        // console.log(gettoken())
      } else if (thetoken?.length < 2) {
        console.log("the token " + thetoken);
      } else {
        console.log("9iiiiiw");
      }
    }
  }, [thetoken, isloading]);
  const handleAddMeal = async () => {
    if (formData.name.length < 3 || formData.name.length > 20) {
      setErrorMessage("Meal Name must be between 3 and 20 characters");
      settarget(1);
    } else if (formData.description.length < 3) {
      setErrorMessage("Meal Description must be at least 3 characters");
      settarget(2);
    } else if (images.length < 1) {
      setErrorMessage("you must add at least one image");
      settarget(3);
    } else if (formData.availability.length < 1) {
      setErrorMessage("You must specify the availabitity");
      settarget(5);
    } else if (formData.calories.length < 1 || formData.calories.length > 4) {
      setErrorMessage("Meal calories must be between 1 and 4 numbers");
      settarget(5);
    } else if (formData.idCategory.length < 1) {
      setErrorMessage("You must select a category");
      settarget(8);
    } else {
      // Handle sign up logic here
      setErrorMessage("");

      // Process sign-up logic here
      const meal = new FormData();
      // meal.append("name", formData.name);

      // meal.append("availability", "true");
      // meal.append("calories", formData.calories);
      // meal.append("price", formData.price);
      // meal.append("promoPrice", formData.promoPrice);
      // meal.append("idCategory", formData.idCategory);
      // meal.append("wilaya", "sba");
      // meal.append("minTime", formData.minTime);
      // meal.append("maxTime", formData.maxTime);
      // meal.append("minQuantity", formData.minQuantity);
      // meal.append("maxQuantity", formData.maxQuantity);
      const newmeal = {
        name: formData.name,
        description: formData.description,
        minTime: formData.minTime,
        maxTime: formData.maxTime,
        calories: formData.calories,
        minQuantity: formData.minQuantity,
        maxQuantity: formData.maxQuantity,
        price: formData.price,
        promoPrice: formData.promoPrice,
        availability: "true",
        idCategory: formData.idCategory,
        wilaya: "Sidi Bel Abbès",
      };
      meal.append("product", JSON.stringify(newmeal));
      meal.append("imageFile", {
        uri: images[0],
        name: "mealPhoto",
        type: `image/${images[0].split(".").pop()}`,
      });
      console.log(meal);
      await addmeal(meal);
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={mainColor} />
          </TouchableHighlight>
        </View>
        <View>
          <Text style={{ fontSize: 17, fontWeight: 500 }}>Add Meal</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleAddMeal}
          >
            <Text style={{ color: "white" }}>save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollviewvertical}>
        {/* <View style={{ width: "100%" }}></View> */}

        <Text style={styles.bigText}>Fill The Meal Information</Text>

        {/* <RenderPicker/> */}
        <View style={[styles.inputContainer(nameFocus), { marginTop: 10 }]}>
          <Text style={styles.label}>Meal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter meal name"
            selectionColor={mainColor}
            returnKeyType={"next"}
            onFocus={() => setnameFocus(true)}
            onBlur={() => setnameFocus(false)}
            value={formData.mealName}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            onSubmitEditing={() => descriptionInput.current.focus()}
          />
        </View>
        {errorMessage && target == 1 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <View style={[styles.inputContainer(descriptionFocus)]}>
          <Text style={styles.label}>Meal Description</Text>
          <TextInput
            style={[styles.input]}
            value={formData.description}
            multiline
            numberOfLines={2}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            placeholder="Enter meal description"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={descriptionInput}
            onFocus={() => setdescriptionFocus(true)}
            onBlur={() => setdescriptionFocus(false)}
            onSubmitEditing={() => availabilityInput.current.focus()}
          />
        </View>
        {errorMessage && target == 2 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <View style={styles.inputContainer(priceFocus)}>
          <Text style={styles.label}>Meal Price</Text>

          <TextInput
            style={styles.input}
            value={formData.mealPrice}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            placeholder="Enter meal price"
            keyboardType="decimal-pad"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={priceInput}
            onFocus={() => setpriceFocus(true)}
            onBlur={() => setpriceFocus(false)}
            onSubmitEditing={() => ingredientInput.current.focus()}
          />
        </View>
        {errorMessage && target == 6 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <View style={[styles.inputContainer(ingredientsFocus)]}>
          <Text style={styles.label}>Meal Promo Price</Text>

          <TextInput
            style={[styles.input]}
            value={formData.mealIngredients}
            onChangeText={(text) =>
              setFormData({ ...formData, promoPrice: text })
            }
            placeholder="Enter meal promo price"
            selectionColor={mainColor}
            keyboardType="decimal-pad"
            multiline
            numberOfLines={2}
            returnKeyType={"next"}
            ref={ingredientInput}
            onFocus={() => setingredientsFocus(true)}
            onBlur={() => setingredientsFocus(false)}
            onSubmitEditing={() => categoryInput.current.focus()}
          />
        </View>
        {errorMessage && target == 7 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.biglabel}>Add Image</Text>

        <View style={styles.scrollview}>
          <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollview}
            horizontal={true}
          >
            {images.map((item, index) => {
              return (
                <View key={index} style={{ position: "relative" }}>
                  <TouchableHighlight
                    style={styles.imageContainer}
                    underlayColor="none"
                    onPress={() => pickImage(index)}
                  >
                    <Image
                      source={item ? { uri: item } : img}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.removeimg}
                    onPress={() => handleRemoveImg(index)}
                  >
                    <AntDesign name="close" size={15} color="white" />
                  </TouchableHighlight>
                </View>
              );
            })}
            {imgIndex < 1 ? (
              <View style={{ position: "relative" }}>
                <TouchableHighlight
                  style={styles.imageContainer}
                  underlayColor="none"
                  onPress={() => pickImage(0)}
                >
                  <Image
                    source={images[0] ? { uri: images[0] } : img}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableHighlight>
              </View>
            ) : null}
          </ScrollView>
        </View>
        {errorMessage && target == 3 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.biglabel}>General Info</Text>

        <View style={styles.inputContainer(availabilityFocus)}>
          <Text style={styles.label}>Meal Availability</Text>

          <Picker
            selectedValue={formData.mealAvailability}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, availability: itemValue })
            }
            ref={availabilityInput}
            onFocus={() => setavailabilityFocus(true)}
            onBlur={() => setavailabilityFocus(false)}
            onSubmitEditing={() => caloriesInput.current.focus()}
            style={styles.input}
          >
            <Picker.Item label="Available" value="available" />
            <Picker.Item label="Not Available" value="notAvailable" />
          </Picker>
        </View>
        {errorMessage && target == 4 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        <View style={styles.inputContainer(caloriesFocus)}>
          <Text style={styles.label}>Meal Calories</Text>

          <TextInput
            style={styles.input}
            value={formData.mealCalories}
            onChangeText={(text) =>
              setFormData({ ...formData, calories: text })
            }
            placeholder="Enter meal calories"
            keyboardType="numeric"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={caloriesInput}
            onFocus={() => setCaloriesFocus(true)}
            onBlur={() => setCaloriesFocus(false)}
            onSubmitEditing={() => priceInput.current.focus()}
          />
        </View>
        {errorMessage && target == 5 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}

        {/* Add Image input here */}

        <View style={styles.inputContainer(categoryFocus)}>
          <Text style={styles.label}>Meal Category</Text>

          <Picker
            selectedValue={formData.idCategory}
            onValueChange={(itemValue) =>
              setFormData({ ...formData, idCategory: itemValue })
            }
            ref={categoryInput}
            onFocus={() => setCategoryFocus(true)}
            onBlur={() => setCategoryFocus(false)}
            style={styles.input}
          >
            <Picker.Item label="Select meal category" value="" />

            {categories?.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        </View>
        {errorMessage && target == 8 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        <View style={styles.inputContainer(mintimeFocus)}>
          <Text style={styles.label}>Min Time</Text>

          <TextInput
            style={styles.input}
            value={formData.mealCalories}
            onChangeText={(text) => setFormData({ ...formData, minTime: text })}
            placeholder="Enter min time"
            keyboardType="default"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={minpriceInput}
            onFocus={() => setmintimeFocus(true)}
            onBlur={() => setmintimeFocus(false)}
            onSubmitEditing={() => priceInput.current.focus()}
          />
        </View>

        <View style={styles.inputContainer(maxtimeFocus)}>
          <Text style={styles.label}>Max Time</Text>

          <TextInput
            style={styles.input}
            value={formData.mealCalories}
            onChangeText={(text) => setFormData({ ...formData, maxTime: text })}
            placeholder="Enter max time"
            keyboardType="default"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={maxpriceInput}
            onFocus={() => setmaxtimeFocus(true)}
            onBlur={() => setmaxtimeFocus(false)}
            onSubmitEditing={() => priceInput.current.focus()}
          />
        </View>

        <View style={styles.inputContainer(minquantityFocus)}>
          <Text style={styles.label}>Min Quantity</Text>

          <TextInput
            style={styles.input}
            value={formData.mealCalories}
            onChangeText={(text) =>
              setFormData({ ...formData, minQuantity: text })
            }
            placeholder="Enter min quantity"
            keyboardType="numeric"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={minquantityInput}
            onFocus={() => setminquantityFocus(true)}
            onBlur={() => setminquantityFocus(false)}
            onSubmitEditing={() => priceInput.current.focus()}
          />
        </View>

        <View style={styles.inputContainer(maxquantityFocus)}>
          <Text style={styles.label}>Max Quantity</Text>

          <TextInput
            style={styles.input}
            value={formData.mealCalories}
            onChangeText={(text) =>
              setFormData({ ...formData, maxQuantity: text })
            }
            placeholder="Enter max quantity"
            keyboardType="numeric"
            selectionColor={mainColor}
            returnKeyType={"next"}
            ref={maxquantityInput}
            onFocus={() => setmaxquantityFocus(true)}
            onBlur={() => setmaxquantityFocus(false)}
            onSubmitEditing={() => priceInput.current.focus()}
          />
        </View>
        {errorMessage && target == 9 ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddMealPage;

const styles = StyleSheet.create({
  header: {
    paddingTop: 37,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    shadowColor: "#555", // Shadow color

    borderRadius: 10,
    padding: 10,
    backgroundColor: mainColor,
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
    paddingHorizontal: 15,
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
    minWidth: "100%",
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
    fontSize: 18,
    marginTop: 10,
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
    fontSize: 12,
  },

  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
});
