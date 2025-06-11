import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistemas Operacionais</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="iOS"
          onPress={() => navigation.navigate('IOS')}
          color="#007AFF" 
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Android"
          onPress={() => navigation.navigate('Android')}
          color="#3DDC84" 
        />
      </View>
    </View>
  );
}


function IosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>iOS</Text>
      <Text style={styles.text}>
        O iOS é o sistema operacional da Apple para iPhones e iPads. 
        Conhecido por sua fluidez, segurança e ecossistema integrado.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          color="#007AFF"
        />
      </View>
    </View>
  );
}


function AndroidScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Android</Text>
      <Text style={styles.text}>
        O Android é um sistema baseado em Linux, desenvolvido pelo Google. 
        Open-source, altamente personalizável e usado por diversas marcas.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          color="#3DDC84"
        />
      </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Início' }}
        />
        <Stack.Screen name="IOS" component={IosScreen} />
        <Stack.Screen name="Android" component={AndroidScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    margin: 10,
    width: '80%',
  },
});

export default App;