// PlaylistScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Linking } from 'react-native';

const PlaylistScreen = () => {
  const route = useRoute();
  const { playlist } = route.params;

  const playSong = (youtubeId) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${youtubeId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.playlistHeader}>
        <Image source={{ uri: playlist.coverImage }} style={styles.headerImage} />
        <Text style={styles.playlistName}>{playlist.title}</Text>
        <Text style={styles.playlistInfo}>{playlist.songs.length} músicas</Text>
      </View>
      
      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.songItem}
            onPress={() => playSong(item.youtubeId)}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.songArtist}>{item.artist}</Text>
            </View>
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
  },
  playlistHeader: {
    padding: 20,
    alignItems: 'center',
  },
  headerImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
  },
  playlistName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playlistInfo: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: 'white',
    fontSize: 16,
  },
  songArtist: {
    color: '#b3b3b3',
    fontSize: 14,
  },
});

export default PlaylistScreen;