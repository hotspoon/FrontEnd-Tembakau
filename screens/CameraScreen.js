import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
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
      let photo = await cameraRef.current.takePictureAsync()
      let data = new FormData()
      data.append('file', photo)

      // alamatAPI gantien alamat endpoint tekan beni engkok
      await axios.post('alamatAPI', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        // iki hasil e, tampilno nengdi ngunu engkok ris
        console.log(res.data)
      })
    }
  }

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
            onPress={takePicture}>
            <Text style={{ color: 'white' }}>Press to Take</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
