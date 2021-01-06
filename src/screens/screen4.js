import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Item, Label, Input, Textarea, Form, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {GlobalContext} from './context';

const {height, width} = Dimensions.get('window');
const Screen4 = (props) => {
  const [state, setState] = useContext(GlobalContext);
  const selectedItem = props.route.params.data;
  const index = props.route.params.index;
  const [details, setDetails] = useState({
    category: '',
    name: '',
    detailsOfItem: '',
    useMethod: '',
    description: '',
    image: '',
  });

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: index === undefined ? 'Add Details' : 'Edit Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#000',
        opacity: 0.8,
      },
    });
    if (index !== undefined) {
      setDetails(state[selectedItem][index]);
    }
  }, [props.navigation]);

  const handleSubmit = () => {
    if (index !== undefined) {
      state[selectedItem].splice(index, 1, details);
      setState({...state, [selectedItem]: [...state[selectedItem]]});
      props.navigation.goBack();
    } else {
      setState({...state, [selectedItem]: [...state[selectedItem], details]});
      props.navigation.goBack();
    }
  };
  const getImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setDetails({...details, image: image.path});
    });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <ImageBackground
        style={{
          width: width,
          height: height,
          paddingTop: height * 0.1,
          paddingBottom: height * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.9,
        }}
        source={require('../assets/images/makeupbackground5.jpeg')}>
        <View
          style={{
            height: height * 0.8,
            width: width * 0.8,
            backgroundColor: '#000',
            padding: 10,
            opacity: 0.9,
          }}>
          <Item floatingLabel style={{marginTop: 20}}>
            <Label style={{color: '#fff'}}>Category of Makeup</Label>
            <Input
              style={{color: '#fff'}}
              value={details.category}
              onChangeText={(text) => setDetails({...details, category: text})}
            />
          </Item>
          <Item floatingLabel style={{marginTop: 20}}>
            <Label style={{color: '#fff'}}>Name of Makeup item</Label>
            <Input
              style={{color: '#fff'}}
              value={details.name}
              onChangeText={(text) => setDetails({...details, name: text})}
            />
          </Item>
          <Item floatingLabel style={{marginTop: 20}}>
            <Label style={{color: '#fff'}}>Details of Makeup item</Label>
            <Input
              style={{color: '#fff'}}
              value={details.detailsOfItem}
              onChangeText={(text) =>
                setDetails({...details, detailsOfItem: text})
              }
            />
          </Item>
          <Item floatingLabel style={{marginTop: 20}}>
            <Label style={{color: '#fff'}}>How to use?</Label>
            <Input
              style={{color: '#fff'}}
              value={details.useMethod}
              onChangeText={(text) => setDetails({...details, useMethod: text})}
            />
          </Item>

          <View style={{marginTop: 20}}>
            <Label style={{color: '#fff'}}>Description</Label>
            <Textarea
              rowSpan={3}
              bordered
              style={{color: '#fff'}}
              placeholder="Enter..."
              placeholderTextColor="#777"
              value={details.description}
              onChangeText={(text) =>
                setDetails({...details, description: text})
              }
            />
          </View>

          <View
            style={{
              height: height * 0.1,
              marginTop: 20,
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => getImage()}
              style={{
                width: width * 0.2,
                backgroundColor: '#aaa',
                borderWidth: 2,
                height: height * 0.1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {details.image ? (
                <Image
                  source={{uri: details.image}}
                  resizeMode="stretch"
                  style={{height: 100, width: 100}}
                />
              ) : (
                <Icon type="EvilIcons" name="image" style={{fontSize: 50}} />
              )}
            </TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon type="AntDesign" name="arrowleft" style={{color: '#fff'}} />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
                {' '}
                Add Image{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{backgroundColor: '#aaa', padding: 10, borderRadius: 20}}>
              {index !== undefined ? (
                <Text style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                  {' '}
                  Update{' '}
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                  {' '}
                  Save{' '}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Screen4;
