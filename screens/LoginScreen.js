import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { getIpAddress } from '../IpAddressUtils';

  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const ipAddress = getIpAddress(); 
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
  
          if (token) {
            navigation.replace("Main");
          }
        } catch (err) {
          console.log("error message", err);
        }
      };
      checkLoginStatus();
    }, []);
    const handleLogin = () => {
      const user = {
        email: email,
        password: password,
      };
      axios
        .post(`http://${ipAddress}:8000/login`, user)
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken", token);
          navigation.replace("Main");
        })
        .catch((error) => {
          Alert.alert("Login Error", "Invalid Email");
          console.log(error);
        });
    };
    const handleLogout = async () => {
      // await AsyncStorage.clear();
      logAsyncStorage();
    }
    const logAsyncStorage = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
    
        console.log('AsyncStorage contents:');
        items.forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
        });
      } catch (error) {
        console.error('Error logging AsyncStorage:', error);
      }
    };
    

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        {/* <Text>LoginScreen</Text> */}
        <View>
          <Image
            style={{ width: 300, height: 170 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0IU2sjKXwBONkiU_-d4iAx14GLgZp5Mm7w&s,size=(826,465)",
            }}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Login In to your Account
            </Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                padding: 7,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="Enter Your Email"
              />
            </View>
          </View>
  
          <View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  padding: 7,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="lock1"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 16 : 16,
                  }}
                  placeholder="Enter Your Password"
                />
              </View>
            </View>
          </View>
  
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
  
            <Text
              style={{
                color: "#007FFF",
                fontWeight: 500,
              }}
            >
              Forgot Password
            </Text>
          </View>
          <View
            style={{
              marginTop: 80,
            }}
          />
          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              borderRadius: 6,
            }}
          >
        
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </Pressable>

          {/* <Pressable
            onPress={handleLogout}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </Pressable> */}
  
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 12 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              {" "}
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});
  