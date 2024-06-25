import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from '../IpAddressUtils';
import Header2 from "../components/header/Header2";
import initialState from "../reducer"; 

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const ipAddress = getIpAddress();
  
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: styles.headerStyle,
      headerLeft: () => (
        <Image
          style={styles.headerImage}
        />
      ),
      headerRight: () => (
        <View style={styles.headerIconsContainer}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${ipAddress}:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
        // If you want to update the state with the fetched user data:
        // setState(prevState => ({ ...prevState, user }));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://${ipAddress}:8000/orders/${userId}`
        );
        const orders = response.data.orders;
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);

  const navigateToAccountDetails = () => {
    navigation.navigate('AccountDetails');
  };
  const navigateToOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };


  return (
    <ScrollView style={styles.container}>
      <Header2 />
      <Text style={styles.welcomeText}>Welcome {state.user.displayName}!</Text>
  
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={navigateToOrderHistory}>Your orders</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={navigateToAccountDetails}>
          <Text style={styles.buttonText}>Your Account</Text>
        </Pressable>
        <Pressable onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
  
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ordersContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable style={styles.orderItem} key={order._id}>
              {order.products.slice(0, 1)?.map((product) => (
                <View style={styles.productImageContainer} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView> */}
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 55,
  },
  headerStyle: {
    backgroundColor: "#00CED1",
  },
  headerImage: {
    width: 140,
    height: 120,
    resizeMode: "contain",
  },
  headerIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    margin: 10,
    width: '80%',
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  ordersContainer: {
    marginTop: 20,
    paddingLeft: 10,
  },
  orderItem: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  productImageContainer: {
    marginVertical: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
