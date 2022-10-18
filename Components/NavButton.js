import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, Appearance} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import darkMode from '../styles/DarkMode';

const NavButton = props => {
  const navigation = useNavigation();
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });
  return (
    <Pressable
      onPress={() => {
        navigation.navigate(props.name);
      }}>
      <Text
        style={
          props.currentScreen == props.name
            ? theme == 'light'
              ? styles.Header_ButtonSelected
              : darkMode.Header_ButtonSelected
            : theme == 'light'
            ? styles.Header_ButtonNotSelected
            : darkMode.Header_ButtonNotSelected
        }>
        {props.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    color: '#808080',
  },
});

export default NavButton;
