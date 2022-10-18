import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Appearance
} from 'react-native';
// Components
import NavButton from './NavButton';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
// Styles
import darkMode from '../styles/DarkMode';
const Header = props => {
  const [theme, setTheme] = useState(Appearance.getColorScheme())
  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })
  return (
    <SafeAreaView style={theme== 'light' ? styles.Header : darkMode.Header}>
      <View style={styles.Header_Container}>
        <Image
          source={require('../Assets/logo.png')}
          style={styles.Header_Logo}
        />
        <AntDesign name="search1" size={20} color={"#808080"} />
      </View>
      <View style={styles.Header_Buttons}>
            <NavButton name={'Explore'} currentScreen={props.currentScreen}/>
            <NavButton name={'Repositories'} currentScreen={props.currentScreen}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  Header_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  Header_Logo: {
    width: 100,
    height: 21,
  },
  Header_Buttons: {
    flexDirection: 'row',
    width: '90%',
  },
});

export default Header;
