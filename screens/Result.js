import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';
import Axios from 'axios';

export default function Result({ route, navigation }) {
  const { photo } = route.params
  const [disease, setDisease] = useState('')

  useEffect(() => {
  }, [])

  const analyze = async () => {
    // let b64 = 'data:image/jpeg;base64,' + photo.base64
    // console.log(photo.uri)
    let file = await fetch(photo.uri)
      .then(res => res.blob())
      .then(blob => new File([blob], 'daun.jpg', { type: "image/jpeg" }))
    
    let data = new FormData()
    data.append('image', file, file.name)

    if (true) {
      // console.log(blob.name)
      // await Axios.post('http://35.184.188.47:105/classification', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }).then(res => console.log(res))
      // .catch(err => console.warn(err))
      await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Client-ID 546c25a59c58ad7"
        },
        body: data
      }).then(res => res.text())
      .then(json => console.log(json))
      .catch(err => console.warn(err))
    }

    setDisease('sakit gigi')
  }

  return (
    <View style={styles.container}>
      <Image source={{ ...photo, width: 256, height: 256 }} />
      <Text style={styles.welcome}>
        Nama Penyakit: {disease}
      </Text>
      <Button title="Analyze" onPress={analyze} />
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
