impaort {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState, useEffect, useContext } from "react";
  import { UserType } from "../UserContext";
  import { Entypo } from "@expo/vector-icons";
  import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
  import { useDispatch, useSelector } from "react-redux";
  import { cleanCart } from "../redux/CartReducer";
  import { addOrder } from "../redux/OrderReducer";
  import { useNavigation } from "@react-navigation/native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const ConfirmationScreen = () => {
    const steps = [
      { title: "Address", content: "Address Form" },
      { title: "Delivery", content: "Delivery Options" },
      { title: "Payment", content: "Payment Details" },
      { title: "Place Order", content: "Order Summary" },
    ];
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [defaultAddress, setdefaultAddress] = useState(null); // Default address state
    const { userId, setUserId } = useContext(UserType);
    const cart = useSelector((state) => state.cart.cart);
    const total = cart
      ?.map((item) => item.price * item.quantity)
      .reduce((curr, prev) => curr + prev, 0);
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchAddresses();
      fetchOrders();
    }, []);
  
    const fetchAddresses = async () => {
      try {
        const addresses = await AsyncStorage.getItem("addresses");
        const parsedAddresses = addresses ? JSON.parse(addresses) : [];
        setAddresses(parsedAddresses);
        setdefaultAddress(parsedAddresses.find(addr => addr.isDefault) || null); 
      } catch (error) {
        console.log("Error fetching addresses", error);
      }
    };
  
    const fetchOrders = async () => {
      try {
        const orders = await AsyncStorage.getItem("orders");
        const parsedOrders = orders ? JSON.parse(orders) : [];
        setOrders(parsedOrders);
      } catch (error) {
        console.log("Error fetching orders", error);
      }
    };
  
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAdress] = useState("");
    const [option, setOption] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const handlePlaceOrder = async () => {
      try {
        const orderData = {
          userId,
          cartItems: cart,
          totalPrice: total,
          shippingAddress: selectedAddress,
          paymentMethod: selectedOption,
        };
  
        // Mocking the order placement
        const orders = await AsyncStorage.getItem("orders");
        const parsedOrders = orders ? JSON.parse(orders) : [];
        const newOrders = [...parsedOrders, orderData];
        await AsyncStorage.setItem("orders", JSON.stringify(newOrders));
        setOrders(newOrders);
  
        dispatch(addOrder(orderData)); // Add order to Redux store
        dispatch(cleanCart()); // Clean the cart after placing the order
        navigation.navigate("Order");
        console.log("Order created successfully", orderData);
      } catch (error) {
        console.log("Error", error);
      }
    };
  
    return (
      <ScrollView style={{ marginTop: 55, backgroundColor: '#FFF8E7' }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
              justifyContent: "space-between",
            }}
          >
            {steps?.map((step, index) => (
              <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: "#FFAD33" },
                      currentStep < index && { backgroundColor: "#ccc" },
                    ]}
                  />
                )}
                <Pressable
                  onPress={() => setCurrentStep(index)}
                  disabled={index > currentStep}
                >
                  <View
                    style={[
                      {
                        width: 25,
                        height: 25,
                        borderRadius: 25 / 2,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#FFAD33",
                      },
                      currentStep >= index && { backgroundColor: "#FFAD33" },
                    ]}
                  >
                    {currentStep > index && <Text>✓</Text>}
                  </View>
                </Pressable>
                <Text style={{ fontSize: 12, marginTop: 8, color: 'black' }}>{step.title}</Text>
              </View>
            ))}
          </View>
          {currentStep === 0 && (
            <View>
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <Pressable
                    key={address.id}
                    onPress={() => setSelectedAdress(address)}
                    style={[
                      styles.addressContainer,
                      selectedAddress?.id === address.id && styles.selectedAddressContainer,
                    ]}
                  >
                    <Text style={styles.addressText}>{address.street}</Text>
                    <Text style={styles.addressText}>{address.city}</Text>
                    <Text style={styles.addressText}>{address.state}</Text>
                    <Text style={styles.addressText}>{address.zipCode}</Text>
                  </Pressable>
                ))
              ) : (
                <Text>No addresses found</Text>
              )}
            </View>
          )}
  
          {currentStep === 1 && (
            <View>
              <Text style={styles.sectionTitle}>Delivery Options:</Text>
              <Pressable onPress={() => setSelectedOption("Standard")} style={[
                styles.optionContainer,
                selectedOption === "Standard" && styles.selectedOptionContainer,
              ]}>
                <Text style={styles.optionText}>Standard Delivery</Text>
              </Pressable>
              <Pressable onPress={() => setSelectedOption("Express")} style={[
                styles.optionContainer,
                selectedOption === "Express" && styles.selectedOptionContainer,
              ]}>
                <Text style={styles.optionText}>Express Delivery</Text>
              </Pressable>
            </View>
          )}
  
          {currentStep === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Payment Details:</Text>
              <Pressable onPress={() => setSelectedOption("Card")} style={[
                styles.optionContainer,
                selectedOption === "Card" && styles.selectedOptionContainer,
              ]}>
                <Text style={styles.optionText}>Credit/Debit Card</Text>
              </Pressable>
              <Pressable onPress={() => setSelectedOption("Cash")} style={[
                styles.optionContainer,
                selectedOption === "Cash" && styles.selectedOptionContainer,
              ]}>
                <Text style={styles.optionText}>Cash on Delivery</Text>
              </Pressable>
            </View>
          )}
  
          {currentStep === 3 && (
            <View>
              <Text style={styles.sectionTitle}>Order Summary:</Text>
              {cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Text style={styles.cartItemText}>{item.title}</Text>
                  <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                  <Text style={styles.cartItemText}>Price: ${item.price}</Text>
                </View>
              ))}
              <Text style={styles.totalText}>Total: ${total}</Text>
            </View>
          )}
        </View>
  
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          {currentStep > 0 && (
            <Pressable onPress={() => setCurrentStep((prevStep) => prevStep - 1)} style={styles.navButton}>
              <Text style={styles.navButtonText}>Previous</Text>
            </Pressable>
          )}
          {currentStep < steps.length - 1 ? (
            <Pressable onPress={() => setCurrentStep((prevStep) => prevStep + 1)} style={styles.navButton}>
              <Text style={styles.navButtonText}>Next</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handlePlaceOrder} style={styles.navButton}>
              <Text style={styles.navButtonText}>Place Order</Text>
            </Pressable>
          )}
        </View>
  
      </ScrollView>
    );
  };
  
  export default ConfirmationScreen;
  
  const styles = StyleSheet.create({
    addressContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 10,
      backgroundColor: 'white',
    },
    selectedAddressContainer: {
      borderColor: "#FFAD33",
    },
    addressText: {
      color: 'black',
    },
    sectionTitle: {
      fontSize: 18,
      marginBottom: 10,
      color: 'black',
    },
    optionContainer: {
      padding: 10,
      backgroundColor: '#ccc',
      marginBottom: 10,
    },
    selectedOptionContainer: {
      backgroundColor: '#FFAD33',
    },
    optionText: {
      color: 'black',
    },
    cartItem: {
      marginBottom: 10,
    },
    cartItemText: {
      color: 'black',
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    navButton: {
      padding: 10,
      backgroundColor: '#FFAD33',
    },
    navButtonText: {
      color: 'white',
    },
    orderTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: 'black',
    },
    orderContainer: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    orderText: {
      color: 'black',
    },
    noOrdersText: {
      color: 'grey',
    },
  });
  