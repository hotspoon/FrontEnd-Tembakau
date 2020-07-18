import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import CameraScreen from './screens/CameraScreen'
import Result from './screens/Result';
import ResultList from './screens/ResultList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Result List" component={ResultList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}