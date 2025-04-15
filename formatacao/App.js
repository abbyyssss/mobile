import React,{Component} from "react";
import {View, Text, Image} from "react-native";
class App extends Component{
render(){
  return(
    <View>
      <Text style={{color:'red',fontSize:25,margin:15,
        fontWeight:'bold',//negrito
        fontStyle:'italic', //italico
        fontFamily:'Arial',//fonte
        textAlign:'center', //centralizar
        lineHeight:35,//altura da linha
        letterSpacing:2,//epaçamento entre as letras
        textDecorationLine:'underline', //adiciona uma linha sublinhada
        textDecorationStyle:'dotted',//estilo do sublinhado
        textDecorationColor:'#00ff00',//cor do sublinado
        textTransform:'uppercase',//todo texto em maiúscula
        textShadowColor:'#000000',//Cor de sombra
        textShadowOffset:{width:2,height:2},//Deslocamento da sombra
        textShadowRadius:3
      }}>
        Olá mundo!!!!!
      </Text>
      <Image
      source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3pzh5is73Wgi50fElXi8z0ejUlIcF2CYTUA&s'}}
      style={{width:300, height:300, marginBottom:20}}>
      </Image>

      <Image
      source={require('./assets/certamente.png')}
      style={{width:300, height:300}}>
      </Image>

    </View>
  );
}
}
export default App;