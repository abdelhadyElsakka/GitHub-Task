import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Appearance
} from 'react-native';

// Libraries

import DateTimePicker from '@react-native-community/datetimepicker';

// Icons

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Utilities

import twoDigitsNumber from '../Utilities/TwoDigitsNumber';

// Components

import Item from '../Components/Item';
import SelectList from '../Components/SelectList';

// Styles

import darkMode from '../styles/DarkMode';

const RepositoriesScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('Any');
  const [showSelectList, setShowSelectList] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date('2000-01-01'));

  const [theme, setTheme] = useState(Appearance.getColorScheme())


  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  const fetchData = () => {
    setTimeout(async ()=>{
      const resp = await fetch(
        `https://api.github.com/search/repositories?q=stars:>=500+language:${encodeURIComponent(language)}+created:>=${date.getFullYear()}-${twoDigitsNumber(
          date.getMonth() + 1,
        )}-${twoDigitsNumber(
          date.getDate(),
        )}&sort=stars&order=desc&per_page=30&page=${page}`,
      ).catch((err)=>alert(err));
      const result = await resp.json().catch((err)=>alert(err));
      page === 1 ? setData(result.items) : setData([...data, ...result.items]);
      setLoading(false);
    },1000)
   
  };

  const getLanguagers = (data)=>{
    if (data!=null) {
      const languages = data.map((item, i) => {
        return item.language;
      });
  
      const uniqueLanguages = languages.filter((item, i) => {
        return languages.indexOf(item) === i && item !== null;
      });

      return(
        uniqueLanguages
      )
    }
  }



  const renderLoader = () => {
    return (
      <View style={styles.RepositoriesScreen_FlatList_ActivityIndicator}>
        <ActivityIndicator size="large" color={'#85d8c1'} />
      </View>
    );
  };

  const loadMoreItems = () => {
    setPage(page + 1)
  };

  const handleClick = language => {
    setPage(1);
    setLanguage(language);
    setShowSelectList(false);
  };

  const onDateSelected= (event, value)=> {
    setDate(value);
    setPage(1);
    setDatePicker(false);
  }

  useEffect(() => {
    fetchData();
  }, [page, language, date]);

  return (
    <SafeAreaView>
      {showSelectList && (
        <SelectList
          handleClick={handleClick}
          type={'Language'}
          items={getLanguagers(data)}
          showSelectList={showSelectList}
        />
      )}
      {datePicker && (
        <DateTimePicker value={date} mode={'date'} onChange={onDateSelected} />
      )}

      {loading ? (
        <View style={styles.RepositoriesScreen_ActivityIndicator}>
          <ActivityIndicator size="large" color={'#85d8c1'} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.RepositoriesScreen_FlatList_Title}>
              <Text style={theme== 'light' ? styles.RepositoriesScreen_FlatList_Title_Text : darkMode.RepositoriesScreen_FlatList_Title_Text}>
                Repositories
              </Text>
              <View
                style={styles.RepositoriesScreen_FlatList_Selectors_Container}>
                <Pressable
                  onPress={() => setShowSelectList(true)}
                  style={theme== 'light' ? styles.RepositoriesScreen_FlatList_Selector : darkMode.RepositoriesScreen_FlatList_Selector}>
                  <Text
                    style={
                      styles.RepositoriesScreen_FlatList_Selector_FixedText
                    }>
                    Language :
                  </Text>
                  <Text
                    style={theme== 'light' ? styles.RepositoriesScreen_FlatList_Selector_Text : darkMode.RepositoriesScreen_FlatList_Selector_Text}>
                    {language.substring(0, 9)}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#000"
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setDatePicker(true);
                  }}
                  style={theme== 'light' ? styles.RepositoriesScreen_FlatList_Selector : darkMode.RepositoriesScreen_FlatList_Selector}>
                  <Text
                    style={
                      styles.RepositoriesScreen_FlatList_Selector_FixedText
                    }>
                    Date :{' '}
                  </Text>
                  <Text
                    style={theme== 'light' ? styles.RepositoriesScreen_FlatList_Selector_Text : darkMode.RepositoriesScreen_FlatList_Selector_Text}>
                    {date.toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#000"
                  />
                </Pressable>
              </View>
            </View>
          }
          numColumns={1}
          data={data}
          contentContainerStyle={theme== 'light' ? styles.RepositoriesScreen_FlatList_Container : darkMode.RepositoriesScreen_FlatList_Container}
          renderItem={({item}) => <Item item={item} screen={'Repos'} />}
          keyExtractor={item => item.id}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  RepositoriesScreen_FlatList_Container: {
    backgroundColor: '#fbfcfe',
    paddingBottom: 200,
  },
  RepositoriesScreen_FlatList_ActivityIndicator: {
    marginVertical: 16,
    alignItems: 'center',
  },
  RepositoriesScreen_ActivityIndicator: {
    marginVertical: 300,
    alignItems: 'center',
  },

  RepositoriesScreen_FlatList_Title: {
    width: '90%',
    alignSelf: 'center',
  },
  RepositoriesScreen_FlatList_Title_Text: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    marginVertical: 20,
  },

  RepositoriesScreen_FlatList_Selectors_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  RepositoriesScreen_FlatList_Selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 4,
    padding: 10,
    backgroundColor: '#fff',
    width: '48%',
  },
  RepositoriesScreen_FlatList_Selector_Text: {
    fontWeight: '700',
    color: '#000',
  },

  RepositoriesScreen_FlatList_Selector_FixedText: {
    color: '#808080',
  },
});

export default RepositoriesScreen;
