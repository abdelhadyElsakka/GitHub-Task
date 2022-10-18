import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
  Appearance,
} from 'react-native';
// redux
import {useSelector, useDispatch} from 'react-redux';
import {fetchRepos} from '../redux/Features/ReposApi/ReposApiSlice';
import {firstPage} from '../redux/Features/ReposApi/ReposApiSlice';
// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import SelectList from '../Components/SelectList';
import Item from '../Components/Item';
import Header from '../Components/Header';
// Styles
import darkMode from '../styles/DarkMode';

const ExploreScreen = ({navigation}) => {
  const [numOfRepos, setNumOfRepos] = useState(10);
  const [showSelectList, setShowSelectList] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const page = repos.page;

  useEffect(() => {
    navigation.addListener("focus",()=>{
      dispatch(firstPage());
      dispatch(fetchRepos({numOfRepos}));
    })
  }, [navigation, page]);

  useEffect(() => {
    dispatch(fetchRepos({numOfRepos}));
  }, [dispatch, numOfRepos, page]);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const handleClick = numOfRepos => {
    if (repos.status !== 'loading') {
      dispatch(firstPage());
      setNumOfRepos(numOfRepos);
      setShowSelectList(false);
    }
  };

  const closeSelector = () => {
    setShowSelectList(false);
  };

  return (
    <SafeAreaView
      style={
        theme == 'light'
          ? styles.MainScreen_Background
          : darkMode.MainScreen_Background
      }>
      <Header currentScreen={'Explore'} navigateTo={'Repositories'} />
      {showSelectList && (
        <SelectList
          handleClick={handleClick}
          closeSelector={closeSelector}
          type={'Number'}
          items={[10, 50, 100]}
          showSelectList={showSelectList}
        />
      )}

      {repos.status !== 'success' ? (
        <View style={styles.ExploreScreen_ActivityIndicator}>
          <ActivityIndicator size="large" color={'#85d8c1'} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.ExploreScreen_FlatList_Title}>
              <Text
                style={
                  theme == 'light'
                    ? styles.ExploreScreen_FlatList_Title_Text
                    : darkMode.ExploreScreen_FlatList_Title_Text
                }>
                Explore popular
              </Text>
              <Pressable
                onPress={() => setShowSelectList(true)}
                style={
                  theme == 'light'
                    ? styles.ExploreScreen_FlatList_Selector
                    : darkMode.ExploreScreen_FlatList_Selector
                }>
                <Text style={styles.ExploreScreen_FlatList_Selector_FixedText}>
                  View :{' '}
                </Text>
                <Text
                  style={
                    theme == 'light'
                      ? styles.ExploreScreen_FlatList_Selector_Text
                      : darkMode.ExploreScreen_FlatList_Selector_Text
                  }>
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
          contentContainerStyle={
            theme == 'light'
              ? styles.ExploreScreen_FlatList_Container
              : darkMode.ExploreScreen_FlatList_Container
          }
          numColumns={1}
          data={repos.data.items}
          renderItem={({item}) => <Item item={item} screen={'Explore'} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainScreen_Background: {
    backgroundColor: '#fbfcfe',
    height: '100%',
    width: '100%',
  },
  ExploreScreen_ActivityIndicator: {
    marginVertical: 300,
    alignItems: 'center',
  },
  ExploreScreen_FlatList_Container: {
    backgroundColor: '#fbfcfe',
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
    color: '#000',
  },

  ExploreScreen_FlatList_Selector_FixedText: {
    color: '#808080',
  },
});

export default ExploreScreen;
