import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Appearance,
} from 'react-native';
// redux
import {useSelector, useDispatch} from 'react-redux';
import {fetchRepos} from '../redux/Features/ReposApi/ReposApiSlice';
import {
  nextPage,
  firstPage,
  previousPage,
} from '../redux/Features/ReposApi/ReposApiSlice';
// Data
import programmingLanguages from '../Data/ProgrammingLanguages';
// Libraries
import DateTimePicker from '@react-native-community/datetimepicker';
// Icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Item from '../Components/Item';
import SelectList from '../Components/SelectList';
import Header from '../Components/Header';
// Styles
import darkMode from '../styles/DarkMode';
const RepositoriesScreen = () => {

  const [language, setLanguage] = useState('Any');
  const [showSelectList, setShowSelectList] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date('2000-01-01'));
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const dispatch = useDispatch();
  const repos = useSelector(state => state.repos);
  const page = repos.page;
  const numOfRepos=10

  useEffect(() => {
    dispatch(fetchRepos({numOfRepos, language, date, page}));
  }, [dispatch, language, date, page]);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const pagination = () => {
    return (
      <View>
        { repos.data.items.length==0 ? (
          <Text style={styles.RepositoriesScreen_FlatList_NoItems}>
            No Repositories To Show
          </Text>
        ) : (
          <View style={styles.RepositoriesScreen_FlatList_Pagination}>
            <Pressable onPress={loadPerviousPage}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={30}
                color="#808080"
              />
            </Pressable>
            <View
              style={
                styles.RepositoriesScreen_FlatList_Pagination_NumberContainer
              }>
              {page !== 1 && (
                <Text
                  style={
                    styles.RepositoriesScreen_FlatList_Pagination_OtherPageNumber
                  }>
                  {page - 1}
                </Text>
              )}
              <Text
                style={
                  theme == 'light'
                    ? styles.RepositoriesScreen_FlatList_Pagination_CurrentPageNumber
                    : darkMode.RepositoriesScreen_FlatList_Pagination_CurrentPageNumber
                }>
                {page}
              </Text>
              {repos.data.items.length == 10 && (
                <Text
                  style={
                    styles.RepositoriesScreen_FlatList_Pagination_OtherPageNumber
                  }>
                  {page + 1}
                </Text>
              )}
            </View>
            <Pressable onPress={loadNextPage}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#808080"
              />
            </Pressable>
          </View>
        )}
      </View>
    );
  };

  const loadNextPage = () => {
    repos.status !== 'loading' && dispatch(nextPage());
  };

  const loadPerviousPage = () => {
    repos.status !== 'loading' && dispatch(previousPage());
  };

  const handleClick = language => {
    if (repos.status !== 'loading') {
      dispatch(firstPage());
      setLanguage(language);
      setShowSelectList(false);
    }
  };

  const closeSelector = () => {
    setShowSelectList(false);
  };

  const onDateSelected = (event, value) => {
    if (repos.status !== 'loading') {
      setDatePicker(false);
      setDate(value);
      dispatch(firstPage());
    }
  };

  return (
    <SafeAreaView
      style={
        theme == 'light'
          ? styles.MainScreen_Background
          : darkMode.MainScreen_Background
      }>
      <Header currentScreen={'Repositories'} navigateTo={'Explore'} />
      {showSelectList && (
        <SelectList
          handleClick={handleClick}
          closeSelector={closeSelector}
          type={'Language'}
          items={programmingLanguages}
          showSelectList={showSelectList}
        />
      )}
      {datePicker && (
        <DateTimePicker value={date} mode={'date'} onChange={onDateSelected} />
      )}

      {repos.status !== 'success' ? (
        <View style={styles.RepositoriesScreen_ActivityIndicator}>
          <ActivityIndicator size="large" color={'#85d8c1'} />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={styles.RepositoriesScreen_FlatList_Title}>
              <Text
                style={
                  theme == 'light'
                    ? styles.RepositoriesScreen_FlatList_Title_Text
                    : darkMode.RepositoriesScreen_FlatList_Title_Text
                }>
                Repositories
              </Text>
              <View
                style={styles.RepositoriesScreen_FlatList_Selectors_Container}>
                <Pressable
                  onPress={() => setShowSelectList(true)}
                  style={
                    theme == 'light'
                      ? styles.RepositoriesScreen_FlatList_Selector
                      : darkMode.RepositoriesScreen_FlatList_Selector
                  }>
                  <Text
                    style={
                      styles.RepositoriesScreen_FlatList_Selector_FixedText
                    }>
                    Language :
                  </Text>
                  <Text
                    style={
                      theme == 'light'
                        ? styles.RepositoriesScreen_FlatList_Selector_Text
                        : darkMode.RepositoriesScreen_FlatList_Selector_Text
                    }>
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
                  style={
                    theme == 'light'
                      ? styles.RepositoriesScreen_FlatList_Selector
                      : darkMode.RepositoriesScreen_FlatList_Selector
                  }>
                  <Text
                    style={
                      styles.RepositoriesScreen_FlatList_Selector_FixedText
                    }>
                    Date :
                  </Text>
                  <Text
                    style={
                      theme == 'light'
                        ? styles.RepositoriesScreen_FlatList_Selector_Text
                        : darkMode.RepositoriesScreen_FlatList_Selector_Text
                    }>
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
          data={repos.data.items}
          contentContainerStyle={
            theme == 'light'
              ? styles.RepositoriesScreen_FlatList_Container
              : darkMode.RepositoriesScreen_FlatList_Container
          }
          renderItem={({item}) => <Item item={item} screen={'Repos'} />}
          keyExtractor={item => item.id}
          ListFooterComponent={pagination}
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
  RepositoriesScreen_FlatList_Container: {
    backgroundColor: '#fbfcfe',
  },

  RepositoriesScreen_FlatList_NoItems: {
    alignSelf: 'center',
    marginVertical: 50,
    color: '#808080',
    fontSize: 20,
  },

  RepositoriesScreen_FlatList_Pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
  },

  RepositoriesScreen_FlatList_Pagination_NumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
  },

  RepositoriesScreen_FlatList_Pagination_CurrentPageNumber: {
    fontSize: 25,
    paddingHorizontal: 15,
    color: '#000',
  },

  RepositoriesScreen_FlatList_Pagination_OtherPageNumber: {
    fontSize: 15,
    color: '#808080',
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
