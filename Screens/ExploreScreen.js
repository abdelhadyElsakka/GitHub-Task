import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
  Appearance
} from 'react-native';

// Icons

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Components

import SelectList from '../Components/SelectList';
import Item from '../Components/Item';

// Styles

import darkMode from '../styles/DarkMode';

const ExploreScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfRepos, setNumOfRepos] = useState(10);
  const [showSelectList, setShowSelectList] = useState(false);

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  var isFetching=false


  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  const fetchData = async () => {
    isFetching=true
    const resp = await fetch(
      `https://api.github.com/search/repositories?q=stars:>=500&sort=stars&per_page=${numOfRepos}`,
    ).catch(err => alert(err));
    const result = await resp.json().catch(err => alert(err));
    setData(result.items);
    setLoading(false);
    isFetching=false
  };

  const handleClick = numOfRepos => {
    if(!isFetching){
      setNumOfRepos(numOfRepos);
      setShowSelectList(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [numOfRepos]);

  return (
    <SafeAreaView>
      {showSelectList && (
        <SelectList
          handleClick={handleClick}
          type={'Number'}
          items={[10, 50, 100]}
          showSelectList={showSelectList}
        />
      )}

      {loading ? (
        <View style={styles.ExploreScreen_ActivityIndicator}>
          <ActivityIndicator size="large" color={'#85d8c1'} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.ExploreScreen_FlatList_Title}>
              <Text style={theme== 'light' ? styles.ExploreScreen_FlatList_Title_Text : darkMode.ExploreScreen_FlatList_Title_Text}>
                Explore popular
              </Text>
              <Pressable
                onPress={() => (setShowSelectList(true))}
                style={theme== 'light' ? styles.ExploreScreen_FlatList_Selector : darkMode.ExploreScreen_FlatList_Selector}>
                <Text style={styles.ExploreScreen_FlatList_Selector_FixedText}>View : </Text>
                <Text style={theme== 'light' ? styles.ExploreScreen_FlatList_Selector_Text : darkMode.ExploreScreen_FlatList_Selector_Text}>
                  Top {numOfRepos}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="#000"
                />
              </Pressable>
            </View>
          }
          contentContainerStyle={theme== 'light' ? styles.ExploreScreen_FlatList_Container : darkMode.ExploreScreen_FlatList_Container}
          numColumns={1}
          data={data}
          renderItem={({item}) => <Item item={item} screen={'Explore'} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ExploreScreen_ActivityIndicator: {
    marginVertical: 300,
    alignItems: 'center',
  },
  ExploreScreen_FlatList_Container: {
    backgroundColor: '#fbfcfe',
    paddingBottom: 200,
  },
  ExploreScreen_FlatList_Title: {
    width: '90%',
    alignSelf: 'center',
  },
  ExploreScreen_FlatList_Title_Text: {
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
    marginVertical: 20,
  },

  ExploreScreen_FlatList_Selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '40%',
  },
  ExploreScreen_FlatList_Selector_Text: {
    fontWeight: '700', 
    color: '#000'
  },

  ExploreScreen_FlatList_Selector_FixedText: {
    color: '#808080'
  },
});

export default ExploreScreen;
