import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  FontAwesome6,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import profileImage from "../../../assets/profileImage.png";
import burgerImage from "../../../assets/burgerImage.png";
import pizza from "../../../assets/pizzaImage.png";
import beefImage from "../../../assets/beefBurgerImage.png";
import meatImage from "../../../assets/meatImage.png";

import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { mainColor } from "../../../constants/theme";
import { FlatList } from "react-native-gesture-handler";
const Dashboard = ({ navigation }) => {
  const categories = [
    { id: "1", name: "All Orders", amount: 540, color: "#FFE8CE" },
    { id: "2", name: "Pending", amount: 35, color: "#E8EFFF" },
    { id: "3", name: "Shipeed", amount: 480, color: "#FFEDED" },
    { id: "4", name: "Canceled", amount: 18, color: "#E4FEF1" },
    // Add more categories as needed
  ];
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 0, 100],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Earning Chart"], // optional
  };

  const renderCategoryItem = ({ item }) => (
    <View style={{ alignItems: "center", gap: 5 }}>
      <TouchableOpacity
        style={styles.categoryContainer(item.color)}
        activeOpacity={0.9}
      >
        <Text style={{ fontSize: 13, fontWeight: "500", color: "#777" }}>
          {item.name}
        </Text>
        <Text style={styles.categoryName}>{item.amount}</Text>
      </TouchableOpacity>
    </View>
  );

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
  const handleClickItem = (id) => {
    navigation.navigate("AddMeal", { id });
  };
  const RenderFoodItem = ({ data: item, handleDelete, handlePressItem }) => (
    <View style={{ alignItems: "center", gap: 5 }}>
      <TouchableOpacity
        onPress={handlePressItem}
        activeOpacity={1}
        style={styles.foodItem}
      >
        <Image style={styles.itemImage} source={item.image || profileImage} />
        <View style={styles.itemContent}>
          <View style={styles.itemFooterContainer}>
            <Text style={styles.itemMainText} numberOfLines={2}>
              {item.name}
            </Text>
          </View>

          <View style={styles.itemFooterContainer}>
            <View>
              <View style={styles.itemSecondTextContainer}>
                <Text style={styles.itemSecondText}>
                  {item.calories} Calories
                </Text>
                <FontAwesome5 name="fire-alt" size={16} color={mainColor} />
              </View>
              <Text style={styles.itemPrice}>{item.price} DZD</Text>
            </View>
            <View style={styles.itemCountContainer}>
              <Text style={styles.itemCountText}>{item.review || 0}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={{ width: "100%" }}>
          <Text style={[styles.bigText, { color: "#444" }]}>Orders</Text>
        </View>
        <View style={{ position: "relative", height: 80 }}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ columnGap: 10, paddingHorizontal: 15 }}
          />
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <LineChart
            data={data}
            width={Dimensions.get("window").width - 30} // from react-native
            height={220}
            yAxisLabel={"$"}
            chartConfig={{
              backgroundColor: "#eee",
              backgroundGradientFrom: mainColor,
              backgroundGradientTo: "#551100",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.5) => `rgba(255, 255,255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <Text style={[styles.bigText, { color: "#444" }]}>Trending Meal</Text>
        <View style={{ height: 240 }}>
          <FlatList
            data={foodItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <RenderFoodItem
                  data={item}
                  handleDelete={() => {}}
                  handlePressItem={() => handleClickItem(item.id)}
                />
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              columnGap: 10,
              paddingHorizontal: 15,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
  },
  input: {
    backgroundColor: "#ddd",
    width: "100%",
    margin: 10,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: 15,
    fontSize: 12,
  },
  scrollview: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
  },
  imageContainer: {
    width: "100%",
    backgroundColor: "#ff5500",
    alignItems: "center",
    paddingVertical: 50,
  },
  image: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  bigText: {
    fontSize: 20,
    marginHorizontal: 15,
    textAlign: "left",
    marginBottom: 10,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 117,
  },
  secondoryText: {
    color: "#777",
    fontSize: 12,
  },
  goSignInButton: {
    marginLeft: 10,
  },
  buttonText: {
    color: "#494554",
    fontWeight: "bold",
  },
  mainButton: {
    backgroundColor: "#484bf2",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    color: "white",
    alignItems: "center",
  },
  textStart: {
    textAlign: "left",
    width: 400,
    paddingHorizontal: 35,
    marginBottom: 10,
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
    color: "black",
  },
  //food styling
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
});
