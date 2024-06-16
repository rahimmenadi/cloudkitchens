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
  TouchableHighlight,
} from "react-native";
import profileImage from "../../assets/profileImage.png";
import burgerImage from "../../assets/burgerImage.png";
import pizza from "../../assets/pizzaImage.png";
import beefImage from "../../assets/beefBurgerImage.png";
import meatImage from "../../assets/meatImage.png";
import React, { useEffect, useRef, useState } from "react";
import { Swipeable, TextInput } from "react-native-gesture-handler";
import { mainColor } from "../../constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  FontAwesome6,
  FontAwesome5,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useGetAllProductsQuery } from "../../redux/APIs/productServiceApi";
import { useGetMeQuery } from "../../redux/APIs/userServiceApi";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SearchPage = ({ navigation }) => {
  const [activeCategory, setactiveCategory] = useState("1");
  const handleClickCategory = (id) => {
    setactiveCategory(id);
  };

  const [searchWord, setsearchWord] = useState("");
  const handleLogin = (id) => {
    console.log(id);
  };
  const handleClickItem = (id) => {
    navigation.navigate("MealPage", { recipeId: id });
  };
  const [myloading, setmyloading] = useState(false);

  const { data: profile } = useGetMeQuery();
  const {
    data: foodItems,
    isError,
    error,
    isSuccess,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({ filter: profile?.data?._id, name: searchWord });

  useEffect(() => {
    setmyloading(false);
  }, [foodItems]);

  const RenderFoodItem = ({ data: item, handleDelete, handlePressItem }) => {
    const rigthSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: "clamp",
      });
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.deleteBox}
            activeOpacity={0.5}
          >
            <View>
              <Animated.Text
                style={{ transform: [{ scale: scale }], color: "white" }}
              >
                {/* <FontAwesome6 name="trash" size={24} color={mainColor} /> */}
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={26}
                  color={"white"}
                />
              </Animated.Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.editBox}
            activeOpacity={0.6}
          >
            <View>
              <Animated.Text
                style={{ transform: [{ scale: scale }], color: "white" }}
              >
                <MaterialCommunityIcons
                  name="circle-edit-outline"
                  size={26}
                  color="white"
                />
              </Animated.Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <Swipeable renderRightActions={rigthSwipe}>
        <TouchableOpacity onPress={handlePressItem} style={styles.foodItem}>
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
              {item.available ? (
                <FontAwesome name="circle" size={14} color="#42FF00" />
              ) : (
                <FontAwesome name="circle" size={14} color="#FF0000" />
              )}
            </View>
            <View style={styles.itemSecondTextContainer}>
              <Text style={styles.itemSecondText}>
                {item?.calories} Calories
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
  };

  const flatListRef = useRef(null);
  const [leftShadowDisplay, setleftShadowDisplay] = useState("none");
  const [rightShadowDisplay, setrightShadowDisplay] = useState("block");
  const [reachend, setreachend] = useState(false);
  const handleEndReached = () => {
    setrightShadowDisplay("none");
    setreachend(true);
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    setleftShadowDisplay("block");
    reachend ? setrightShadowDisplay("none") : setrightShadowDisplay("block");
    setreachend(false);
    if (contentOffset.x === 0) {
      setleftShadowDisplay("none");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            top: 0,
            height: "100%",
          }}
        >
          <TouchableHighlight
            underlayColor="none"
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={mainColor} />
          </TouchableHighlight>
        </View>
        <View style={{ alignSelf: "center", width: "100%" }}>
          <Text style={{ fontSize: 17, textAlign: "center", fontWeight: 500 }}>
            Search
          </Text>
        </View>
      </View>
      <View style={styles.rowBetween}>
        <View style={[styles.inputContainer, { flex: 10 }]}>
          <Feather name="search" size={24} color={mainColor} />

          <TextInput
            style={styles.input}
            placeholder="Search"
            keyboardAppearance="dark"
            returnKeyType="search"
            selectionColor={"#5E3D1E"}
            onChangeText={(text) => {
              setmyloading(true);
              setsearchWord(text);
            }}
          />
        </View>
        <View style={styles.iconContainer}>
          <Feather name="filter" size={24} color={mainColor} />
        </View>
      </View>

      {true ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            width: "100%",
            backgroundColor: "white",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#444",
                marginBottom: 10,
              }}
            >
              95 result found for{" "}
              <Text style={{ fontWeight: "700" }}>"cheese burger"</Text>
            </Text>
          </View>
          {isLoading | myloading ? (
            <View>
              <Text>loading ...</Text>
            </View>
          ) : (
            <View style={{ width: "100%", flex: 1 }}>
              <FlatList
                data={foodItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <RenderFoodItem
                      data={item}
                      handleDelete={() => handleLogin(item.id)}
                      handlePressItem={() => handleClickItem(item.id)}
                    />
                  );
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  rowGap: 10,
                  paddingBottom: 10,
                  width: "100%",
                }}
              />
            </View>
          )}
        </View>
      ) : (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 0.6 }}
        >
          {/* <Image source={profileImage} style={styles.image}></Image> */}
          <AntDesign
            name="warning"
            style={{ marginBottom: 20 }}
            size={104}
            color="#444"
          />
          <Text style={styles.bigText}> No Result Found</Text>
          <Text style={{ paddingHorizontal: 40, textAlign: "center" }}>
            Sorry, the keyword you are trying to search cannot be found, try
            another keyword.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
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
    marginTop: 10,
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
    //   },/
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
    width: 180,
    height: 180,
    marginBottom: 20,
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
    marginTop: 37,
    paddingHorizontal: 15,
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.8,
    borderColor: "#ddd",
    width: "100%",
    justifyContent: "flex-start",
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
    alignItems: "center",
  },
  //   end food item styling
});
