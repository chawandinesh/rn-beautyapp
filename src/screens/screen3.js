import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {GlobalContext} from './context';
import {SwipeListView} from 'react-native-swipe-list-view';

const {height, width} = Dimensions.get('window');

const Screen3 = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const openRowRefs = [];

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRefs.push(rowMap[rowKey]);
  };
  const selectedItem = props.route.params.data;
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#212026',
      },
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() =>
              props.navigation.navigate('Screen4', {data: selectedItem})
            }>
            <Icon name="add-outline" type="Ionicons" style={{color: '#fff'}} />
          </TouchableOpacity>
        );
      },
    });
  }, [props.navigation]);

  const handleDelete = (rowMap, data) => {
    // rowMap[data.item.key].closeRow();
    state[selectedItem].splice(data.index, 1);
    setState({...state, [selectedItem]: [...state[selectedItem]]});
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
        source={require('../assets/images/makeupbackground4.jpg')}>
        {state[selectedItem].length ? (
          <SwipeListView
            onRowDidOpen={onRowDidOpen}
            disableRightSwipe
            closeOnRowBeginSwipe
            closeOnRowOpen={false}
            data={state[selectedItem]}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={(data, rowMap) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    props.navigation.navigate('Screen4', {
                      data: selectedItem,
                      index: data.index,
                    })
                  }>
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
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#fff',
                        }}>
                        {data.item.name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: 30,
                      }}>
                      <Text style={{fontSize: 20, color: '#fff'}}>
                        Subject :
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}>
                        {data.item.detailsOfItem}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            renderHiddenItem={(data, rowMap) => {
              return (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    width: width * 0.9,
                    height: height * 0.2,
                    justifyContent: 'flex-end',
                    padding: 20,
                    flexDirection: 'row',
                    backgroundColor: 'darkred',
                    alignItems: 'center',
                  }}
                  onPress={() => handleDelete(rowMap, data)}>
                  <Text style={{color: '#fff', fontSize: 15}}>Delete</Text>
                </TouchableOpacity>
              );
            }}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        ) : (
          <View
            style={{
              backgroundColor: '#000',
              opacity: 0.5,
              padding: 30,
              width: width * 0.9,
            }}>
            <Text style={{fontSize: 25, color: '#fff', lineHeight: 40}}>
              Nothing To show, please click on '+' to add items
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Screen3;
