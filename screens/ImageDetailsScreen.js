import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ImageDetailsScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: image.largeImageURL }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{image.tags}</Text>
      <Text style={styles.details}>User: {image.user}</Text>
      <Text style={styles.details}>Likes: {image.likes}</Text>
      <Text style={styles.details}>Downloads: {image.downloads}</Text>
      <Text style={styles.details}>Views: {image.views}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ImageDetailsScreen;
