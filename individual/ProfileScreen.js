import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
        style={styles.profileImage}
      />
      <Text style={styles.name}>João Silva</Text>
      <Text style={styles.email}>joao.silva@example.com</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Membro desde: Janeiro 2023</Text>
        <Text style={styles.infoText}>Pedidos realizados: 15</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;