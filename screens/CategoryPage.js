import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Categories from '../Categories'; // Adjust based on your project structure
import CategoryProduct from '../components/CategoryProduct'; // Adjust based on your project structure
import Products from '../data'; // Adjust based on your project structure
import Header from "../components/header/Header"; // Adjust based on your project structure
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryPage = ({ route }) => {
  const { index } = route.params;
  const [sortBy, setSortBy] = useState('rating-high');
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    discount: [],
    price: [0, 0]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showSortByModal, setShowSortByModal] = useState(false);

  const handleDefaultAddressSelection = (address) => {
    setDefaultAddress(address); 
  };

  useEffect(() => {
    const categoryProducts = Products.filter(product => product.category === Categories[index].name);
    const maxPriceValue = Math.ceil(Math.max(...categoryProducts.map(product => product.price)) / 100) * 100;
    setMaxPrice(maxPriceValue);
    setFilters(prevFilters => ({ ...prevFilters, price: [0, maxPriceValue] }));
    setProducts(categoryProducts); // Initialize products with all products in the category
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    let newFilters = { ...filters };
    if (filterType === 'discount') {
      const updatedDiscounts = newFilters.discount.includes(value)
        ? newFilters.discount.filter(discount => discount !== value)
        : [...newFilters.discount, value];
      newFilters.discount = updatedDiscounts;
    } else if (filterType === 'price') {
      newFilters.price = value;
    }
    setFilters(newFilters);
  };

  const applyFilters = () => {
    let filteredProducts = Products.filter(product => product.category === Categories[index].name);

    if (filters.discount.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const discountPercentage = getDiscountPercentage(product.price, product.mrp);
        return filters.discount.some(option => discountPercentage >= option);
      });
    }

    filteredProducts = filteredProducts.filter(product => {
      return product.price >= filters.price[0] && product.price <= filters.price[1];
    });

    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'rating-high':
          return b.rating - a.rating;
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        case 'most-reviews':
          return b.reviews.length - a.reviews.length;
        case 'least-reviews':
          return a.reviews.length - b.reviews.length;
        case 'discount-high':
          return getDiscountPercentage(b.price, b.mrp) - getDiscountPercentage(a.price, a.mrp);
        case 'discount-low':
          return getDiscountPercentage(a.price, a.mrp) - getDiscountPercentage(b.price, b.mrp);
        default:
          return 0;
      }
    });

    setProducts(filteredProducts);
  };

  const getDiscountPercentage = (price, mrp) => {
    const discount = ((mrp - price) / mrp) * 100;
    return Math.round(discount);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleSortByModal = () => {
    setShowSortByModal(!showSortByModal);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? 40 : 0,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <Header />
        </SafeAreaView>

        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSortByModal} style={styles.sortByContainer}>
            <Text style={styles.sortByText}>Sort By: {sortByLabelMapping[sortBy]}</Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilters} style={styles.filtersButton}>
            <Text style={styles.filterText}>Filters</Text>
            <Ionicons name="filter-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showSortByModal}
          onRequestClose={() => {
            setShowSortByModal(!showSortByModal);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBackground} onPress={toggleSortByModal} />
            <View style={styles.modalContent}>
              <Picker
                style={styles.picker}
                selectedValue={sortBy}
                onValueChange={(itemValue) => {
                  setSortBy(itemValue);
                  toggleSortByModal();
                }}
              >
                <Picker.Item label="Highest Rating" value="rating-high" />
                <Picker.Item label="Price High to Low" value="price-high" />
                <Picker.Item label="Price Low to High" value="price-low" />
                <Picker.Item label="Most Reviews" value="most-reviews" />
                <Picker.Item label="Least Reviews" value="least-reviews" />
                <Picker.Item label="Discount High to Low" value="discount-high" />
                <Picker.Item label="Discount Low to High" value="discount-low" />
              </Picker>
            </View>
          </View>
        </Modal>

        {showFilters && (
          <View style={styles.filterOptions}>
            <Text style={styles.filterHeading}>Discount</Text>
            <View style={styles.checkboxContainer}>
              {[10, 20, 30, 40].map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleFilterChange('discount', option)}
                  style={[styles.checkbox, filters.discount.includes(option) && styles.checked]}
                >
                  <Text>{option}% or more</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={applyFilters} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.productList}>
          {products.map(product => (
            <View key={product.id} style={styles.categoryItems}>
              <CategoryProduct
                id={product.id}
                title={product.title}
                image={product.images[0]}
                price={product.price}
                rating={product.rating}
                mrp={product.mrp}
                reviews={product.reviews}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const sortByLabelMapping = {
  'rating-high': 'Highest Rating',
  'price-high': 'Price High to Low',
  'price-low': 'Price Low to High',
  'most-reviews': 'Most Reviews',
  'least-reviews': 'Least Reviews',
  'discount-high': 'Discount High to Low',
  'discount-low': 'Discount Low to High',
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  picker: {
    width: '100%',
  },
  filterOptions: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  checked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productList: {
    paddingHorizontal: 10,
  },
  categoryItems: {
    marginBottom: 10,
  },
});

export default CategoryPage;
