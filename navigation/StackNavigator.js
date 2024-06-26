import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen/AddressScreen";
import CartScreen from "../screens/CartScreen/CartScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen/OrderScreen";
import CategoryPage from "../screens/CategoryPage/CategoryPage";
import Favorites from "../screens/Favorites/Favorites";
import SearchPage from "../screens/SearchPage/SearchPage";
import AccountDetails from "../screens/AccountDetails/AccountDetails";
import OrderHistory from "../screens/OrderHistory/OrderHistory";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#FFAD33" : "#9B9B9B" }}>
                Home
              </Text>
            ),
            tabBarLabelStyle: { color: "#FFAD33" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#FFAD33" />
              ) : (
                <AntDesign name="home" size={24} color="#9B9B9B" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#FFAD33" : "#9B9B9B" }}>
                Profile
              </Text>
            ),
            tabBarLabelStyle: { color: "#FFAD33" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#FFAD33" />
              ) : (
                <Ionicons name="person-outline" size={24} color="#9B9B9B" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#FFAD33" : "#9B9B9B" }}>
                Cart
              </Text>
            ),
            tabBarLabelStyle: { color: "#FFAD33" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="shopping-cart" size={20} color="#FFAD33" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="#9B9B9B" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fav"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountDetails"
          component={AccountDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
