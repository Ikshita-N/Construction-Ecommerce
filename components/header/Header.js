import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getIpAddress } from "../../IpAddressUtils";
import { useNavigation } from "@react-navigation/native";
import Favorites from "../../screens/Favorites";

const Header = ({ setModalVisible, modalVisible }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const ipAddress = getIpAddress();
  const navigation = useNavigation();

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

  useEffect(() => {
    fetchDefaultAddress();
  }, []);

  const handleSearch = () => {
    
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery !== '') {
      navigation.navigate('SearchResults', { searchQuery: trimmedSearchQuery });
    }
  };

  const navigateToFavorites = () => {
    navigation.navigate("Fav"); 
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
        <Pressable onPress={navigateToFavorites} style={styles.favoriteContainer}>
          <AntDesign
            style={styles.favoriteIcon}
            name="hearto"
            size={24}
            color="black"
          />
        </Pressable>
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.locationBar}
      >
        <MaterialIcons name="location-on" size={24} color="black" />
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
    justifyContent: "space-between", // Ensure icons are aligned at opposite ends
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8, // Adjust input padding
    fontSize: 16, // Adjust input font size
  },
  favoriteContainer: {
    padding: 5, // Adjust padding around the heart icon
  },
  favoriteIcon: {
    paddingRight: 1,
  },
  locationBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    backgroundColor: "#FAC369",
  },
});
