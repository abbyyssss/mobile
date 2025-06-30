import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dados pré-definidos do Tormenta 20
const RACAS = [
  'Humano', 'Anão', 'Dahllan', 'Elfo', 'Goblin', 
  'Lefou', 'Minotauro', 'Qareen', 'Golem', 'Hynne', 
  'Kliren', 'Medusa', 'Osteon', 'Sereia/Tritão', 'Sílfide', 
  'Suraggel', 'Trog'
];

const CLASSES = [
  'Guerreiro', 'Bárbaro', 'Bardo', 'Bucaneiro', 'Caçador',
  'Clérigo', 'Druida', 'Inventor', 'Ladino', 'Lutador',
  'Nobre', 'Paladino', 'Arcanista', 'Feiticeiro'
];

const BONUS_RACA = {
  'Humano': { qualquer: 1 },
  'Anão': { constituicao: 2, sabedoria: 2, carisma: -2 },
  'Elfo': { destreza: 2, inteligencia: 2, constituicao: -2 },
  'Goblin': { destreza: 2, inteligencia: 2, forca: -2 },
  'Minotauro': { forca: 2, constituicao: 2, inteligencia: -2 },
  'Qareen': { carisma: 2, inteligencia: 2, constituicao: -2 },
  'Lefou': { qualquer: 1, qualquer2: 1, carisma: -2 }
};

