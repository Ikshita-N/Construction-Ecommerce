import React, { useState, useEffect, useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getIpAddress } from "../../IpAddressUtils";
import { useFocusEffect } from "@react-navigation/native";

const Header = ({ setModalVisible, modalVisible }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ipAddress = getIpAddress();

  const fetchDefaultAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `http://${ipAddress}:8000/addresses/${token}`
      );
      setDefaultAddress(response.data.defaultAddress);
    } catch (error) {
      console.log("Error fetching default address:", error);
    }
  };

  useFocusEffect(() => {
    fetchDefaultAddress();
  });

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);

    Keyboard.dismiss();
  };

  return (
    <View>
      <View style={styles.header}>
        <Pressable style={styles.searchBar}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput
            placeholder="Search for products"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            style={styles.searchInput}
          />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.locationBar}
      >
        <Ionicons name="location-outline" size={24} color="black" />
        <Pressable>
          {defaultAddress ? (
            <Text>
              Deliver to {defaultAddress?.name} - {defaultAddress?.street}
            </Text>
          ) : (
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              Add an Address
            </Text>
          )}
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Header;

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
  searchInput: {
    flex: 1,
    padding: 10,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#FAC369",
  },
});
