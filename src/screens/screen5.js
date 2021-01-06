import React, {Component, useContext} from 'react';
import {View, Text} from 'native-base';
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {GlobalContext} from './context';

const {height, width} = Dimensions.get('window');
function Screen5(props) {
  const openRowRefs = [];
  const [state, setState] = useContext(GlobalContext);
  const gState = [];
  const allKeys = Object.values(state);
  // console.log(allKeys,'keys')

  const data = allKeys.map((e) => e.map((e) => gState.push(e)));

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRefs.push(rowMap[rowKey]);
  };
  console.log(gState);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        // onPress={() =>
        //   props.navigation.navigate('Screen4', {
        //     data: selectedItem,
        //     index: data.index,
        //   })
        // }
        >
        <View
          style={{
            backgroundColor: '#111',
            padding: 20,
            marginTop: 20,
            height: height * 0.2,
            width: width * 0.9,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>Name :</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 20, color: '#fff'}}>Subject :</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
              {item.detailsOfItem}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingTop: height * 0.1,
          paddingBottom: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../assets/images/makeupbackground2.jpg')}>
        <FlatList
          data={gState}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
}

export default Screen5;
