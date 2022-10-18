import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Appearance
} from 'react-native';

// Icons

import AntDesign from 'react-native-vector-icons/AntDesign';

// Styles

import darkMode from '../styles/DarkMode';

const SelectList = props => {

  const [items, setItems] = useState(props.items);

  const [text, setText] = useState('');

  const [theme, setTheme] = useState(Appearance.getColorScheme())

  Appearance.addChangeListener((scheme)=>{
    setTheme(scheme.colorScheme)
  })

  const onChangeText = newText => {
    setText(newText);
    filterdList = props.items.filter(item => {
      return item.includes(newText);
    });
    setItems(filterdList);
  };

  return (
    <>
        <View style={styles.SelectList_Background}>
          <View style={theme== 'light' ? styles.SelectList_MainView : darkMode.SelectList_MainView}>
            <View
              style={styles.SelectList_Container}>
              <View
                style={styles.SelectList_Header}>
                <Text style={ theme== 'light' ? styles.SelectList_Header_Text : darkMode.SelectList_Header_Text}>
                  Select {props.type}
                </Text>
                <Pressable
                  onPress={() => {
                    props.closeSelector()
                  }}>
                  <AntDesign name="closecircle" size={20} color={theme== 'light' ? "#ccd5dd" : "#fff" } />
                </Pressable>
              </View>
              {props.type === 'Language' && (
                <View style={theme== 'light' ? styles.SelectList_Search : darkMode.SelectList_Search}>
                    <TextInput
                      placeholder="Filter Languages"
                      onChangeText={onChangeText}
                      value={text}
                      style={theme== 'light' ? styles.SelectList_Search_TextInput : darkMode.SelectList_Search_TextInput}
                      />
                    <AntDesign name="search1" size={20} color="#b3b6ba" />
                  </View>
              )}

              <ScrollView>
                {items.map((item, i) => {
                  return (
                    <Pressable
                      key={i}
                      onPress={() => {
                        props.handleClick(item);
                      }}>
                      <Text
                        style={theme== 'light' ? styles.SelectList_Item_Text : darkMode.SelectList_Item_Text}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  SelectList_Background: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  SelectList_MainView: {
    height: '70%',
    width: '90%',
    backgroundColor: '#fff',
    position: 'absolute',
    borderRadius: 20,
    left: '5%',
    top: '20%',
  },
  SelectList_Container:{
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  SelectList_Header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  SelectList_Header_Text:{
    color: '#000', 
    fontWeight: '500'
  },
  SelectList_Search:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccd5dd',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SelectList_Search_TextInput:{
    color:'#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SelectList_Item_Text:{
    padding: 10,
    fontSize: 15,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccd5dd',
  }
});

export default SelectList;
