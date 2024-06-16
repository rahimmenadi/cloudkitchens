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
// import profileImage from "../../../assets/profileImage.png";
// import burgerImage from "../../../assets/burgerImage.png";
// import pizza from "../../../assets/pizzaImage.png";
// import beefImage from "../../../assets/beefBurgerImage.png";
// import meatImage from "../../../assets/meatImage.png";
// import React, { useCallback, useEffect, useRef, useState } from "react";
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
// import { useGetAllProductsQuery } from "../../../redux/APIs/productServiceApi";

// const categories = [
//   { id: "1", name: "All Orders", amount: 540, color: "#FFE8CE" },
//   { id: "2", name: "Pending", amount: 35, color: "#E8EFFF" },
//   { id: "3", name: "Shipeed", amount: 480, color: "#FFEDED" },
//   { id: "4", name: "Canceled", amount: 18, color: "#E4FEF1" },
//   // Add more categories as needed
// ];

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const Orders = ({ navigation }) => {
//   const [activeCategory, setactiveCategory] = useState("1");
//   const [searchWord, setsearchWord] = useState("");
//   const [localFoodItems, setLocalFoodItems] = useState([]);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const isDeleting = useRef(false);

//   const {
//     data: foodItems,
//     isError,
//     error,
//     isSuccess,
//     refetch,
//     isFetching,
//   } = useGetAllProductsQuery({ filter: "/all" });

//   useEffect(() => {
//     if (foodItems) {
//       setLocalFoodItems(foodItems);
//     }
//   }, [foodItems]);

//   const handleLogin = (id) => {
//     console.log(id);
//   };
//   const handleClickItem = useCallback(
//     (id) => {
//       navigation.navigate("OrderPage", { id });
//     },
//     [navigation]
//   );
//   const renderCategoryItem = ({ item }) => (
//     <View style={{ alignItems: "center", gap: 5 }}>
//       <TouchableOpacity
//         onPress={() => setactiveCategory(item.id)}
//         style={styles.categoryContainer(item.color)}
//         activeOpacity={0.9}
//       >
//         <Text style={{ fontSize: 13, fontWeight: "500", color: "#777" }}>
//           {item.name}
//         </Text>
//         <Text style={styles.categoryName}>{item.amount}</Text>
//       </TouchableOpacity>

//       {item.id == activeCategory ? (
//         <View style={styles.line(item.color)}></View>
//       ) : (
//         ""
//       )}
//     </View>
//   );

//   const RenderOrderItem = ({ data: item, handleDelete, handlePressItem }) => {
//     const rigthSwipe = (progress, dragX) => {
//       const scale = dragX.interpolate({
//         inputRange: [-100, 0],
//         outputRange: [1, 0],
//         extrapolate: "clamp",
//       });
//       return (
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity
//             onPress={handleDelete}
//             style={styles.deleteBox}
//             activeOpacity={0.5}
//           >
//             <View
//               style={{ flexDirection: "column", gap: 2, alignItems: "center" }}
//             >
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
//               <Animated.Text
//                 style={{
//                   transform: [{ scale: scale }],
//                   color: "white",
//                 }}
//               >
//                 <Text>reject</Text>
//               </Animated.Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleDelete}
//             style={styles.editBox}
//             activeOpacity={0.6}
//           >
//             <View
//               style={{ flexDirection: "column", gap: 2, alignItems: "center" }}
//             >
//               <Animated.Text
//                 style={{
//                   transform: [{ scale: scale }],
//                   color: "white",
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="checkbox-marked-circle-outline"
//                   size={24}
//                   color="white"
//                 />
//               </Animated.Text>
//               <Animated.Text
//                 style={{
//                   transform: [{ scale: scale }],
//                   color: "white",
//                 }}
//               >
//                 <Text>accept</Text>
//               </Animated.Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       );
//     };

//     const onRefresh = () => {
//       setIsRefreshing(true);
//       refetch().finally(() => {
//         setIsRefreshing(false);
//       });
//     };
//     return (
//       <Swipeable renderRightActions={rigthSwipe}>
//         <TouchableOpacity
//           onPress={handlePressItem}
//           activeOpacity={1}
//           style={styles.foodItem}
//         >
//           <Image style={styles.itemImage} source={item.image || profileImage} />
//           <View style={styles.itemContent}>
//             <View>
//               <View style={styles.orderItemTopper}>
//                 <View style={styles.itemSecondTextContainer}>
//                   <Text style={styles.itemSecondText}>order #24</Text>
//                 </View>
//                 <Text style={styles.itemCount}>9 ITEMS</Text>
//               </View>
//               <Text style={styles.itemMainText} numberOfLines={1}>
//                 {item.name}
//               </Text>
//             </View>
//             <View style={styles.itemSecondTextContainer}>
//               <Text style={(styles.itemSecondText, styles.itemTextHeignlight)}>
//                 Pending
//               </Text>
//             </View>
//             <View style={styles.itemFooterContainer}>
//               <View style={styles.itemSecondTextContainer}>
//                 <Text style={styles.itemSecondText}>2 hour ago</Text>
//               </View>
//               <Text style={styles.itemPrice}>{item.price} DZD</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Swipeable>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ width: "100%", marginBottom: 10, paddingHorizontal: 15 }}>
//         <Text style={[styles.bigText, { color: "#444" }]}>Orders</Text>
//       </View>
//       <View style={{ position: "relative", height: 90 }}>
//         <FlatList
//           data={categories}
//           keyExtractor={(item) => item.id}
//           renderItem={renderCategoryItem}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ columnGap: 10, paddingHorizontal: 15 }}
//         />
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

//       <View style={{ width: "100%", flex: 1, paddingHorizontal: 15 }}>
//         <FlatList
//           data={foodItems}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => {
//             return (
//               <RenderOrderItem
//                 data={item}
//                 handleDelete={() => handleLogin(item.id)}
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

// export default Orders;

import React, { useCallback, useEffect, useRef, useState } from "react";
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
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Swipeable, TextInput } from "react-native-gesture-handler";

