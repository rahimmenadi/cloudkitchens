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
//   Platform,
//   useWindowDimensions,
// } from "react-native";
// import profileImage from "../../assets/profileImage.png";
// import burgerImage from "../../assets/burgerImage.png";
// import pizza from "../../assets/pizzaImage.png";
// import * as ImagePicker from "expo-image-picker";
// import beefImage from "../../assets/beefBurgerImage.png";
// import meatImage from "../../assets/meatImage.png";
// import React, { useEffect, useRef, useState } from "react";
// import { Swipeable, TextInput } from "react-native-gesture-handler";
// import { MaterialIcons, Fontisto } from "@expo/vector-icons";
// import {
//   FontAwesome6,
//   FontAwesome5,
//   AntDesign,
//   MaterialCommunityIcons,
//   FontAwesome,
//   Feather,
// } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { mainColor } from "../../constants/theme";
// import img from "../../assets/meatImage.png";
// import { Picker, PickerIOS } from "@react-native-picker/picker";
// import { Button } from "react-native-paper";

// const categories = [
//   { id: "1", name: "All", icon: "filter" },
//   { id: "2", name: "Category 2dsaf", icon: "search" },
//   { id: "3", name: "Category 3", icon: "settings" },
//   { id: "4", name: "Category 3", icon: "key" },
//   { id: "5", name: "Category 1", icon: "filter" },
//   { id: "6", name: "Category 2", icon: "search" },
//   // Add more categories as needed
// ];
// const foodItems = [
//   {
//     id: "1",
//     name: "classic double cheeseburger with beef",
//     calories: "360",
//     price: "250.00",
//     image: beefImage,
//     review: 4.5,
//     available: true,
//   },
//   {
//     id: "2",
//     name: "Pizza with ham and vegetables",
//     calories: "450",
//     price: "1000.00",
//     image: pizza,
//     review: 4.8,
//     available: true,
//   },
//   {
//     id: "3",
//     name: "Classic cheeseburger with beef",
//     calories: "500",
//     price: "500.00",
//     image: burgerImage,
//     available: false,
//   },
//   {
//     id: "4",
//     name: "Cheeseburger with fries",
//     calories: "230",
//     price: "450.00",
//     image: meatImage,
//     review: 3.9,
//     available: true,
//   },
//   {
//     id: "5",
//     name: "classic double cheeseburger with beef",
//     calories: "360",
//     price: "250.00",
//     image: burgerImage,
//     review: 4.5,
//     available: true,
//   },
//   {
//     id: "6",
//     name: "Pizza with ham and vegetables",
//     calories: "450",
//     price: "1000.00",
//     image: meatImage,
//     available: true,
//   },
//   {
//     id: "7",
//     name: "Classic cheeseburger with beef",
//     calories: "500",
//     price: "500.00",
//     image: pizza,
//     review: 4.5,
//     available: true,
//   },
//   {
//     id: "8",
//     name: "Cheeseburger with fries",
//     calories: "230",
//     price: "450.00",
//     image: null,
//     review: 4.5,
//     available: false,
//   },
//   // Add more categories as needed
// ];
// const SCREEN_WIDTH = Dimensions.get("window").width;

// const OrderPage = ({ route, navigation }) => {
//   const { id } = route.params;
//   const styles = useStyles();
//   //   const [signUp, { data, isError, isLoading, isSuccess, error }] =
//   //     useSignUpMutation();
//   const [activeCategory, setactiveCategory] = useState("1");

//   const handleClickCategory = (id) => {
//     setactiveCategory(id);
//   };
//   const handleClickItem = (id) => {
//     navigation.navigate("OrderPage", { id });
//   };

//   const RenderFoodItem = ({ data: item, handleDelete, handlePressItem }) => (
//     <View style={{ alignItems: "center", gap: 5 }}>
//       <TouchableOpacity
//         onPress={handlePressItem}
//         activeOpacity={1}
//         style={styles.foodItem}
//       >
//         <Image style={styles.itemImage} source={item.image || profileImage} />
//         <View style={styles.itemContent}>
//           <View style={styles.itemFooterContainer}>
//             <Text style={styles.itemMainText} numberOfLines={2}>
//               {item.name}
//             </Text>
//           </View>

