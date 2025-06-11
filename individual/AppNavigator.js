import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ProfileScreen from './ProfileScreen';
import ProductsScreen from './ProductsScreen';
import ContactScreen from './ContactScreen';
import CartScreen from './CartScreen';
import HelpScreen from './HelpScreen';
import CustomDrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen name="Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Produtos" component={ProductsScreen} />
        <Drawer.Screen name="Contato" component={ContactScreen} />
        <Drawer.Screen name="Carrinho" component={CartScreen} />
        <Drawer.Screen name="Ajuda" component={HelpScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;