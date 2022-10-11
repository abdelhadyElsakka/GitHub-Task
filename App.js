import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Screens 

import MainScreen from './Screens/MainScreen';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
       <MainScreen></MainScreen>
  )
}




export default App;
