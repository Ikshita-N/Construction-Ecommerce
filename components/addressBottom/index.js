import React, { useState, useEffect, useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getIpAddress } from "../../IpAddressUtils";

const AddressBottom = ({ modalVisible, setModalVisible, onSelectDefaultAddress }) => {
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const [deliverOutsideClicked, setDeliverOutsideClicked] = useState(false); // State to track "Deliver outside India" click
  const [revertColorTimeout, setRevertColorTimeout] = useState(null); // Timeout for reverting colors
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

  const handleDeliverOutsideIndia = () => {
    setDeliverOutsideClicked(true);
    setShowAlert(true);

    // Automatically hide alert after 2 seconds and revert colors
    const timeout = setTimeout(() => {
      setShowAlert(false);
      setDeliverOutsideClicked(false);
    }, 2000);

    // Set the timeout ID to state for cleanup
    setRevertColorTimeout(timeout);
  };

  // Cleanup function to clear timeout on component unmount or state change
  useEffect(() => {
    return () => {
      if (revertColorTimeout) {
        clearTimeout(revertColorTimeout);
      }
    };
  }, [revertColorTimeout]);

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
              <Entypo name="location-pin" size={22} color="#0066b2"/>
              <Text style={styles.optionText}>Enter an Indian pincode</Text>
            </View>
            <Pressable onPress={handleDeliverOutsideIndia} style={styles.optionRow}>
              <Ionicons name="locate-sharp" size={22} color={deliverOutsideClicked ? "red" : "#0066b2"} />
              <Text style={[styles.optionText, { color: deliverOutsideClicked ? "red" : "#0066b2" }]}>
                Deliver outside India
              </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>

      {/* Alert Modal for "Currently not available" */}
      <Modal visible={showAlert} transparent={true} animationType="fade">
        <View style={styles.alertContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>Currently not available</Text>
          </View>
        </View>
      </Modal>
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
    fontWeight: "400",
    color: "#0066b2"
  },
  // Styles for Alert Modal
  alertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  alertText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddressBottom;
