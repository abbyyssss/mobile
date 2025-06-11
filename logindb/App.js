import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { initDatabase, cadastrarUsuario, loginUsuario } from './database.js';

export default function App() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    initDatabase()
      .then(() => console.log("Banco de dados inicializado."))
      .catch(err => console.error("Erro ao iniciar DB:", err));
  }, []);

  const handleCadastro = async () => {
    if (!nome || !senha) {
      Alert.alert("Campos obrigatórios", "Preencha nome e senha.");
      return;
    }

    try {
      await cadastrarUsuario(nome, senha);
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      setNome('');
      setSenha('');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  const handleLogin = async () => {
    try {
      const logado = await loginUsuario(nome, senha);
      if (logado) {
        Alert.alert("Login bem-sucedido", `Bem-vindo, ${nome}!`);
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login/Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleCadastro} color="#28a745" />
        <Button title="Login" onPress={handleLogin} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#343a40',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
