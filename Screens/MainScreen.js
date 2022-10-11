import React, {useState} from 'react';
import {SafeAreaView, Appearance, StyleSheet} from 'react-native';
import ExploreScreen from './ExploreScreen';
import RepositoriesScreen from './RepositoriesScreen';
import Header from '../Components/Header';

import darkMode from '../styles/DarkMode';

const MainScreen = () => {
  const [selected, setSelected] = useState('Explore');

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  const handleClick = screen => {
    setSelected(screen);
  };

  return (
    <SafeAreaView style={theme == 'light' ? styles.MainScreen_Background : darkMode.MainScreen_Background}>
      <Header screens={['Explore', 'Repositories']} handleClick={handleClick} />
      {selected == 'Explore' ? (
        <ExploreScreen></ExploreScreen>
      ) : (
        <RepositoriesScreen></RepositoriesScreen>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  MainScreen_Background:{
    backgroundColor:'#fbfcfe',
    height:'100%',
    width:'100%'
  }
}) 

export default MainScreen;
