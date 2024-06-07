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
import Products from "../data";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import ProductComponent from "../components/ProductComponent";
import Categories from "../categories";
import CarouselHome from "../components/caruosel/Caruosel";
import { getIpAddress } from "../IpAddressUtils";
import SlideRecommender from "../components/sliderecommender/SlideRecommender";
import Header from "../components/header";

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
  // const deals = [
  //   {
  //     id: "20",
  //     title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
  //     oldPrice: 25000,
  //     price: 19000,
  //     image:
  //       "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
  //     images: [
  //       "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
  //     ],
  //     color: "Stellar Green",
  //     size: "6 GB RAM 128GB Storage",
  //   },
  //   {
  //     id: "30",
  //     title:
  //       "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
  //     oldPrice: 74000,
  //     price: 26000,
  //     image:
  //       "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
  //     images: [
  //       "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
  //       "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
  //     ],
  //     color: "Cloud Navy",
  //     size: "8 GB RAM 128GB Storage",
  //   },
  //   {
  //     id: "40",
  //     title:
  //       "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
  //     oldPrice: 16000,
  //     price: 14000,
  //     image:
  //       "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
  //     images: [
  //       "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
  //     ],
  //     color: "Icy Silver",
  //     size: "6 GB RAM 64GB Storage",
  //   },
  //   {
  //     id: "50",
  //     title:
  //       "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
  //     oldPrice: 12999,
  //     price: 10999,
  //     image:
  //       "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
  //     images: [
  //       "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
  //       "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
  //       "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
  //     ],
  //   },
  // ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const ipAddress = getIpAddress(); // Get the IP address
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };
    fetchData();
  }, []);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

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
          <Header />
          <SlideRecommender list={list} />
          <CarouselHome />

          {/* <Text
            style={{
              padding: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Trending Deals of the Week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    images: item.images,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
              </Pressable>
            ))}
          </View> */}

          {/* <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          /> */}
          <ScrollView>
            {Categories.map((category, index) => (
              <View key={index}>
                <Text
                  style={{
                    padding: 7,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {category}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {Products.filter(
                    (product) => product.category === Categories[index]
                  ).map((product) => (
                    <ProductComponent
                      key={product.id}
                      navigation={navigation}
                      product={product}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,

                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={item.id} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
        onTouchOutside={() => setModalVisible(!modal)}
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
            {/* alredy added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}
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
                  fontWeight: 500,
                }}
              >
                {" "}
                Add an Address or pick-up point{" "}
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
                Use My Currect location
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
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
