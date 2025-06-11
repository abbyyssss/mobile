import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const products = [
  { id: '1', name: 'Smartphone X', price: 'R$ 2.499,99', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Notebook Pro', price: 'R$ 4.999,99', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Fones Bluetooth', price: 'R$ 299,99', image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Smartwatch', price: 'R$ 899,99', image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Tablet', price: 'R$ 1.599,99', image: 'https://via.placeholder.com/150' },
];

const ProductsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossos Produtos</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  productCard: {
    width: 160,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
});

export default ProductsScreen;