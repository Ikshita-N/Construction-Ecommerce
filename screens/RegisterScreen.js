import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getIpAddress } from '../IpAddressUtils'; // Ensure this utility is implemented to get the IP address

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const ipAddress = await getIpAddress(); // Ensure IP address is fetched correctly
      const user = { name, email, password };
      console.log(user);

      const response = await axios.post(`http://${ipAddress}:8000/register`, user);
      console.log(response.data);

      Alert.alert(
        "Registration successful",
        "You have been registered Successfully"
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log("Error response:", error.response.data);
        Alert.alert("Registration Error", error.response.data.message || "An error occurred while registering");
      } else if (error.request) {
        // Request was made but no response received
        console.log("Error request:", error.request);
        Alert.alert("Registration Error", "No response from server");
      } else {
        // Something else happened while setting up the request
        console.log("Error message:", error.message);
        Alert.alert("Registration Error", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj0IU2sjKXwBONkiU_-d4iAx14GLgZp5Mm7w&s,size=(826,465)",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Register to your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons style={styles.icon} name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Enter Your Name"
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter Your Email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Enter Your Password"
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={styles.signInLink}>
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 170,
  },
  header: {
    alignItems: "center",
    marginVertical: 12,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#041E42",
  },
  inputContainer: {
    marginTop: 35,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    padding: 7,
    borderRadius: 5,
    marginVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: "gray",
    width: 300,
    fontSize: 16,
  },
  footer: {
    marginTop: 80,
    alignItems: "center",
  },
  registerButton: {
    width: 200,
    backgroundColor: "#FEBE10",
    padding: 15,
    borderRadius: 6,
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInLink: {
    marginTop: 12,
  },
  signInText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
});
