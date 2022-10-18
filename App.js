import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
// Screens
import ExploreScreen from './Screens/ExploreScreen';
import RepositoriesScreen from './Screens/RepositoriesScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen
          name="Repositories"
          component={RepositoriesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
