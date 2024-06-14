import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from '../IpAddressUtils';

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  console.log(userId)
  console.log(1)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const ipAddress = getIpAddress();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: styles.headerStyle,
      headerLeft: () => (
        <Image
          style={styles.headerImage}
          // source={{
          //   uri: " ",
          // }}
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
  
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://${ipAddress}:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
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
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {user?.name}</Text>
  
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Your orders</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Your Account</Text>
        </Pressable>
      </View>
  
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Buy Again</Text>
        </Pressable>
        <Pressable onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
  
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ordersContainer}>
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
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
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
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  button: {
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 25,
    flex: 1,
  },
  buttonText: {
    textAlign: "center",
  },
  ordersContainer: {
    marginTop: 20,
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
