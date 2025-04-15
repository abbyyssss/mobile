import React,{Component} from "react";
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Button } from "react-native";
 
class App extends Component{
  render(){
    return(
   <View style={styles.container}>
    <Button title="Clique aqui"
    color='red'
    onProgress={()=>Alert.alert('Você Apertou o botão')}>
 
    </Button>
 
      <TouchableOpacity style={styles.botao}
      onPress={()=>alert('Você apertou o botão')}>

        <Text style={styles.textoBotao}> Enviar </Text>

        </TouchableOpacity>

   </View>
   
    );
  }
}
export default App;
const styles=StyleSheet.create({
  container:{
    flex:1,
    marginTop:50,
    alignItems:'center',
    backgroundColor: '#f0f0f0',
    justifyContent:'center',
    backgroundColor:'#A9A6A7',
  },
  textoBotao:{
    color:'red',
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    justifyContent:'center',
    
  },
})