// HomeScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const playlists = [
    {
      id: '1',
      title: 'KALLEDY - Link do Zap',
      description: 'Álbum completo do Link do Zap',
      coverImage: 'https://i.ytimg.com/vi/3JZ_D3LwH10/hqdefault.jpg',
      songs: [
        { id: 's1', title: 'Kalledy', artist: 'Link do Zap', youtubeId: '3JZ_D3LwH10' },
        { id: 's2', title: 'Faz o Pix', artist: 'Link do Zap', youtubeId: 'XqZsoesa55w' },
        { id: 's3', title: 'Tubarão Te Amo', artist: 'Link do Zap', youtubeId: 'e8X3ACToii0' },
        { id: 's4', title: 'Novo Balanço', artist: 'Link do Zap', youtubeId: '8PvebsWcpto' },
        { id: 's5', title: 'Vem Morena', artist: 'Link do Zap', youtubeId: 'J19Zbcp0k1M' },
        { id: 's6', title: 'Toma Toma Vapo Vapo', artist: 'Link do Zap', youtubeId: 'QyQp0GQi4K4' },
        { id: 's7', title: 'Dengo', artist: 'Link do Zap', youtubeId: '1oMkSIiVXm0' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo</Text>
      
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.playlistCard}
            onPress={() => navigation.navigate('Playlist', { playlist: item })}
          >
            <Image source={{ uri: item.coverImage }} style={styles.playlistImage} />
            <Text style={styles.playlistTitle}>{item.title}</Text>
            <Text style={styles.playlistDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 15,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playlistCard: {
    backgroundColor: '#282828',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  playlistImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  playlistTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  playlistDesc: {
    color: '#b3b3b3',
    fontSize: 14,
  },
});

export default HomeScreen;