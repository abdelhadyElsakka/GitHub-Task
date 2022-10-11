import React from 'react';
import {View} from 'react-native';
import ExploreCard from './ExploreCard';
import ReposCard from './ReposCard';

const Item = props => {
  const {item, screen} = props;
  return (
    <View>
      {screen == 'Explore' ? (
        <ExploreCard {...item} />
      ) : (
        <ReposCard {...item} />
      )}
    </View>
  );
};
export default Item;
