import React, { useState, useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from "../../IpAddressUtils";
const AddressBottom = ({ modalVisible, setModalVisible }) => {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigation = useNavigation();
  const ipAddress = getIpAddress();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(
        `http://${ipAddress}:8000/addresses/${token}`
      );

      const { addresses, defaultAddress } = response.data;
      console.log(defaultAddress)
      console.log("1")
      setAddresses(addresses || []);
      setDefaultAddress(defaultAddress || null);
    } catch (error) {
      console.log("Error fetching addresses", error);
    }
  };

  const handleAddressPress = (address) => {
    setSelectedAddress(address._id);
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
        <ModalContent
          style={{
            width: "100%",
            height: 400,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 16,
                color: "gray",
              }}
            >
              Select a delivery location to see product availability and
              delivery options
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* Display default address */}
            {defaultAddress && (
              <Pressable
                key={defaultAddress._id}
                onPress={() => handleAddressPress(defaultAddress)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: selectedAddress === defaultAddress._id ? "red" : "green",
                  borderWidth: 2,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: "#FBCEB1",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {defaultAddress.name}
                  </Text>
                  <Entypo name="location-pin" size={22} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {defaultAddress.landmark}, {defaultAddress.houseNo}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {defaultAddress.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  <Text>India,</Text> {defaultAddress.postalCode}
                </Text>
                <Text style={{ color: "green", fontSize: 12 }}>Default</Text>
              </Pressable>
            )}
            {/* Add Address option */}
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066B2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Current location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default AddressBottom;
