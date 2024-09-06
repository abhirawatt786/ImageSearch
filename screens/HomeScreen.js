import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import ImageList from '../components/ImageList';
import axios from 'axios';

const API_KEY = '45778684-64aebede5d285aba8045fe790'; // Replace with your Pixabay API key

const HomeScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchImages = async (searchQuery, pageNumber = 1) => {
    setLoading(pageNumber === 1);
    setLoadingMore(pageNumber > 1);

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo&per_page=50&page=${pageNumber}`
      );

      if (pageNumber === 1) {
        setImages(response.data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <ImageList images={images} onEndReached={loadMoreImages} loadingMore={loadingMore} navigation={navigation} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