//           <View style={styles.itemFooterContainer}>
//             <View>
//               <View style={styles.itemSecondTextContainer}>
//                 <Text style={styles.itemSecondText}>
//                   {item.calories} Calories
//                 </Text>
//                 <FontAwesome5 name="fire-alt" size={16} color={mainColor} />
//               </View>
//               <Text style={styles.itemPrice}>{item.price} DZD</Text>
//             </View>
//             <View style={styles.itemCountContainer}>
//               <Text style={styles.itemCountText}>{item.review || 0}</Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   //   useEffect(() => {
//   //     // localStorage.setItem("token",data?.token);
//   //     if (isSuccess) {
//   //       navigation.navigate("ThankYou");
//   //     }
//   //   }, [data]);
//   //   useEffect(() => {
//   //     if (isError) {
//   //       setErrorMessage(error?.data?.error);
//   //       settarget(9);
//   //     }
//   //   }, [error]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <TouchableHighlight
//             underlayColor="none"
//             onPress={() => navigation.goBack()}
//           >
//             <Feather name="arrow-left" size={24} color={mainColor} />
//           </TouchableHighlight>
//         </View>
//         <View>
//           <Text style={{ fontSize: 17, fontWeight: 500, marginEnd: 20 }}>
//             Order details
//           </Text>
//         </View>
//         <View style={styles.rightHeader}></View>
//       </View>
//       <ScrollView contentContainerStyle={styles.scrollview}>
//         <View>
//           {/* <View style={{ width: "100%" }}></View> */}
//           <Text style={styles.bigText}>Order item</Text>
//           <View style={{ height: 240 }}>
//             <FlatList
//               data={foodItems}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => {
//                 return (
//                   <RenderFoodItem
//                     data={item}
//                     handleDelete={() => {}}
//                     handlePressItem={() => handleClickItem(item.id)}
//                   />
//                 );
//               }}
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{
//                 columnGap: 10,
//                 paddingHorizontal: 15,
//               }}
//             />
//           </View>
//           <Text style={styles.bigText}>Customer information</Text>
//           <View style={styles.CustomerInfoContainer}>
//             <View style={styles.CustomerInfo}>
//               <View
//                 style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
//               >
//                 <Image
//                   style={styles.profileImageContainer}
//                   source={profileImage}
//                 />
//                 <View>
//                   <Text style={{ fontWeight: "500" }}>Zoltani ilias</Text>
//                   <Text style={styles.itemSecondText}>ID 452368</Text>
//                 </View>
//               </View>
//               <View>
//                 <View style={styles.CustomerPhoneContainer}>
//                   <Feather name="phone" size={16} color="white" />
//                   <View>
//                     <Text
//                       style={
//                         (styles.itemSecondText, { color: "#fff", fontSize: 10 })
//                       }
//                     >
//                       Phone Number
//                     </Text>
//                     <Text
//                       style={{ fontWeight: 500, fontSize: 12, color: "white" }}
//                     >
//                       0658987236
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//             <View style={styles.line}></View>
//             <Text
//               style={{
//                 width: "100%",
//                 fontWeight: 500,
//                 fontSize: 12,
//                 color: "black",
//               }}
//             >
//               Shipping Address
//             </Text>
//             <Text
//               style={{
//                 width: "100%",
//                 fontSize: 14,
//                 marginTop: -8,
//                 color: "#999",
//                 fontWeight: 500,
//               }}
//             >
//               Suzy Queue 4455
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               height: 50,
//               width: "100%",
//               justifyContent: "space-between",
//               paddingHorizontal: 15,
//             }}
//           >
//             <Text style={{ fontWeight: 700 }}>Customer information</Text>
//             <View style={styles.itemSecondTextContainer}>
//               <Text style={(styles.itemSecondText, styles.itemTextHeignlight)}>
//                 Pending
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.rowBetween}>
//           <TouchableOpacity style={styles.mainButton("#ED694A")}>
//             <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
//               Reject Order
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.mainButton("#46C562")}>
//             <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>
//               Accept Order
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default OrderPage;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TouchableHighlight,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import profileImage from "../../assets/profileImage.png";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { mainColor } from "../../constants/theme";
import {
  useGetOrdersByIdQuery,
  useRejectOrderByChefMutation,
  useSetAgenceForOrderMutation,
  useUpdateOrderStateMutation,
  useValidateOrderByChefMutation,
} from "../../redux/APIs/paymentServiceApi";
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
} from "../../redux/APIs/userServiceApi";

