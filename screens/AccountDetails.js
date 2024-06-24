import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import initialState from "../reducer"; 

const AccountDetails = () => {
  const user = initialState.user;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>Phone: {user.phone}</Text>
        <Text style={styles.gender}>Gender: {user.gender}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Addresses</Text>
        {user.addresses.map((address) => (
          <View key={address.id} style={styles.addressItem}>
            <Text style={styles.addressName}>{address.name}</Text>
            <Text>{address.street}</Text>
            <Text>
              {address.city}, {address.state} {address.zip}
            </Text>
            <Text>{address.country}</Text>
            {address.isDefault && (
              <Text style={styles.defaultAddress}>Default Address</Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        {user.paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodItem}>
            <Text style={styles.paymentMethodType}>{method.type}</Text>
            <Text>Last 4 digits: {method.last4}</Text>
            <Text>Expiration: {method.expiration}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    marginTop: 40,
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    marginBottom: 5,
  },
  gender: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressItem: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addressName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  defaultAddress: {
    color: "green",
    marginTop: 5,
  },
  paymentMethodItem: {
    borderWidth: 1,
    borderColor: "#d0d0d0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  paymentMethodType: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default AccountDetails;
