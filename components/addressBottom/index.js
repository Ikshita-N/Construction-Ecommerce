import React, { useState, useEffect, useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from "../../IpAddressUtils";

const AddressBottom = ({ modalVisible, setModalVisible, addresses, onSelectDefaultAddress }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigation = useNavigation();
  const ipAddress = getIpAddress();

  const fetchAddresses = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `http://${ipAddress}:8000/addresses/${token}`
      );

      const { addresses: fetchedAddresses, defaultAddress } = response.data;

      // Set the default address received from the API
      setDefaultAddress(defaultAddress || null);
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  }, [ipAddress]);

  useEffect(() => {
    fetchAddresses();

    const unsubscribe = navigation.addListener('focus', fetchAddresses);

    return unsubscribe;
  }, [navigation, fetchAddresses]);

  const handleAddressPress = (address) => {
    setSelectedAddress(address);
    onSelectDefaultAddress(address); // Pass the selected default address to the parent component
  };

  return (
    <View>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose your Location</Text>
            <Text style={styles.subHeaderText}>
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {defaultAddress && (
              <Pressable
                key={defaultAddress._id}
                onPress={() => handleAddressPress(defaultAddress)}
                style={[
                  styles.addressBox,
                  {
                    borderColor:
                      selectedAddress === defaultAddress._id ? "red" : "green",
                  },
                ]}
              >
                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>
                    {defaultAddress.name}
                  </Text>
                  <Entypo name="location-pin" size={22} color="red" />
                </View>
                <Text numberOfLines={1} style={styles.addressText}>
                  {defaultAddress.landmark}, {defaultAddress.houseNo}
                </Text>
                <Text numberOfLines={1} style={styles.addressText}>
                  {defaultAddress.street}
                </Text>
                <Text numberOfLines={1} style={styles.addressText}>
                  <Text>India,</Text> {defaultAddress.postalCode}
                </Text>
                <Text style={styles.defaultLabel}>Default</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={styles.addAddressBox}
            >
              <Text style={styles.addAddressText}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={styles.optionsContainer}>
            <View style={styles.optionRow}>
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={styles.optionText}>Enter an Indian pincode</Text>
            </View>
            <View style={styles.optionRow}>
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={styles.optionText}>Use My Current location</Text>
            </View>
            <View style={styles.optionRow}>
              <AntDesign name="earth" size={22} color="#0066b2" />
              <Text style={styles.optionText}>Deliver outside India</Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: 400,
  },
  header: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500",
  },
  subHeaderText: {
    marginBottom: 5,
    fontSize: 16,
    color: "gray",
  },
  addressBox: {
    width: 140,
    height: 140,
    borderWidth: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 10,
    backgroundColor: "#FBCEB1",
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressName: {
    fontSize: 13,
    fontWeight: "bold",
  },
  addressText: {
    width: 130,
    fontSize: 13,
    textAlign: "center",
  },
  defaultLabel: {
    color: "green",
    fontSize: 12,
  },
  addAddressBox: {
    width: 140,
    height: 140,
    borderColor: "#D0D0D0",
    marginTop: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addAddressText: {
    textAlign: "center",
    color: "#0066B2",
    fontWeight: "500",
  },
  optionsContainer: {
    flexDirection: "column",
    gap: 7,
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  optionText: {
    color: "#0066b2",
    fontWeight: "400",
  },
});

export default AddressBottom;
