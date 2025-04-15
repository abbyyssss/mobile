import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Image 
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/149/149852.png'}} 
          style={styles.searchIcon}
        />
        <Text style={styles.headerText}>Lol Skins</Text>
      </View>

      
      <View style={styles.body}>
      
        <View style={styles.row}>
          <View style={styles.card}>
            <Image 
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3pzh5is73Wgi50fElXi8z0ejUlIcF2CYTUA&s'}} 
              style={styles.image}
            />
            <Text style={styles.text}>Certamente não é o blitzcrank</Text>
          </View>
          <View style={styles.card}>
            <Image 
              source={{uri: 'https://i.pinimg.com/736x/f7/f4/f6/f7f4f6c468c0006c152267ef2daade7b.jpg'}} 
              style={styles.image}
            />
            <Text style={styles.text}>Yasuo florescer Espiritual (muito foda!!!!)</Text>
          </View>
        </View>

       
        <View style={styles.row}>
          <View style={styles.card}>
            <Image 
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9k81g7cvpCPhAeMl-_vaG8TnMc--3jacWWg&s'}} 
              style={styles.image}
            />
            <Text style={styles.text}>Draven Draven</Text>
          </View>
          <View style={styles.card}>
            <Image 
              source={{uri: 'https://assets.gamearena.gg/wp-content/uploads/2024/09/23171737/Teemo-Duende-feliz-pre-att-2024-1024x604.jpg'}} 
              style={styles.image}
            />
            <Text style={styles.text}>Teemo na neve</Text>
          </View>
        </View>
      </View>

     
      <View style={styles.footer}>
        <Text style={styles.footerText}>Kauan | SENAC | 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff'
  },
  header: {
    height: 60,
    backgroundColor: '#4682b4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: 'white'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginBottom: 5
  },
  text: {
    fontSize: 14
  },
  footer: {
    height: 50,
    backgroundColor: '#4682b4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: 'white',
    fontSize: 14
  }
});