import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.drawerSection}>
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Text style={styles.drawerItemText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Produtos')}
        >
          <Text style={styles.drawerItemText}>Produtos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Contato')}
        >
          <Text style={styles.drawerItemText}>Contato</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Text style={styles.drawerItemText}>Carrinho</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Ajuda')}
        >
          <Text style={styles.drawerItemText}>Ajuda</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;