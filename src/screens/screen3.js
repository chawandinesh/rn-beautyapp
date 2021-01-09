import React, {useLayoutEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'native-base';
import {GlobalContext} from './context';
import {SwipeListView} from 'react-native-swipe-list-view';

const {height, width} = Dimensions.get('window');

const Screen3 = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const [dataItems, setDataItems] = React.useState([]);
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

  const handleDelete = async (rowMap, data) => {
    console.log(rowMap, data)
    rowMap[data.index].closeRow()
    dataItems.splice(dataItems[data.index], 1);
    setDataItems(dataItems);
    await firestore()
      .collection('products')
      .doc(selectedItem)
      .set({items: dataItems})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      .doc(selectedItem)
      .onSnapshot((documentSnapshot) => {
        setDataItems(documentSnapshot.data().items);
      });
    return () => subscriber();
  }, [selectedItem]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingBottom: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../assets/images/makeupbackground4.jpg')}>
        {dataItems && dataItems.length ? (
          <SwipeListView
            onRowDidOpen={onRowDidOpen}
            disableRightSwipe
            closeOnRowBeginSwipe
            closeOnRowOpen={false}
            data={dataItems}
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
                      borderBottomLeftRadius: 40,
                      borderLeftColor: 'pink',
                      borderBottomColor: '#ff8',
                      borderLeftWidth: 10,
                      borderBottomWidth: 5,
                      borderTopLeftRadius: 40,
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
                      <Text
                        style={{
                          fontSize: 20,
                          padding: 10,
                          color: '#ff9',
                        }}>
                        Name :
                      </Text>
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
                      <Text style={{fontSize: 20, color: '#faf'}}>
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
                    borderBottomLeftRadius: 40,
                    borderTopLeftRadius: 40,
                    height: height * 0.2,
                    justifyContent: 'flex-end',
                    padding: 20,
                    flexDirection: 'row',
                    backgroundColor: 'darkred',
                    alignItems: 'center',
                  }}
                  onPress={() => handleDelete(rowMap, data)}>
                  <Text style={{color: '#fff', fontWeight:'bold',fontSize: 18, fontStyle:'italic'}}>Delete</Text>
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
              borderLeftColor:'#ffa',
              borderBottomLeftRadius: 20,
              borderLeftWidth: 5,
              borderBottomColor:'#f5b5f2',
              borderBottomWidth: 10,
            }}>
            <Text style={{fontSize: 25, color: '#fff', lineHeight: 40}}>
              Nothing To show, please click on '+' to add items
            </Text>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Screen3;
