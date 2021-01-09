import React, {useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {GlobalContext} from './context';
const {height, width} = Dimensions.get('window');

const Screen2 = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const data = Object.keys(state);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Bright Your Face Makeup',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#212026',
      },
      headerTintColor: '#fff',
    });
  }, [props.navigation]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Screen3', {data: item})}
        style={{
          padding: 20,
          backgroundColor: '#ddd',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          marginTop: 30,
          width: width * 0.4,
          borderBottomWidth: 5,
          borderTopWidth: 3,
        }}>
        <Text
          style={{
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#fc8c03',
            textShadowColor: '#000',
            textShadowOffset: {width: -0, height: -0},
            textShadowRadius: 1,
          }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingTop: height * 0.05,
          paddingBottom: height * 0.1,
          alignItems: 'flex-end',
        }}
        source={require('../assets/images/makeupbackground2.jpg')}>
        <FlatList
          data={data}
          keyExtractor={(item, idx) => {
            return idx.toString();
          }}
          renderItem={renderItem}
        />
      </ImageBackground>
    </View>
  );
};

export default Screen2;
