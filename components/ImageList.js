import React from 'react';
import { View, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const ImageList = ({ images, onEndReached, loadingMore, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ImageDetails', { image: item })}
      style={styles.imageContainer}
    >
      <Image source={{ uri: item.webformatURL }} style={styles.image} resizeMode="cover" />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default ImageList;
