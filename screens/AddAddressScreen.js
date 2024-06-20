import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from '../IpAddressUtils';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setdefaultAddress] = useState(null); // Default address state
  const ipAddress = getIpAddress(); // Get the IP address
  const { userId, setUserId } = useContext(UserType);

  // Function to fetch addresses
  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `http://${ipAddress}:8000/addresses/${token}`
      );
      const { addresses, defaultAddress } = response.data;
      setAddresses(addresses);
      setdefaultAddress(defaultAddress); 
    } catch (error) {
      console.log("error", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchAddresses();
    }, [])
  );

  // Function to handle setting default address
  const handleSetDefaultAddress = async (addressId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      await axios.post(`http://${ipAddress}:8000/addresses/set-default`, {
        token,
        addressId,
      });

      setdefaultAddress({ _id: addressId }); // Update the default address ID in state
    } catch (error) {
      console.log("error setting default address", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={styles.header}>
        <Pressable style={styles.searchBar}>
          <AntDesign style={styles.searchIcon} name="search1" size={22} color="black" />
          <TextInput placeholder="Search products" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.title}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={styles.addNewAddress}
        >
          <Text>Add a new Address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* all the added addresses */}
          {addresses?.map((item, index) => (
            <Pressable key={index} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressName}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>
              <Text style={styles.addressText}>{item?.houseNo} , {item?.landmark} </Text>
              <Text style={styles.addressText}>{item?.street}</Text>
              <Text style={styles.addressText}>India</Text>
              <Text style={styles.addressText}>Phone No. {item?.mobileNo}</Text>
              <Text style={styles.addressText}>Pin code: {item.postalCode}</Text>

              <View style={styles.addressActions}>
                <Pressable style={styles.addressActionButton}>
                  <Text>Edit</Text>
                </Pressable>

                <Pressable style={styles.addressActionButton}>
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleSetDefaultAddress(item._id)} // Call the handler here
                  style={[
                    styles.addressActionButton,
                    defaultAddress && defaultAddress._id === item._id && styles.defaultButton
                  ]}
                >
                  <Text>{defaultAddress && defaultAddress._id === item._id ? "Default" : "Set as Default"}</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFAD33",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  addressContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addNewAddress: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  addressCard: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    flexDirection: "column",
    gap: 5,
    marginVertical: 10,
  },
  addressHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  addressName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  addressText: {
    color: "#181818",
    fontSize: 15,
  },
  addressActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 7,
  },
  addressActionButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: "#D0D0D0",
  },
  defaultButton: {
    backgroundColor: "#FFD700",
  },
});