import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const orders = await AsyncStorage.getItem('orders');
      const parsedOrders = orders ? JSON.parse(orders) : [];
      setOrders(parsedOrders);
    } catch (error) {
      console.log('Error fetching orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.orderTitle}>Order History</Text>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <TouchableOpacity key={index} style={styles.orderContainer} activeOpacity={0.8}>
            <Text style={[styles.orderText, styles.orderNumber]}>Order #{index + 1}</Text>
            <Text style={styles.orderText}>Total: ${order.totalPrice}</Text>
            <Text style={styles.orderText}>Address: {order.shippingAddress.street}</Text>
            <Text style={styles.orderText}>Payment Method: {order.paymentMethod}</Text>
            <Text style={[styles.orderText, styles.itemsTitle]}>Items:</Text>
            {order.cartItems.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.cartItem}>
                <Text style={styles.cartItemText}>{item.title}</Text>
                <Text style={styles.cartItemText}>Quantity: {item.quantity}</Text>
                <Text style={styles.cartItemText}>Price: ${item.price}</Text>
              </View>
            ))}
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noOrdersText}>No orders found</Text>
      )}
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  orderTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000', 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderContainer: {
    backgroundColor: '#F0F0F0', 
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    marginTop: 10, 
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333', 
  },
  orderNumber: {
    textDecorationLine: 'underline', 
  },
  itemsTitle: {
    marginTop: 12,
    fontWeight: 'bold',
    color: '#000000', 
  },
  cartItem: {
    marginLeft: 20,
    marginTop: 1,
  },
  cartItemText: {
    fontSize: 15,
    color: '#666666', 
  },
  noOrdersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#333333', 
  },
});
