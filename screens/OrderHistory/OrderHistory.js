import React, { useEffect, useState } from 'react';
import { Text, ScrollView, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './OrderHistoryStyles'; // Import styles from separate file

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
