import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Image, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png';

function List({ navigation }) {
  const [techs, setTechs] = useState([]);
  
  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageText => {
      const techsArray = storageText.split(',').map(text => text.trim());
      setTechs(techsArray);
    }).catch(err => {
      console.log(err);
      setTechs([]);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {
          techs.map( techName => <SpotList key={techName} tech={techName} /> )
        }
        <Text onPress={handleLogout} style={styles.logout}>Sair</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10
  },

  logout: {
    fontSize: 18,
    color: '#f05a5b',
    alignSelf: 'center',
    marginVertical : 30
  }
});

export default List;