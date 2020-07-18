import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function HomeScreen({ navigation }) {
  const toCamera = () => navigation.navigate('Camera')
  const toResultList = () => navigation.navigate('Result List')
  
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        navigation.navigate('Result', { photo: result })
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.mainFeature} onPress={toCamera}>
        <Image style={{ height: 96, width: 96 }} source={require('../assets/camera.png')} />
        <Text style={styles.featureTitle}>Kamera</Text>
      </TouchableOpacity> 
      <View style={styles.bottomFeatures}>
        <TouchableOpacity onPress={pickImage}>
          <Image style={{ height: 80, width: 80 }} source={require('../assets/upload.png')} />
          <Text style={styles.featureTitle}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toResultList}>
          <Image style={{ height: 80, width: 80 }} source={require('../assets/result.png')} />
          <Text style={styles.featureTitle}>Hasil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#CDF5D1',
  },
  featureTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  mainFeature: {
    top: 100
  },
  bottomFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    bottom: 20
  }
});
