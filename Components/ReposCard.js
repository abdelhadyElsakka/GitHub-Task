import React, {useState} from 'react';
import {
  View, 
  StyleSheet, 
  Text,
  Appearance
} from 'react-native';

// Icons

import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

// Styles

import darkMode from '../styles/DarkMode';

const ReposCard = props => {
  
  const {full_name, description, language, forks, stargazers_count} = props;

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  return (
    <View style={theme== 'light' ? styles.ReposCard : darkMode.ReposCard}>
      <View style={styles.ReposCard_Info}>
        <View style={styles.ReposCard_Info_Title}>
          <AntDesign name="book" size={23} color="#85d8c1" />
          <Text style={theme== 'light' ? styles.ReposCard_Info_Title_Text : darkMode.ReposCard_Info_Title_Text}>{full_name}</Text>
        </View>
        <Text style={theme== 'light' ? styles.ReposCard_Info_Description : darkMode.ReposCard_Info_Description}>{description}</Text>
        <View style={styles.Dividing_Line} />
        <View style={styles.Direction_Row}>
          <Text style={theme== 'light' ? styles.ReposCard_Info_Bottom_Text : darkMode.ReposCard_Info_Bottom_Text}>{language}</Text>
          <View style={theme== 'light' ? styles.ReposCard_Info_Bottom_Text : darkMode.ReposCard_Info_Bottom_Text}>
            <AntDesign name="staro" size={15} color="#85d8c1" />
            <Text style={theme== 'light' ? styles.ReposCard_Info_Bottom_TextIcon : darkMode.ReposCard_Info_Bottom_TextIcon}>
              {stargazers_count}
            </Text>
          </View>
          <View style={styles.ReposCard_Info_Bottom_Text}>
            <Octicons name="repo-forked" size={15} color="#85d8c1" />
            <Text style={theme== 'light' ? styles.ReposCard_Info_Bottom_TextIcon : darkMode.ReposCard_Info_Bottom_TextIcon}>{forks}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ReposCard: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },

  ReposCard_Info: {
    marginVertical: 20,
    width: '90%',
  },

  ReposCard_Info_Title: {
    flexDirection: 'row',
    paddingVertical: 15,
  },

  ReposCard_Info_Title_Text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29108a',
    flexShrink: 1,
    marginLeft: 10,
  },

  ReposCard_Info_Description: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400',
  },

  ReposCard_Info_Bottom_Text: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    color: '#000',
  },

  ReposCard_Info_Bottom_TextIcon: {
    fontSize: 13,
    color: '#000',
    marginLeft: 3,
  },

  Dividing_Line: {
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    marginVertical: 15,
  },

  Direction_Row: {
    flexDirection: 'row',
  },
});

export default ReposCard;
