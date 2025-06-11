import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoFrase: '',
      img: require('./assets/biscoito.png'),
    };
    this.quebrarBiscoito = this.quebrarBiscoito.bind(this);
    this.frases = [
      'A vida trará coisas boas se tiver paciência.',
      'Dificuldades preparam pessoas comuns para destinos extraordinários.',
      'A vida é feita de escolhas. Escolha viver bem.',
      'Você é do tamanho dos seus sonhos.',
      'Acredite em você e em seus sonhos.',
      'A persistência é o caminho do êxito.',
      'O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.'
    ];
  }

  quebrarBiscoito() {
    // Gera um número aleatório entre 0 e o tamanho do array de frases
    let numeroAleatorio = Math.floor(Math.random() * this.frases.length);
    // Atualiza o estado com uma frase e a imagem do biscoito quebrado
    this.setState({
      textoFrase: this.frases[numeroAleatorio],
      img: require('./assets/biscoitoAberto.png')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.img} style={styles.img} />
        <Text style={styles.textoFrase}>"{this.state.textoFrase}"</Text>
        <TouchableOpacity style={styles.botao} onPress={this.quebrarBiscoito}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>Quebrar Biscoito</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 30
  },
  textoFrase: {
    fontSize: 17,
    color: '#dd7b22',
    textAlign: 'center',
    margin: 30,
    fontStyle: 'italic'
  },
  botao: {
    width: 230,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#dd7b22',
    justifyContent: 'center',
    marginTop: 10
  },
  btnArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTexto: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default App;