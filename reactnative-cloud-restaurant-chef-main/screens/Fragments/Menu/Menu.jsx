// import {
//   View,
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Animated,
//   Dimensions,
//   ScrollView,
//   TouchableHighlight,
// } from "react-native";
// import * as SecureStore from "expo-secure-store";

// import profileImage from "../../../assets/profileImage.png";
// import burgerImage from "../../../assets/burgerImage.png";
// import pizza from "../../../assets/pizzaImage.png";
// import beefImage from "../../../assets/beefBurgerImage.png";
// import meatImage from "../../../assets/meatImage.png";
// import React, { useEffect, useRef, useState } from "react";
// import { Swipeable, TextInput } from "react-native-gesture-handler";
// import { mainColor } from "../../../constants/theme";
// import { MaterialIcons } from "@expo/vector-icons";
// import {
//   FontAwesome6,
//   FontAwesome5,
//   AntDesign,
//   MaterialCommunityIcons,
//   FontAwesome,
//   Feather,
// } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   useDeleteProductMutation,
//   useGetAllProductsQuery,
// } from "../../../redux/APIs/productServiceApi";
// import { useGetCategoriesQuery } from "../../../redux/APIs/categoryServiceApi";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const Menu = ({ navigation }) => {
//   const [filterOption, setfilterOption] = useState("/all");

//   const [searchWord, setsearchWord] = useState("");

//   const handleClickItem = (id) => {
//     navigation.navigate("AddMeal", { id });
//   };

//   const {
//     data: foodItems,
//     isError,
//     error,
//     isSuccess,
//   } = useGetAllProductsQuery({ filter: filterOption });

//   const RenderFoodItem = ({ data: item, handlePressItem }) => {
//     const [
//       deleteMeal,
//       {
//         isError: deleteIsError,
//         error: deleteError,
//         isLoading: deleteIsLoading,
//         isSuccess: deleteIsSuccess,
//       },
//     ] = useDeleteProductMutation();
//     const handleDeleteMeal = async (id) => {
//       await deleteMeal(id);
//     };

//     const rigthSwipe = (progress, dragX) => {
//       const scale = dragX.interpolate({
//         inputRange: [-100, 0],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//       });
//       return (
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity
//             onPress={() => handleDeleteMeal(item.id)}
//             style={styles.deleteBox}
//             activeOpacity={0.5}
//           >
//             <View>
//               <Animated.Text
//                 style={{ transform: [{ scale: scale }], color: "white" }}
//               >
//                 {/* <FontAwesome6 name="trash" size={24} color={mainColor} /> */}
//                 <MaterialCommunityIcons
//                   name="close-circle-outline"
//                   size={26}
//                   color={"white"}
//                 />
//               </Animated.Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handleDeleteMeal(item.id)}
//             style={styles.editBox}
//             activeOpacity={0.6}
//           >
//             <View>
//               <Animated.Text
//                 style={{ transform: [{ scale: scale }], color: "white" }}
//               >
//                 <MaterialCommunityIcons
//                   name="circle-edit-outline"
//                   size={26}
//                   color="white"
//                 />
//               </Animated.Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       );
//     };

//     return (
//       <Swipeable renderRightActions={rigthSwipe}>
//         <TouchableOpacity
//           onPress={handlePressItem}
//           activeOpacity={1}
//           style={styles.foodItem}
//         >
//           <Image
//             style={styles.itemImage}
//             source={{
//               uri:
//                 item.imageUrl ||
//                 "https://firebasestorage.googleapis.com/v0/b/projet-4eme.appspot.com/o/uploads%2fchefs%2fgabel-758eda1d-549b-4c6a-a839-d4229660990f-chef.webp?alt=media&token=a9a43b4a-b839-4901-aabf-ddb65bbc11c7",
//             }}
//           />
//           <View style={styles.itemContent}>
//             <View style={styles.itemFooterContainer}>
//               <Text style={styles.itemMainText} numberOfLines={2}>
//                 {item.name}
//               </Text>
//               {item.available ? (
//                 <FontAwesome name="circle" size={14} color="#42FF00" />
//               ) : (
//                 <FontAwesome name="circle" size={14} color="#FF0000" />
//               )}
//             </View>
//             <View style={styles.itemSecondTextContainer}>
//               <Text style={styles.itemSecondText}>
//                 {item.calories} Calories
//               </Text>
//               <FontAwesome5 name="fire-alt" size={16} color={mainColor} />
//             </View>
//             <View style={styles.itemFooterContainer}>
//               <Text style={styles.itemPrice}>{item.price} DZD</Text>

