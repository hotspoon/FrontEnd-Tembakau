import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';

export default function Result({ route, navigation }) {
  const { photo } = route.params

  useEffect(() => {
    console.log(photo)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={{ ...photo, width: 256, height: 256 }} />
      <Text style={styles.welcome}>
        Nama Penyakit: sakit gigi
      </Text>
      <Text>
        Persentase Akurasi: 98%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
