import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';


export default function App() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Kauan Matheus Carvaalho do Vale Quaresma</Text>
      <Text>(13) 98870-4605 | kauanmcvq@gmail.com</Text>
      <Text>Santos - São Paulo</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Objetivo</Text>
      <Text>Primeiro emprego para ganhar experiência</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Formação</Text>
      <Text>Ensino Médio - Primo Ferreira (2024)</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Habilidades</Text>
      <Text>- Comunicação</Text>
      <Text>- Organização</Text>
    </View>
  );
}