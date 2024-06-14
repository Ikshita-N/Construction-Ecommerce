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
import Categories from "../categories";
import CarouselHome from "../components/caruosel/Caruosel";
import { getIpAddress } from "../IpAddressUtils";
import SlideRecommender from "../components/sliderecommender/SlideRecommender";
import Header from "../components/header/Header";
import CategoriesList from "../components/categorieslist";
import AddressBottom from "../components/addressBottom";

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      images: ["https://m.media-amazon.com/images/I/714rkFrqqXL._SX450_.jpg"],
      name: "Drills",
    },
    {
      id: "1",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKS2m60i8MP1TW1jFSscKzFIXPMISaxt6g8g&s",
      ],
      name: "Panels",
    },
    {
      id: "3",
      images: [
        "https://cpimg.tistatic.com/05198619/b/4/Black-HDPE-Water-Pipe.jpg",
      ],
      name: "Pipes",
    },
    {
      id: "4",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-IWm6NPWKgErHHczPgyjAHpQrnqWEnCVPg&s",
      ],
      name: "Sheets",
    },
    {
      id: "5",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR11nYPMIPm-U8Ry8wVDPgnWHcPCM1DGMou6w&s",
      ],
      name: "Rods",
    },
    {
      id: "6",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDYJZB8MWseh2poK_gv2g3fak3mw_GAvOc7Q&s",
      ],
      name: "Paints",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const ipAddress = getIpAddress();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);


  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []); 

  const handleDefaultAddressSelection = (address) => {
    // Handle the selection of the default address here
    setDefaultAddress(address); // Assuming you want to set the selected address as the default address
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
        <SlideRecommender list={list} />
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