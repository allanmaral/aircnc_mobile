import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);
  
  useEffect(() => {
    async function loadSpots() {
      const resonse = await api.get('/spots', {
        params: { tech }
      });
      setSpots(resonse.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
      
      <FlatList 
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{ item.company }</Text>
            <Text style={styles.price}>{ (item.price && item.price > 0) ? `R$ ${item.price}/dia` : 'GRATUITO' }</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15
  },

  title: {
    fontSize: 18,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15
  },

  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20
  },

  listItem: {
    marginRight: 15
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default withNavigation(SpotList);