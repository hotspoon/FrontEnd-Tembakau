import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResultList({ route, navigation }) {
  return <View style={styles.container}>
    <ScrollView>
      <View style={styles.itemContainer}>
        <Image style={{ height: 48, width: 48 }} source={require('../assets/example.jpg')} />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ marginBottom: 4 }}>Penyakit terdeteksi: </Text>
          <Text style={{ fontWeight: 'bold' }}>Bercak Karat</Text>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <Image style={{ height: 48, width: 48 }} source={require('../assets/example.jpg')} />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ marginBottom: 4 }}>Penyakit terdeteksi: </Text>
          <Text style={{ fontWeight: 'bold' }}>Bercak Karat</Text>
        </View>
      </View>
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CDF5D1',
    flex: 1,
    padding: 16,
    flexDirection: 'column'
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8
  }
})