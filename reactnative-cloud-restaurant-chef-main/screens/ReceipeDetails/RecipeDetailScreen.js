import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

import colors from "../../config/Restaurant/colors";
import SPACING from "../../config/SPACING";
import { useGetProductByIdQuery } from "../../redux/APIs/productServiceApi";

const { height } = Dimensions.get("window");

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId } = route.params;
  console.log(recipeId);

  const {
    data: recipe,
    error,
    isLoading,
    isSuccess,
  } = useGetProductByIdQuery(recipeId);

  useEffect(() => {
    if (isSuccess) {
      console.log(recipe);
    }
  }, [recipe]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch recipe details. Please try again.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={colors.orange} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={{
              padding: SPACING * 2,
              height: height / 2.5,
              paddingTop: SPACING * 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            source={{
              uri: recipe?.imageUrl || "https://via.placeholder.com/300",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
            >
              <Ionicons
                name="arrow-back"
                size={SPACING * 2.5}
                color={colors.gray}
              />
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              padding: SPACING * 2,
              paddingTop: SPACING * 3,
              marginTop: -SPACING * 3,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: SPACING * 3,
                    color: colors.black,
                    fontWeight: "700",
                  }}
                >
                  {recipe?.name}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="time"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.minTime || "N/A"}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bicycle"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.del_time || "20min"}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="restaurant"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.cooking_time || "10 min"}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
                marginTop: SPACING * 2,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 1.7,
                fontWeight: "500",
                color: colors.gray,
              }}
            >
              {recipe?.description}
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.heading}>Additional Information</Text>
          <View style={styles.infoRow}>
            <Ionicons
              name="flame-outline"
              size={SPACING * 1.6}
              color={colors.gray}
            />
            <Text style={styles.infoLabel}>Calories:</Text>
            <Text style={styles.infoValue}>{recipe?.calories || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="time-outline"
              size={SPACING * 1.6}
              color={colors.gray}
            />
            <Text style={styles.infoLabel}>Maximum Time:</Text>
            <Text style={styles.infoValue}>{recipe?.maxTime || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="cube-outline"
              size={SPACING * 1.6}
              color={colors.gray}
            />
            <Text style={styles.infoLabel}>Minimum Quantity:</Text>
            <Text style={styles.infoValue}>{recipe?.minQuantity || "N/A"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons
              name="cube-outline"
              size={SPACING * 1.6}
              color={colors.gray}
            />
            <Text style={styles.infoLabel}>Maximum Quantity:</Text>
            <Text style={styles.infoValue}>{recipe?.price || "N/A"}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: SPACING * 2,
    backgroundColor: colors.white,
    borderRadius: SPACING,
    marginBottom: SPACING * 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: SPACING,
    elevation: 4,
  },
  heading: {
    fontSize: SPACING * 2,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: SPACING,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING,
    paddingVertical: SPACING / 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.yellow,
  },
  infoLabel: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    color: colors.gray,
    marginLeft: SPACING,
    flex: 1,
  },
  infoValue: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    color: colors.dark,
    flex: 1,
    textAlign: "right",
  },
});
