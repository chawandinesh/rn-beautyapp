import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Redressed from '../assets/fonts/Redressed-Regular.ttf';
const {height, width} = Dimensions.get('window');
const Screen1 = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingTop: height * 0.3,
          alignItems: 'center',
        }}
        source={require('../assets/images/makeupbackground1.jpg')}>
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontFamily: 'Roboto',
              textShadowColor: '#000',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
            }}>
            Look Beautiful Makeup
          </Text>
        </View>
        <View style={{width: width, alignItems: 'flex-end', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Screen2')}
            style={{
              padding: 20,
              width: width * 0.5,
              alignItems: 'center',
              borderBottomLeftRadius: 20,
              backgroundColor: '#eee',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Add Details</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: width, alignItems: 'flex-start', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Screen5')}
            style={{
              padding: 20,
              width: width * 0.5,
              alignItems: 'center',
              borderTopRightRadius: 20,
              backgroundColor: '#eee',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>View Details</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Screen1;
