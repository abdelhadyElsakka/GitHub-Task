import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Appearance
} from 'react-native';

// Icons

import AntDesign from 'react-native-vector-icons/AntDesign';

// Styles

import darkMode from '../styles/DarkMode';

const Header = props => {
  const [selected, setSelected] = useState(props.screens[0]);

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
        <AntDesign name="search1" size={20} color={(theme== 'light' ? "#222222" : "#fff")} />
      </View>
      <View style={styles.Header_Buttons}>
        {props.screens.map((screen, i) => {
          return (
            <Pressable
              onPress={() => {
                setSelected(screen);
                props.handleClick(screen);
              }}
              key={i}>
              <Text
                style={
                  selected == screen
                    ? (theme== 'light' ? styles.Header_ButtonSelected : darkMode.Header_ButtonSelected)
                    : (theme== 'light' ? styles.Header_ButtonNotSelected : darkMode.Header_ButtonNotSelected)
                }>
                {screen}
              </Text>
            </Pressable>
          );
        })}
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
  Header_ButtonSelected: {
    borderBottomWidth: 2,
    borderColor: '#6cdab9',
    paddingBottom: 15,
    color: '#29108a',
    fontWeight: '700',
    paddingHorizontal: 5,
    marginRight: 30,
  },
  Header_ButtonNotSelected: {
    paddingHorizontal: 5,
    marginRight: 30,
    color: 'gray',
  },
});

export default Header;