import profileImage from "../../../assets/profileImage.png";
import { mainColor } from "../../../constants/theme";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import {
  useGetOrdersByChefQuery,
  useRejectOrderByChefMutation,
  useValidateOrderByChefMutation,
} from "../../../redux/APIs/paymentServiceApi";
import {
  useGetRestaurantByIdChefQuery,
  useGetRestaurantofChefQuery,
} from "../../../redux/APIs/userServiceApi";
const categories = [
  { id: "1", name: "All Orders", amount: 540, color: "#FFE8CE" },
  { id: "2", name: "Pending", amount: 35, color: "#E8EFFF" },
  { id: "3", name: "Shipped", amount: 480, color: "#FFEDED" },
  { id: "4", name: "Canceled", amount: 18, color: "#E4FEF1" },
];

const SCREEN_WIDTH = Dimensions.get("window").width;

const Orders = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("1");
  const [searchWord, setSearchWord] = useState("");
  const [localFoodItems, setLocalFoodItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isDeleting = useRef(false);

  // const {
  //   data: foodItems,
  //   isError,
  //   error,
  //   isSuccess,
  //   refetch,
  //   isFetching,
  // } = useGetOrdersByChefQuery({
  //   filter: activeCategory === "1" ? "/all" : `/category/${activeCategory}`,
  // });
  const {
    data: foodItems,
    isError,
    error,
    isSuccess,
    refetch,
    isFetching,
  } = useGetOrdersByChefQuery();

  const [rejectOrder] = useRejectOrderByChefMutation();
  const [acceptOrder] = useValidateOrderByChefMutation();

  useEffect(() => {
    if (foodItems) {
      setLocalFoodItems(foodItems);
    }
  }, [foodItems]);

  const handleDelete = async (id) => {
    isDeleting.current = true;
    await rejectOrder(id);
    isDeleting.current = false;
    refetch();
  };

  const handleAccept = async (id) => {
    await acceptOrder(id);
    refetch();
  };

  const handleClickItem = useCallback(
    (id) => {
      navigation.navigate("OrderPage", { id });
    },
    [navigation]
  );

  const renderCategoryItem = ({ item }) => (
    <View style={{ alignItems: "center", gap: 5 }}>
      <TouchableOpacity
        onPress={() => setActiveCategory(10)}
        style={styles.categoryContainer(item.color)}
        activeOpacity={0.9}
      >
        <Text style={{ fontSize: 13, fontWeight: "500", color: "#777" }}>
          {item.name}
        </Text>
        <Text style={styles.categoryName}>{item.amount}</Text>
      </TouchableOpacity>
      {item.id === activeCategory && <View style={styles.line(item.color)} />}
    </View>
  );

  const RenderOrderItem = React.memo(
    ({ data: item, handleDelete, handlePressItem, handleAccept }) => {
      const rightSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [-100, 0],
          outputRange: [1, 0],
          extrapolate: "clamp",
        });

        return (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
              style={styles.deleteBox}
              activeOpacity={0.5}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={{ transform: [{ scale }], color: "white" }}
                >
                  <MaterialCommunityIcons
                    name="close-circle-outline"
                    size={26}
                    color={"white"}
                  />
                </Animated.Text>
                <Animated.Text
                  style={{ transform: [{ scale }], color: "white" }}
                >
                  <Text>reject</Text>
                </Animated.Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAccept(item.id)}
              style={styles.editBox}
              activeOpacity={0.6}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Animated.Text
                  style={{ transform: [{ scale }], color: "white" }}
                >
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={24}
                    color="white"
                  />
                </Animated.Text>
                <Animated.Text
                  style={{ transform: [{ scale }], color: "white" }}
                >
                  <Text>accept</Text>
                </Animated.Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      };

      const { data: rest } = useGetRestaurantByIdChefQuery(item.chefId);
      console.log(rest);
      return (
        <Swipeable renderRightActions={rightSwipe}>
          <TouchableOpacity
            onPress={() => handlePressItem(item.id)}
            activeOpacity={1}
            style={styles.foodItem}
          >
            <Image
              style={styles.itemImage}
              source={{
                uri:
                  item.products[0]?.imageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/projet-4eme.appspot.com/o/uploads%2fchefs%2fgabel-758eda1d-549b-4c6a-a839-d4229660990f-chef.webp?alt=media&token=a9a43b4a-b839-4901-aabf-ddb65bbc11c7",
              }}
            />
            <View style={styles.itemContent}>
              <View>
                <View style={styles.orderItemTopper}>
                  <View style={styles.itemSecondTextContainer}>
                    <Text style={styles.itemSecondText}>
                      order #{item?.id?.slice(0, 5)}
                    </Text>
                  </View>
                  <Text style={styles.itemCount}>
                    {item?.products?.length} Items
                  </Text>
                </View>
                <Text style={styles.itemMainText} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.itemSecondTextContainer}>
                <Text
                  style={[styles.itemSecondText, styles.itemTextHeignlight]}
                >
                  {item?.statusOfOrder}
                </Text>
              </View>
              <View style={styles.itemFooterContainer}>
                <View style={styles.itemSecondTextContainer}>
                  <Text style={styles.itemSecondText}>
                    {item.createdAt?.slice(0, 10)}
                  </Text>
                </View>
                <Text style={styles.itemPrice}>{item.totalPrice} DZD</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeable>
      );
    }
  );

  const handleSearch = useCallback(
    (id) => {
      navigation.navigate("OrderPage", { id });
    },
    [navigation]
  );

  if (isFetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", marginBottom: 10, paddingHorizontal: 15 }}>
        <Text style={[styles.bigText, { color: "#444" }]}>Orders</Text>
      </View>
      <View style={{ position: "relative", height: 90 }}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 10, paddingHorizontal: 15 }}
        />
      </View>
      <View style={{ width: "100%", flex: 1, paddingHorizontal: 15 }}>
        <FlatList
          data={localFoodItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RenderOrderItem
              data={item}
              handleDelete={handleDelete}
              handlePressItem={handleClickItem}
              handleAccept={handleAccept}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                refetch().finally(() => {
                  setIsRefreshing(false);
                });
              }}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: 10,
            paddingBottom: 10,
            width: "100%",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  line: (color) => ({
    width: "70%",
    height: 3.5,
    backgroundColor: color,
    borderRadius: 50,
  }),
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
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
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
  categoryContainer: (color) => ({
    backgroundColor: color,
    alignItems: "center",
    borderRadius: 10,
    gap: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    shadowColor: "#555", // Shadow color
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
  }),
  categoryName: {
    fontSize: 12,
    color: "black",
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
    marginBottom: 4,
  },
  orderItemTopper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCount: {
    fontSize: 11,
    color: "#999",
    fontWeight: "600",
  },
  itemSecondTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  itemSecondText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 12,
  },
  itemTextHeignlight: {
    backgroundColor: "#555555",
    padding: 2,
    paddingHorizontal: 15,
    borderRadius: 7,
    fontSize: 12,
    color: "white",
    marginBottom: 5,
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
    alignItems: "center",
  },
  //   end food item styling
});