const OrderPage = ({ route, navigation }) => {
  const { id } = route.params;
  const styles = useStyles();
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetOrdersByIdQuery(id);
  useEffect(() => {
    console.log(order);
  }, [order]);

  const [acceptOrder] = useValidateOrderByChefMutation();
  const [rejectOrder] = useRejectOrderByChefMutation();
  const [updateOrderState] = useUpdateOrderStateMutation();
  const [setAgenceForOrder] = useSetAgenceForOrderMutation(); // Use this hook

  const [selectedState, setSelectedState] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const {
    data: agencies,
    // isLoading,
    // isError,
    // refetch,
  } = useGetUsersQuery();

  // useEffect(() => {
  //   console.log(agencies?.data);
  // }, [agencies]);

  useEffect(() => {
    if (order?.statusOfOrder === "valid") {
      setSelectedState(order.state);
    }
  }, [order]);

  const handleAcceptOrder = async () => {
    await acceptOrder(id);
    refetch();
  };

  const handleRejectOrder = async () => {
    await rejectOrder(id);
    refetch();
  };

  const handleUpdateOrderState = async (state) => {
    await updateOrderState({ id, state });
    refetch();
  };

  const handleSetAgencyAndAccept = async () => {
    await setAgenceForOrder({ id, agence: selectedAgency });
    await acceptOrder(id);
    setModalVisible(false);
    refetch();
  };

  const RenderFoodItem = ({ data: item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MealPage", { recipeId: item.id })}
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
        </View>
        <View style={styles.itemSecondTextContainer}>
          <Text style={styles.itemSecondText}>item Price : {item?.price}</Text>
        </View>
        <View style={styles.itemFooterContainer}>
          <Text style={styles.itemPrice}>{item.totalPrice} DZD</Text>
          <View style={styles.itemCountContainer}>
            <Text style={styles.itemCountText}>{item.quantity || 0}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const { data: user } = useGetUserByIdQuery(order?.userId);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching order details</Text>
      </SafeAreaView>
    );
  }

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
          <Text style={{ fontSize: 17, fontWeight: 500, marginEnd: 20 }}>
            Order details
          </Text>
        </View>
        <View style={styles.rightHeader}></View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View>
          <Text style={styles.bigText}>Order items</Text>
          <View style={{ height: 240 }}>
            <FlatList
              data={order.products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <RenderFoodItem data={item} />}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                columnGap: 10,
                paddingHorizontal: 15,
              }}
            />
          </View>
          <Text style={styles.bigText}>Customer information</Text>
          <View style={styles.CustomerInfoContainer}>
            <View style={styles.CustomerInfo}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Image
                  style={styles.profileImageContainer}
                  source={profileImage}
                />
                <View>
                  <Text style={{ fontWeight: "500" }}>{user?.data?.name}</Text>
                </View>
              </View>
            </View>
            <View style={styles.line}></View>
            <Text
              style={{
                width: "100%",
                fontWeight: 500,
                fontSize: 12,
                color: "black",
              }}
            >
              Shipping Address
            </Text>
            <Text
              style={{
                width: "100%",
                fontSize: 14,
                marginTop: -8,
                color: "#999",
                fontWeight: 500,
              }}
            >
              {order.adresse}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.rowBetween}>
            <Text style={{ fontWeight: 700 }}>Order Status</Text>
            <View style={styles.itemSecondTextContainer}>
              <Text style={[styles.itemSecondText, styles.itemTextHeignlight]}>
                {order.statusOfOrder}
              </Text>
            </View>
          </View>
          {order.statusChef !== "valid" ? (
            <View style={styles.rowBetween}>
              <TouchableOpacity
                style={styles.mainButton("#ED694A")}
                onPress={handleRejectOrder}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
                >
                  Reject Order
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mainButton("#46C562")}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
                >
                  Accept Order
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}
          {order.statusAgence === null ? (
            ""
          ) : (
            <Picker
              selectedValue={selectedState}
              style={{ height: 50, width: SCREEN_WIDTH - 30 }}
              onValueChange={(itemValue) => handleUpdateOrderState(itemValue)}
            >
              <Picker.Item label="En Livraison" value="en-livraison" />
              <Picker.Item label="Livré" value="delivered" />
            </Picker>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Agency</Text>
            <Picker
              selectedValue={selectedAgency}
              onValueChange={(obj) => setSelectedAgency(obj)}
              style={{ width: "100%" }}
            >
              {agencies?.data?.map((agency) => (
                <Picker.Item
                  key={agency._id}
                  label={agency.name}
                  value={agency._id}
                />
              ))}
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSetAgencyAndAccept}
                disabled={!selectedAgency}
              >
                <Text style={styles.textStyle}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// const useStyles = () =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       borderBottomWidth: 1,
//       borderBottomColor: "#ddd",
//     },
//     scrollview: {
//       padding: 15,
//     },
//     bigText: {
//       fontSize: 18,
//       fontWeight: "bold",
//       marginBottom: 10,
//     },
//     CustomerInfoContainer: {
//       padding: 15,
//       borderRadius: 5,
//       backgroundColor: "#f7f7f7",
//       marginVertical: 10,
//     },
//     CustomerInfo: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginBottom: 10,
//     },
//     profileImageContainer: {
//       width: 50,
//       height: 50,
//       borderRadius: 25,
//     },
//     foodItem: {
//       flexDirection: "row",
//       alignItems: "center",
//       padding: 10,
//       backgroundColor: "#fff",
//       borderRadius: 5,
//       shadowColor: "#000",
//       shadowOpacity: 0.1,
//       shadowOffset: { width: 0, height: 1 },
//       shadowRadius: 2,
//       elevation: 2,
//     },
//     itemImage: {
//       width: 50,
//       height: 50,
//       borderRadius: 5,
//     },
//     itemContent: {
//       flex: 1,
//       marginLeft: 10,
//     },
//     itemFooterContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//       marginTop: 5,
//     },
//     itemMainText: {
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//     itemSecondTextContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//     },
//     itemSecondText: {
//       fontSize: 12,
//       color: "#999",
//       marginRight: 5,
//     },
//     itemPrice: {
//       fontSize: 14,
//       fontWeight: "bold",
//     },
//     itemCountContainer: {
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     itemCountText: {
//       fontSize: 12,
//       fontWeight: "bold",
//     },
//     itemTextHeignlight: {
//       color: mainColor,
//       fontWeight: "bold",
//     },
//     mainButton: (color) => ({
//       backgroundColor: color,
//       borderRadius: 5,
//       padding: 10,
//       justifyContent: "center",
//       alignItems: "center",
//       width: "48%",
//     }),
//     loadingContainer: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "#fff",
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "rgba(0,0,0,0.5)",
//     },
//     modalView: {
//       width: "80%",
//       backgroundColor: "white",
//       borderRadius: 20,
//       padding: 20,
//       alignItems: "center",
//       shadowColor: "#000",
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: "center",
//       fontWeight: "bold",
//       fontSize: 18,
//     },
//     modalButtons: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       width: "100%",
//     },
//     modalButton: {
//       borderRadius: 10,
//       padding: 10,
//       elevation: 2,
//       backgroundColor: mainColor,
//       margin: 5,
//     },
//     textStyle: {
//       color: "white",
//       fontWeight: "bold",
//       textAlign: "center",
//     },
//   });

export default OrderPage;

const useStyles = () => {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
      width: "80%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    modalButton: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      backgroundColor: mainColor,
      margin: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
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
      paddingHorizontal: 15,
      gap: 10,
      alignItems: "center",
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
      height: 60,
      width: 60,
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 3,
      // shadowColor: "#555", // Shadow color

      borderRadius: 500,
      padding: 10,
      backgroundColor: "transparent",
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
    buttonText: {
      color: "#494554",
      fontWeight: "bold",
    },
    mainButton: (color) => ({
      backgroundColor: color,
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 20,
      width: "48%",
      paddingVertical: 15,
      borderRadius: 5,
      marginVertical: 10,
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
    }),

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
      alignItems: "flex-start",
      minHeight: height - 65,
      justifyContent: "space-between",
      marginBottom: 15,
    },
    bigText: {
      fontSize: 16,
      marginVertical: 10,
      paddingHorizontal: 15,
      fontWeight: "bold",
    },
    //category
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
      color: "#eee",
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
      width: 200,
      backgroundColor: "white",
      borderRadius: 8,
      padding: 10,
      paddingEnd: 15,
      height: 240,
      gap: 10,
    },
    itemImage: {
      height: 120,
      objectFit: "cover",
      width: "100%",
      backgroundColor: "#ff550085",
      borderRadius: 8,
    },
    itemContent: {
      flex: 1,
      justifyContent: "space-between",
      height: 90,
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
      backgroundColor: "#92F37F",
      padding: 2,
      paddingHorizontal: 15,
      borderRadius: 7,
      fontSize: 12,
      color: "white",
    },
    itemPrice: {
      fontSize: 15,
      fontWeight: "bold",
      marginTop: 5,
    },
    itemFooterContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 10,
      alignItems: "flex-end",
    },
    itemCountContainer: {
      backgroundColor: mainColor,
      padding: 7,
      borderRadius: 5,
    },
    itemCountText: {
      color: "white",
      fontSize: 12,
    },
    //   end food item styling
    //start customer info styling
    CustomerInfoContainer: {
      paddingHorizontal: 15,
      gap: 10,
      alignItems: "center",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderWidth: 1,
      width: width - 30,
      borderColor: "#ddd",
      backgroundColor: "white",
      marginHorizontal: 15,
      shadowColor: "#aaa",
      paddingVertical: 10,
      borderRadius: 5,
    },
    CustomerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      gap: 10,
      alignItems: "center",
      width: width - 30,
      marginHorizontal: 15,
      paddingVertical: 10,
    },
    //start customer info styling
    CustomerPhoneContainer: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      backgroundColor: "#655B56",
      padding: 7,
      paddingHorizontal: 15,

      borderRadius: 5,
    },
    line: {
      width: "90%",
      height: 1,
      backgroundColor: "#ddd",
    },
  });
};
