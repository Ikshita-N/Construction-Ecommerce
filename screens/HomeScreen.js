import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import ProductComponent from "../components/ProductComponent";
import Categories from "../Categories/index";
import CarouselHome from "../components/caruosel/Caruosel";
import { getIpAddress } from "../IpAddressUtils";
import SlideRecommender from "../components/sliderecommender/SlideRecommender";
import Header from "../components/header/Header";
import CategoriesList from "../components/categorieslist";
import AddressBottom from "../components/addressBottom";
import jwt_decode from "jwt-decode";

const HomeScreen = () => {

  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const { userId, setUserId } = useContext(UserType);
  const ipAddress = getIpAddress();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);


  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []); 

  const handleDefaultAddressSelection = (address) => {
    setDefaultAddress(address); 
  };

  
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchAddresses();
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 40 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ScrollView>
        <Header setModalVisible={setModalVisible} modalVisible={modalVisible}  />
        {/* <Header setModalVisible={setModalVisible} modalVisible={modalVisible} defaultAddress={defaultAddress} /> */}
        <SlideRecommender Categories={Categories} />
        <CarouselHome />
        <CategoriesList/>
        <AddressBottom setModalVisible={setModalVisible} modalVisible={modalVisible} addresses={addresses} onSelectDefaultAddress={handleDefaultAddressSelection}/>
        </ScrollView>
      </SafeAreaView>
      
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});