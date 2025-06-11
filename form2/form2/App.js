import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [valorCusto, setValorCusto] = useState('');
  const [valorVenda, setValorVenda] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('CX');
  const [dataCadastro, setDataCadastro] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataCadastro(selectedDate);
    }
  };

  const mostrarInformacoes = () => {
    if (!codigo || !nome || !valorCusto || !valorVenda || !quantidade) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const dataFormatada = dataCadastro.toLocaleDateString('pt-BR');
    
    Alert.alert(
      'Dados do Produto',
      `Código: ${codigo}\nNome: ${nome}\nValor Custo: R$ ${valorCusto}\nValor Venda: R$ ${valorVenda}\nQuantidade: ${quantidade}\nTipo: ${tipo}\nData Cadastro: ${dataFormatada}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Valor de Custo"
        keyboardType="numeric"
        value={valorCusto}
        onChangeText={setValorCusto}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Valor de Venda"
        keyboardType="numeric"
        value={valorVenda}
        onChangeText={setValorVenda}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />
      
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Tipo:</Text>
        <Picker
          selectedValue={tipo}
          style={styles.picker}
          onValueChange={(itemValue) => setTipo(itemValue)}>
          <Picker.Item label="Caixa (CX)" value="CX" />
          <Picker.Item label="Unidade (UN)" value="UN" />
          <Picker.Item label="Lote (LT)" value="LT" />
        </Picker>
      </View>
      
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Data de Cadastro:</Text>
        <Button 
          title={dataCadastro.toLocaleDateString('pt-BR')} 
          onPress={() => setShowDatePicker(true)} 
        />
      </View>
      
      {showDatePicker && (
        <DateTimePicker
          value={dataCadastro}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      
      <Button
        title="Mostrar Informações"
        onPress={mostrarInformacoes}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});