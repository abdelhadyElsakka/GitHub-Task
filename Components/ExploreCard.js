import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Appearance
} from 'react-native';

// Icons 

import AntDesign from 'react-native-vector-icons/AntDesign'

// Utilities

import timeSince from '../Utilities/TimeSince';
import kFormatter from '../Utilities/KFormatter';

// Styles

import darkMode from '../styles/DarkMode';


const ExploreCard = props => {

  const { full_name, description, language, stargazers_count, updated_at } = props;

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  return (
    <View style={theme== 'light' ? styles.ExploreCard : darkMode.ExploreCard}>
      <View style={styles.ExploreCard_Info}>
        <View style={styles.ExploreCard_Info_Header}>
          <Text style={styles.ExploreCard_Info_Header_Text}>Trending repository</Text>
          <View style={styles.Direction_Row}>
            <View style={styles.ExploreCard_Info_Header_Star}>
              <AntDesign name='staro' size={15} color='#85d8c1' />
              <Text style={theme== 'light' ? styles.ExploreCard_Info_Header_Star_Text : darkMode.ExploreCard_Info_Header_Star_Text}>Star</Text>
            </View>
            <Text style={theme== 'light' ? styles.ExploreCard_Info_Header_StarNumber : darkMode.ExploreCard_Info_Header_StarNumber}>{kFormatter(stargazers_count)}</Text>
          </View>
        </View>
        <View style={styles.ExploreCard_Info_Title}>
          <AntDesign name='book' size={23} color='#85d8c1' />
          <Text style={theme== 'light' ? styles.ExploreCard_Info_Title_Text : darkMode.ExploreCard_Info_Title_Text}>{full_name}</Text>
        </View>
        <Text style={theme== 'light' ? styles.ExploreCard_Info_Description : darkMode.ExploreCard_Info_Description}>{description}</Text>
        <View style={styles.Dividing_Line} />
        <View style={styles.Direction_Row}>
          <Text style={theme== 'light' ? styles.ExploreCard_Info_Bottom_Text : darkMode.ExploreCard_Info_Bottom_Text}>Updated {timeSince(new Date(updated_at))} ago</Text>
          <Text style={theme== 'light' ? styles.ExploreCard_Info_Bottom_Text : darkMode.ExploreCard_Info_Bottom_Text}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  ExploreCard: {
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

  ExploreCard_Info: {
    marginVertical: 20,
    width: '90%',
  },
  ExploreCard_Info_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ExploreCard_Info_Header_Text: {
    fontSize: 10
  },

  ExploreCard_Info_Header_Star: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  ExploreCard_Info_Header_Star_Text: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginLeft: 3
  },

  ExploreCard_Info_Header_StarNumber: {
    backgroundColor: '#e7e3f2',
    color: '#29108a',
    fontWeight: '600',
    marginLeft: 10,
    padding: 5,
    fontSize: 13,
    borderRadius: 5,
  },

  ExploreCard_Info_Title: {
    flexDirection: 'row',
    paddingVertical: 15
  },

  ExploreCard_Info_Title_Text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29108a',
    flexShrink: 1,
    marginLeft: 10
  },

  ExploreCard_Info_Description: {
    fontSize: 13,
    color: '#000',
    fontWeight: '400'
  },

  ExploreCard_Info_Bottom_Text: {
    marginRight: 15,
    fontSize: 13,
    color: '#000'
  },

  Dividing_Line: {
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    marginVertical: 15
  },

  Direction_Row: {
    flexDirection: 'row'
  }
});

export default ExploreCard;
