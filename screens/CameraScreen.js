import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
// import { atob } from 'Base64'

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false)
  const cameraRef = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true)
      let photo = await cameraRef.current.takePictureAsync({
        base64: true
      })

      setLoading(false)

      navigation.navigate('Result', { photo })
    }
  }

  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      navigation.navigate('Result', { photo: result })
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera ref={cameraRef} style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom: 32,
              backgroundColor: '#035aa6',
              paddingTop: 16,
              paddingBottom: 16,
              marginLeft: 16,
              marginRight: 16
            }}
            disabled={loading}
            onPress={takePicture}>
            { loading 
              ? <Text style={{ color: 'white' }}>Waiting...</Text>
              : <Text style={{ color: 'white' }}>Press to Take</Text>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              marginBottom: 32,
              backgroundColor: '#035aa6',
              paddingTop: 16,
              paddingBottom: 16,
              marginLeft: 16,
              marginRight: 16
            }}
            disabled={loading}
            onPress={pickImage}>
            { loading 
              ? <Text style={{ color: 'white' }}>Waiting...</Text>
              : <Text style={{ color: 'white' }}>From Gallery</Text>
            }
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