export default function CreateCharacter({ navigation }) {
  const [character, setCharacter] = useState({
    nome: '',
    classe: '',
    raca: '',
    nivel: '1',
    pontosVida: '12',
    pontosMana: '0',
    atributos: { 
      forca: 10, 
      destreza: 10, 
      constituicao: 10, 
      inteligencia: 10, 
      sabedoria: 10, 
      carisma: 10 
    },
    habilidades: '',
    equipamentos: '',
    historia: ''
  });

  const [pontosDisponiveis, setPontosDisponiveis] = useState(10);
  const [initialLoad, setInitialLoad] = useState(true);

  // Atualiza atributos quando raça é selecionada
  useEffect(() => {
    if (character.raca && !initialLoad) {
      const bonus = BONUS_RACA[character.raca] || {};
      const novosAtributos = { 
        forca: 10, 
        destreza: 10, 
        constituicao: 10, 
        inteligencia: 10, 
        sabedoria: 10, 
        carisma: 10 
      };
      
      // Aplica bônus raciais
      Object.keys(novosAtributos).forEach(atr => {
        if (bonus[atr]) {
          novosAtributos[atr] += bonus[atr];
        }
      });

      // Aplica bônus "qualquer"
      if (bonus.qualquer) {
        const atributosOrdenados = Object.keys(novosAtributos)
          .sort((a, b) => novosAtributos[a] - novosAtributos[b]);
        
        for (let i = 0; i < (bonus.qualquer || 0); i++) {
          if (atributosOrdenados[i]) {
            novosAtributos[atributosOrdenados[i]] += 1;
          }
        }
      }

      setCharacter(prev => ({
        ...prev,
        atributos: novosAtributos
      }));
      
      // Reseta pontos ao mudar raça
      setPontosDisponiveis(10);
    }
    setInitialLoad(false);
  }, [character.raca]);

  const handleSave = async () => {
    // Validação
    if (!character.nome) {
      Alert.alert('Atenção', 'Digite o nome do personagem!');
      return;
    }
    if (!character.classe) {
      Alert.alert('Atenção', 'Selecione uma classe!');
      return;
    }
    if (!character.raca) {
      Alert.alert('Atenção', 'Selecione uma raça!');
      return;
    }
    if (pontosDisponiveis > 0) {
      Alert.alert(
        'Pontos não distribuídos', 
        `Você ainda tem ${pontosDisponiveis} pontos de atributo para distribuir!`
      );
      return;
    }

    try {
      // Calcula pontos de vida baseado na constituição
      const constituicaoMod = Math.floor((character.atributos.constituicao - 10) / 2);
      const pontosVidaCalculados = 12 + constituicaoMod + (parseInt(character.nivel) - 1);

      const characterToSave = {
        ...character,
        pontosVida: pontosVidaCalculados.toString(),
        dataCriacao: new Date().toISOString()
      };

      const savedCharacters = await AsyncStorage.getItem('@t20_characters');
      const charactersList = savedCharacters ? JSON.parse(savedCharacters) : [];
      
      charactersList.push(characterToSave);
      await AsyncStorage.setItem('@t20_characters', JSON.stringify(charactersList));
      
      Alert.alert(
        'Sucesso!', 
        `Personagem ${character.nome} criado com sucesso!`,
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar o personagem: ' + e.message);
    }
  };

  const aumentarAtributo = (atributo) => {
    if (pontosDisponiveis <= 0) {
      Alert.alert('Atenção', 'Você não tem mais pontos para distribuir!');
      return;
    }
    
    setCharacter(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [atributo]: prev.atributos[atributo] + 1
      }
    }));
    
    setPontosDisponiveis(prev => prev - 1);
  };

  const diminuirAtributo = (atributo) => {
    if (character.atributos[atributo] <= 10) {
      Alert.alert('Atenção', 'Não é possível reduzir abaixo de 10!');
      return;
    }
    
    setCharacter(prev => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [atributo]: prev.atributos[atributo] - 1
      }
    }));
    
    setPontosDisponiveis(prev => prev + 1);
  };

  const calcularModificador = (valor) => {
    const mod = Math.floor((valor - 10) / 2);
    return mod >= 0 ? `+${mod}` : mod;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Criar Personagem - Tormenta 20</Text>

      {/* Seção: Informações Básicas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações Básicas</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome do Personagem*"
          value={character.nome}
          onChangeText={text => setCharacter({...character, nome: text})}
        />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Classe*</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={character.classe}
              style={styles.picker}
              onValueChange={itemValue => setCharacter({...character, classe: itemValue})}>
              <Picker.Item label="Selecione uma classe" value="" />
              {CLASSES.map(classe => (
                <Picker.Item key={classe} label={classe} value={classe} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Raça*</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={character.raca}
              style={styles.picker}
              onValueChange={itemValue => setCharacter({...character, raca: itemValue})}>
              <Picker.Item label="Selecione uma raça" value="" />
              {RACAS.map(raca => (
                <Picker.Item key={raca} label={raca} value={raca} />
              ))}
            </Picker>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={[styles.inputContainer, {width: '48%'}]}>
            <Text style={styles.label}>Nível</Text>
            <TextInput
              style={styles.input}
              value={character.nivel}
              onChangeText={text => setCharacter({...character, nivel: text.replace(/[^0-9]/g, '')})}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
      </View>

      {/* Seção: Atributos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atributos</Text>
        <Text style={[styles.pointsInfo, pontosDisponiveis > 0 && styles.pointsWarning]}>
          Pontos disponíveis: {pontosDisponiveis}
        </Text>
        
        <View style={styles.attributesContainer}>
          {Object.entries(character.atributos).map(([attr, value]) => (
            <View key={attr} style={styles.attributeCard}>
              <Text style={styles.attributeLabel}>
                {attr.charAt(0).toUpperCase() + attr.slice(1)}
              </Text>
              
              <View style={styles.attributeValueContainer}>
                <TouchableOpacity 
                  style={styles.attributeButton}
                  onPress={() => diminuirAtributo(attr)}
                  disabled={value <= 10}
                >
                  <Text style={[
                    styles.attributeButtonText,
                    value <= 10 && styles.disabledButton
                  ]}>-</Text>
                </TouchableOpacity>
                
                <View style={styles.attributeMainValue}>
                  <Text style={styles.attributeValue}>{value}</Text>
                  <Text style={styles.attributeMod}>
                    {calcularModificador(value)}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.attributeButton}
                  onPress={() => aumentarAtributo(attr)}
                  disabled={pontosDisponiveis <= 0}
                >
                  <Text style={[
                    styles.attributeButtonText,
                    pontosDisponiveis <= 0 && styles.disabledButton
                  ]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Seção: Detalhes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes</Text>
        
        <Text style={styles.label}>Habilidades Especiais</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Descreva as habilidades do personagem"
          value={character.habilidades}
          onChangeText={text => setCharacter({...character, habilidades: text})}
          multiline
        />
        
        <Text style={styles.label}>Equipamentos</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Liste os equipamentos do personagem"
          value={character.equipamentos}
          onChangeText={text => setCharacter({...character, equipamentos: text})}
          multiline
        />
        
        <Text style={styles.label}>História</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Descreva a história do personagem"
          value={character.historia}
          onChangeText={text => setCharacter({...character, historia: text})}
          multiline
        />
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Salvar Personagem</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e7d32',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2e7d32',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
    color: '#555',
    fontWeight: '500',
    fontSize: 14,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  pointsInfo: {
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2e7d32',
  },
  pointsWarning: {
    color: '#d32f2f',
  },
  attributesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  attributeCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  attributeLabel: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  attributeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attributeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  disabledButton: {
    opacity: 0.5,
  },
  attributeMainValue: {
    alignItems: 'center',
  },
  attributeValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  attributeMod: {
    fontSize: 14,
    color: '#388e3c',
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});