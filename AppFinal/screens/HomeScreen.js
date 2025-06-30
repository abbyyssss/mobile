import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const savedCharacters = await AsyncStorage.getItem('@t20_characters');
      if (savedCharacters) {
        setCharacters(JSON.parse(savedCharacters));
      }
    } catch (e) {
      alert('Erro ao carregar personagens: ' + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tormenta 20 - Fichas</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CreateCharacter')}
      >
        <Text style={styles.buttonText}>Criar Novo Personagem</Text>
      </TouchableOpacity>

      <FlatList
        data={characters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.characterCard}
            onPress={() => navigation.navigate('ViewCharacter', { character: item })}
          >
            <Text style={styles.characterName}>{item.nome}</Text>
            <Text style={styles.characterDetails}>
              {item.raca} {item.classe} Nv. {item.nivel}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum personagem criado ainda</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  characterCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  characterDetails: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});