import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import CreateCharacter from './screens/CreateCharacter.js';
import ViewCharacter from './screens/ViewCharacter.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Criador de Fichas RPG' }} 
        />
        <Stack.Screen 
          name="CreateCharacter" 
          component={CreateCharacter} 
          options={{ title: 'Criar Personagem' }} 
        />
        <Stack.Screen 
          name="ViewCharacter" 
          component={ViewCharacter} 
          options={{ title: 'Ficha do Personagem' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}