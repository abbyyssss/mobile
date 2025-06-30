import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ViewCharacter({ route }) {
  const { character } = route.params;

  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ficha do Personagem</Text>
      
      {/* Informações Básicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Básicas</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{character.nome}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Classe:</Text>
          <Text style={styles.value}>{character.classe}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Raça:</Text>
          <Text style={styles.value}>{character.raca}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nível:</Text>
          <Text style={styles.value}>{character.nivel}</Text>
        </View>
      </View>

      {/* Atributos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atributos</Text>
        <View style={styles.attributesGrid}>
          {Object.entries(character.atributos).map(([attr, value]) => (
            <View key={attr} style={styles.attributeBox}>
              <Text style={styles.attributeName}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}
              </Text>
              <Text style={styles.attributeValue}>{value}</Text>
              <Text style={styles.attributeMod}>
                {calculateModifier(value) >= 0 ? '+' : ''}{calculateModifier(value)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Outras Informações */}
      {character.habilidades && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <Text style={styles.textBlock}>{character.habilidades}</Text>
        </View>
      )}

      {character.equipamentos && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipamentos</Text>
          <Text style={styles.textBlock}>{character.equipamentos}</Text>
        </View>
      )}

      {character.historia && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>História</Text>
          <Text style={styles.textBlock}>{character.historia}</Text>
        </View>
      )}
    </ScrollView>
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
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2e7d32',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    width: '30%',
  },
  value: {
    width: '70%',
    color: '#333',
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  attributeBox: {
    width: '48%',
    backgroundColor: '#e8f5e9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  attributeName: {
    fontWeight: 'bold',
    color: '#2e7d32',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  attributeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  attributeMod: {
    fontSize: 16,
    color: '#388e3c',
  },
  textBlock: {
    color: '#333',
    lineHeight: 22,
  },
});