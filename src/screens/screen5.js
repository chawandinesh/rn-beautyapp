import React, {Component, useContext} from 'react';
import {View, Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import {
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {GlobalContext} from './context';
import {ScrollView} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
function Screen5(props) {
  const openRowRefs = [];
  const [state, setState] = useContext(GlobalContext);
  const [dataItems, setDataItems] = React.useState([]);
  const [docItems, setDocItems] = React.useState([]);
  const gState = [];
  const allKeys = Object.values(state);

  const data = allKeys.map((e) => e.map((e) => gState.push(e)));
  console.log(dataItems, 'items');

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'All Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#212026',
      },
    });
  }, [props.navigation]);

  React.useEffect(() => {
    let docItem = [];
    firestore()
      .collection('products')
      .get()
      .then((querySnapshot) => {
        let itemDoc = [];
        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data() &&
            documentSnapshot.data().items &&
            documentSnapshot.data().items.length
          ) {
            itemDoc.push({
              id: documentSnapshot.id,
              doc: documentSnapshot.data(),
            });

            docItem = {id: documentSnapshot.id, doc: documentSnapshot.data()};
          }
        });
        setDocItems(itemDoc);
      });
  }, []);

  console.log(docItems, 'tils...');

  const renderItem = ({item}) => {
    console.log(item, 'item....');
    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            backgroundColor: '#bba3c9',
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            borderBottomColor:'#f43',
            borderRightWidth: 5,
            borderRightColor: '#0cb34f',
            borderBottomWidth: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 5,
            padding: 20,
            marginTop: 20,
            height: 'auto',
            width: width * 0.9,
          }}>
          <View style={{backgroundColor:'#056', alignItems:'center', borderTopRightRadius: 10,borderTopLeftRadius: 10}}>
            <Text style={{color: '#fff', fontSize: 20}}>{item.id}</Text>
          </View>
          <View style={{height: 'auto'}}>
            {item.doc.items &&
              item.doc.items.map((each) => (
                <View style={{margin: 2, padding: 10, backgroundColor: '#ffb', borderLeftWidth: 5, borderRightWidth: 5}}>
                  <View style={{flexDirection:'row', }}><Text style={{fontSize: 18,width: 150, fontWeight:'bold'}}>Name:- </Text><Text>{each.name}</Text></View>
                  <View style={{flexDirection:'row', }}><Text style={{fontSize: 18,width: 150, fontWeight:'bold'}}>Category:- </Text><Text>{each.category}</Text></View>
                  <View ><Text style={{fontSize: 18,width: 150, fontWeight:'bold', marginTop: 20}}>How To Use? </Text><Text style={{padding: 10}}>{each.useMethod}</Text></View>
                </View>
              ))}
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
          paddingBottom: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../assets/images/makeupbackground2.jpg')}>
        <FlatList
          data={docItems}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
}

export default Screen5;