//               <View style={styles.itemSecondTextContainer}>
//                 <Text style={styles.itemSecondText}>{item.review || 0}</Text>
//                 <AntDesign name="star" size={18} color={mainColor} />
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Swipeable>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ width: "100%" }}>
//         <Text style={[styles.bigText, { color: mainColor }]}>
//           Hello Jhony Deep!
//         </Text>
//         <Text
//           style={{
//             fontSize: 20,
//             fontWeight: "600",
//             color: "#444",
//             marginBottom: 10,
//           }}
//         >
//           Your Menu
//         </Text>
//       </View>
//       <View style={styles.rowBetween}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           onPress={() => navigation.navigate("SearchPage")}
//           style={[styles.inputContainer, { flex: 10 }]}
//         >
//           <Feather name="search" size={24} color={mainColor} />

//           <View
//             style={[styles.input, { justifyContent: "center" }]}
//             placeholder="Search"
//             onPressIn={() => navigation.navigate("SearchPage")}
//             keyboardAppearance="dark"
//             returnKeyType="search"
//             selectionColor={"#5E3D1E"}
//             onChangeText={(text) => {
//               setsearchWord(text);
//             }}
//           >
//             <Text style={{ fontSize: 15, color: "#777" }}>Search</Text>
//           </View>
//         </TouchableOpacity>
//         <View style={styles.iconContainer}>
//           <Feather name="filter" size={24} color={mainColor} />
//         </View>
//       </View>

//       <View style={styles.rowBetween}>
//         <Text style={{ fontWeight: "bold", fontSize: 16, color: "#555" }}>
//           Menu Items
//         </Text>
//         <TouchableOpacity style={styles.mainButton}>
//           <Text style={{ fontWeight: "bold", color: mainColor, fontSize: 14 }}>
//             Add New
//           </Text>
//           <MaterialIcons name="add-box" size={28} color={mainColor} />
//         </TouchableOpacity>
//       </View>
//       <View style={{ width: "100%", flex: 1 }}>
//         <FlatList
//           data={foodItems}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => {
//             return (
//               <RenderFoodItem
//                 data={item}
//                 handlePressItem={() => handleClickItem(item.id)}
//               />
//             );
//           }}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{
//             rowGap: 10,
//             paddingBottom: 10,
//             width: "100%",
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Menu;

