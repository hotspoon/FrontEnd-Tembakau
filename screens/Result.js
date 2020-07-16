import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';
import Axios from 'axios';

function atob(input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  var output = ''
  var chr1, chr2, chr3
  var enc1, enc2, enc3, enc4
  var i = 0
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  do {
      enc1 = keyStr.indexOf(input.charAt(i++))
      enc2 = keyStr.indexOf(input.charAt(i++))
      enc3 = keyStr.indexOf(input.charAt(i++))
      enc4 = keyStr.indexOf(input.charAt(i++))
      chr1 = (enc1 << 2) | (enc2 >> 4)
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
      chr3 = ((enc3 & 3) << 6) | enc4
      output = output + String.fromCharCode(chr1)
      if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2)
      }
      if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3)
      }
  } while (i < input.length)
  return output
}

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

export default function Result({ route, navigation }) {
  const { photo } = route.params
  const [disease, setDisease] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  }, [])

  const isDieseaseExist = () => {
    if (disease) {
      return true
    }

    return false
  }

  const analyze = async () => {
    try {
      setLoading(true)
      let data = new FormData()
      data.append('file', { uri: photo.uri, name: 'daun.jpg', type: 'image/jpeg' }, 'daun.jpg')

      let result = await Axios.post('http://35.184.188.47:105/classification', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => res.data)

      setDisease(result.label)
      setLoading(false)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ ...photo, width: 256, height: 256 }} />
      { loading && <Text style={styles.welcome}>Waiting...</Text> }
      { isDieseaseExist() && <Text style={styles.welcome}>
        Nama Penyakit: {disease}
      </Text> }
      { !isDieseaseExist() && <Button disabled={loading} title="Analyze" onPress={analyze} /> }
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