// const styles = StyleSheet.create({
//   deleteBox: {
//     backgroundColor: "#F12727aa",
//     borderRadius: 8,
//     marginLeft: 5,
//     height: "100%",
//     width: 60,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   editBox: {
//     backgroundColor: "#2778F1aa",
//     borderRadius: 8,
//     marginLeft: 5,
//     height: "100%",
//     width: 60,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     width: "100%",
//     backgroundColor: "white",
//     justifyContent: "flex-start",
//     paddingHorizontal: 15,
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   inputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     //   shadowOffset: {
//     //     width: 0,
//     //     height: 2,
//     //   },
//     //   shadowOpacity: 0.25,
//     //   shadowRadius: 3.84,
//     //   elevation: 3,
//     //   shadowColor: '#555', // Shadow color
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     //   shadowOffset: {
//     //     width: 0,
//     //     height: 2,
//     //   },
//     //   shadowOpacity: 0.25,
//     //   shadowRadius: 3.84,
//     //   elevation: 3,
//     //   shadowColor: '#555', // Shadow color
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     height: 50,
//   },
//   profileImageContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     //   shadowOffset: {
//     //     width: 0,
//     //     height: 2,
//     //   },
//     //   shadowOpacity: 0.25,
//     //   shadowRadius: 3.84,
//     //   elevation: 3,
//     //   shadowColor: '#555', // Shadow color
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 10,
//     padding: 4,
//     height: 50,
//   },
//   categoryContainer: (isactive) => ({
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 10,
//     gap: 10,
//     borderColor: isactive ? "#5E3D1E" : "#ddd",
//     borderWidth: 1,
//     //   shadowOffset: {
//     //     width: 0,
//     //     height: 2,
//     //   },
//     //   shadowOpacity: 0.25,
//     //   shadowRadius: 3.84,
//     //   elevation: 3,
//     shadowColor: "#555", // Shadow color
//     paddingHorizontal: 12,
//     height: 40,
//   }),
//   categoryName: {
//     fontSize: 12,
//   },
//   input: {
//     width: "100%",
//     flex: 1,
//     height: "100%",
//     paddingStart: 15,
//     fontSize: 16,
//   },
//   error: {
//     color: "red",
//     marginBottom: 5,
//     fontSize: 12,
//     marginTop: -7,
//     alignSelf: "flex-start",
//   },
//   image: {
//     width: 300,
//     height: 308,
//     marginTop: -40,
//   },
//   bigText: {
//     fontSize: 24,
//     color: "#444",
//     fontWeight: "bold",
//   },
//   footerContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//     marginTop: 117,
//   },
//   secondoryText: {
//     color: "#ddd",
//     fontSize: 12,
//     width: "100%",
//     textAlign: "right",
//   },
//   goSignInButton: {
//     marginLeft: 10,
//     alignSelf: "flex-end",
//   },
//   buttonText: {
//     color: "#aaa",
//     fontWeight: "bold",
//   },
//   mainButton: {
//     flexDirection: "row",
//     borderRadius: 5,
//     gap: 6,
//     shadowColor: "#5E3D1E", // Shadow color
//     color: "white",
//     alignItems: "center",
//   },
//   textStart: {
//     textAlign: "left",
//     width: 400,
//     paddingHorizontal: 35,
//     marginBottom: 10,
//   },
//   shadow: {
//     width: 10, // Width of the shadow
//     backgroundColor: "white", // Background color of the shadow (should match container background)
//     shadowColor: "#000", // Shadow color
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   contentContainer: {
//     height: 40,
//     paddingRight: 10, // Add extra padding to the right to accommodate the shadow
//   },
//   //start header styling
//   header: {
//     height: 50,
//     flexDirection: "row",
//     width: "100%",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   rightHeader: {
//     flexDirection: "row",
//     width: "auto",
//     gap: 10,
//   },
//   profileImage: {
//     objectFit: "cover",
//     backgroundColor: "#ff550085",
//     borderRadius: 8,
//     height: "100%",
//     width: 40,
//   },
//   //end header styling
//   //   start food item styling
//   foodItem: {
//     // shadowOffset: {
//     //     width: 0,
//     //     height: 2,
//     // },
//     // shadowOpacity: 0.25,
//     // shadowRadius: 3.84,
//     // elevation: 5,
//     // shadowColor:"#ddd",
//     borderWidth: 0.8,
//     borderColor: "#ddd",
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 8,
//     flexDirection: "row",
//     padding: 10,
//     paddingEnd: 15,
//     gap: 10,
//   },
//   itemImage: {
//     flexBasis: "30%",
//     objectFit: "cover",
//     backgroundColor: "#ff550085",
//     borderRadius: 8,
//     height: "100%",
//   },
//   itemContent: {
//     flex: 1,
//     gap: 4,
//   },
//   itemMainText: {
//     fontWeight: "bold",
//     flex: 1,
//     height: 40,
//   },
//   itemSecondTextContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   itemSecondText: {
//     color: mainColor,
//     fontWeight: "600",
//     fontSize: 12,
//   },
//   itemPrice: {
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   itemFooterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//     alignItems: "center",
//   },
//   //   end food item styling
// });
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { mainColor } from "../../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../redux/APIs/productServiceApi";
import { useGetMeQuery } from "../../../redux/APIs/userServiceApi";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Menu = ({ navigation }) => {
  const [filterOption, setFilterOption] = useState("/all");
  const [searchWord, setSearchWord] = useState("");
  const [localFoodItems, setLocalFoodItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isDeleting = useRef(false);

  const { data: profile } = useGetMeQuery();
  const {
    data: foodItems,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  } = useGetAllProductsQuery({ filter: profile?.data?._id, name: "" });
  const handleClickAdd = () => {
    navigation.navigate("AddMeal");
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(foodItems);
    }
  }, [foodItems]);

  useEffect(() => {
    if (foodItems) {
      setLocalFoodItems(foodItems);
    }
  }, [foodItems]);

  // const handleClickItem = useCallback(
  //   (id) => {
  //     navigation.navigate("MealPage", { id });
  //   },
  //   [navigation]
  // );
  const handleClickItem = (id) => {
    console.log(id);
    navigation.navigate("MealPage", { recipeId: id });
  };

  const RenderFoodItem = React.memo(({ item, handlePressItem }) => {
    const [deleteMeal] = useDeleteProductMutation();

    const handleDeleteMeal = async (id) => {
      if (isDeleting.current) return;
      isDeleting.current = true;
      setIsLoading(true);
      await deleteMeal(id);
      setLocalFoodItems((prevItems) =>
        prevItems.filter((food) => food.id !== id)
      );
      setIsLoading(false);
      isDeleting.current = false;
    };

    const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPressOut={() => handleDeleteMeal(item.id)}
            style={styles.deleteBox}
            activeOpacity={0.5}
          >
            <Animated.Text style={{ transform: [{ scale }], color: "white" }}>
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={26}
                color={"white"}
              />
            </Animated.Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteMeal(item.id)}
            style={styles.editBox}
            activeOpacity={0.6}
          >
            <Animated.Text style={{ transform: [{ scale }], color: "white" }}>
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={26}
                color="white"
              />
            </Animated.Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={rightSwipe}>
        <TouchableOpacity
          onPress={handlePressItem}
          activeOpacity={1}
          style={styles.foodItem}
        >
          <Image
            style={styles.itemImage}
            source={{
              uri:
                item.imageUrl ||
                "https://firebasestorage.googleapis.com/v0/b/projet-4eme.appspot.com/o/uploads%2fchefs%2fgabel-758eda1d-549b-4c6a-a839-d4229660990f-chef.webp?alt=media&token=a9a43b4a-b839-4901-aabf-ddb65bbc11c7",
            }}
          />
          <View style={styles.itemContent}>
            <View style={styles.itemFooterContainer}>
              <Text style={styles.itemMainText} numberOfLines={2}>
                {item.name}
              </Text>
              {item.availability ? (
                <FontAwesome name="circle" size={14} color="#42FF00" />
              ) : (
                <FontAwesome name="circle" size={14} color="#FF0000" />
              )}
            </View>
            <View style={styles.itemSecondTextContainer}>
              <Text style={styles.itemSecondText}>
                {item.calories} Calories
              </Text>
              <FontAwesome5 name="fire-alt" size={16} color={mainColor} />
            </View>
            <View style={styles.itemFooterContainer}>
              <Text style={styles.itemPrice}>{item.price} DZD</Text>
              <View style={styles.itemSecondTextContainer}>
                <Text style={styles.itemSecondText}>{item.review || 0}</Text>
                <AntDesign name="star" size={18} color={mainColor} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  });

  const onRefresh = () => {
    setIsRefreshing(true);
    refetch().finally(() => {
      setIsRefreshing(false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%" }}>
        <Text style={[styles.bigText, { color: mainColor }]}>
          Hello Jhony Deep!
        </Text>
        <Text style={styles.subHeaderText}>Your Menu</Text>
      </View>
      <View style={styles.rowBetween}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SearchPage")}
          style={[styles.inputContainer, { flex: 10 }]}
        >
          <Feather name="search" size={24} color={mainColor} />
          <View
            style={[styles.input, { justifyContent: "center" }]}
            placeholder="Search"
            onPressIn={() => navigation.navigate("SearchPage")}
            keyboardAppearance="dark"
            returnKeyType="search"
            selectionColor={"#5E3D1E"}
            onChangeText={(text) => {
              setSearchWord(text);
            }}
          >
            <Text style={{ fontSize: 15, color: "#777" }}>Search</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Feather name="filter" size={24} color={mainColor} />
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.menuItemsText}>Menu Items</Text>
        <TouchableOpacity
          onPress={() => handleClickAdd()}
          style={styles.mainButton}
        >
          <Text style={styles.addNewText}>Add New</Text>
          <MaterialIcons name="add-box" size={28} color={mainColor} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <FlatList
          data={localFoodItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RenderFoodItem
              item={item}
              handlePressItem={() => handleClickItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 10,
            paddingBottom: 10,
            width: "100%",
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[mainColor]}
            />
          }
        />
      </View>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={mainColor} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBox: {
    backgroundColor: "#F12727aa",
    borderRadius: 8,
    marginLeft: 5,
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  editBox: {
    backgroundColor: "#2778F1aa",
    borderRadius: 8,
    marginLeft: 5,
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
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
  categoryContainer: (isactive) => ({
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    gap: 10,
    borderColor: isactive ? "#5E3D1E" : "#ddd",
    borderWidth: 1,
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 3,
    shadowColor: "#555", // Shadow color
    paddingHorizontal: 12,
    height: 40,
  }),
  categoryName: {
    fontSize: 12,
  },
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
  image: {
    width: 300,
    height: 308,
    marginTop: -40,
  },
  bigText: {
    fontSize: 24,
    color: "#444",
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
    borderRadius: 5,
    gap: 6,
    shadowColor: "#5E3D1E", // Shadow color
    color: "white",
    alignItems: "center",
  },
  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
  },
  shadow: {
    width: 10, // Width of the shadow
    backgroundColor: "white", // Background color of the shadow (should match container background)
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    height: 40,
    paddingRight: 10, // Add extra padding to the right to accommodate the shadow
  },
  //start header styling
  header: {
    height: 50,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 8,
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
  //end header styling
  //   start food item styling
  foodItem: {
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // shadowColor:"#ddd",
    borderWidth: 0.8,
    borderColor: "#ddd",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    padding: 10,
    paddingEnd: 15,
    gap: 10,
  },
  itemImage: {
    flexBasis: "30%",
    objectFit: "cover",
    backgroundColor: "#ff550085",
    borderRadius: 8,
    height: "100%",
  },
  itemContent: {
    flex: 1,
    gap: 4,
  },
  itemMainText: {
    fontWeight: "bold",
    flex: 1,
    height: 40,
  },
  itemSecondTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  itemSecondText: {
    color: mainColor,
    fontWeight: "600",
    fontSize: 12,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemFooterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    alignItems: "top",
  },
  //   end food item styling
});
