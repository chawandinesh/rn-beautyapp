import React, {useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Item, Label, Input, Textarea, Form, Icon} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

const {height, width} = Dimensions.get('window');
const Screen4 = (props) => {
  const [dataItems, setDataItems] = React.useState([]);
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

  console.log(dataItems, 'datItems....');
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: index === undefined ? 'Add Details' : 'Edit Details',
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#333',
    
        // opacity: 0.8,
      },
    });
  }, [props.navigation]);

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('products')
      .doc(selectedItem)
      .onSnapshot((documentSnapshot) => {
        setDataItems(documentSnapshot.data().items);
        console.log(index);
        if (index || index === 0) {
          console.log('index there');
          setDetails(documentSnapshot.data().items[index]);
        }
      });
    return () => subscriber();
  }, [selectedItem]);

  const handleStore = async (selectedItems, details) => {
    await firestore()
      .collection('products')
      .doc(selectedItem)
      .set({items: [...dataItems, details]})
      .then((res) => console.log('success'))
      .catch((err) => console.log('failed'));
  };

  const handleSubmit = async () => {
    if (
      !details.category.length ||
      !details.description.length ||
      !details.detailsOfItem.length ||
      !details.name.length ||
      !details.useMethod.length
    ) {
      alert('please fill all Details');
      return;
    }
    if (index !== undefined) {
      dataItems.splice(index, 1, details);
      setDataItems(dataItems);
      await firestore()
        .collection('products')
        .doc(selectedItem)
        .set({items: dataItems})
        .then((res) => {
          props.navigation.goBack();
        })
        .catch((err) => console.log(err));
    } else {
      handleStore(selectedItem, details);
      props.navigation.goBack();
    }
  };
  const getImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setDetails({...details, image: image.path});
      })
      .catch((err) => {
        console.log('cancel');
      });
  };
  return (
    // <KeyboardAvoidingView behavior="padding" style={{flex: 1}} >
      // <View style={{flex: 1}}>
        <ImageBackground
          style={{
            width: width ,
            height: height,
            // flex: 1,
            // paddingTop: height * 0.05,
            // paddingBottom: height * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.9,
          }}
          source={require('../assets/images/makeupbackground5.jpeg')}>
          <View
            style={{
              height: height * 0.9,
              width: width * 0.9,
              backgroundColor: '#000',
              padding: 10,
              flex:1,
              opacity: 0.9,
            }}>
            <Item style={{marginTop: 20}}>
              <Input
                style={{color: '#fff'}}
                placeholder="Category of Makeup"
                value={details.category}
                onChangeText={(text) =>
                  setDetails({...details, category: text})
                }
              />
            </Item>
            <Item style={{marginTop: 20}}>
              <Input
                style={{color: '#fff'}}
                placeholder="Name of Makeup Item"
                value={details.name}
                onChangeText={(text) => setDetails({...details, name: text})}
              />
            </Item>
            <Item style={{marginTop: 20}}>
              <Input
                style={{color: '#fff'}}
                placeholder="Details of Makeup item"
                value={details.detailsOfItem}
                onChangeText={(text) =>
                  setDetails({...details, detailsOfItem: text})
                }
              />
            </Item>
            <Item floatingLabel style={{marginTop: 20}}>
              <Input
                style={{color: '#fff'}}
                placeholder="How to use ?"
                value={details.useMethod}
                onChangeText={(text) =>
                  setDetails({...details, useMethod: text})
                }
              />
            </Item>

            <View style={{marginTop: 20}}>
              <Label style={{color: '#fff', fontWeight: 'bold'}}>Description : </Label>
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
                <Icon
                  type="AntDesign"
                  name="arrowleft"
                  style={{color: '#fff'}}
                />
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
                style={{
                  backgroundColor: '#aaa',
                  padding: 10,
                  borderRadius: 20,
                }}>
                {index !== undefined ? (
                  <Text
                    style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                    {' '}
                    Update{' '}
                  </Text>
                ) : (
                  <Text
                    style={{fontWeight: 'bold', fontSize: 30, color: '#fff'}}>
                    {' '}
                    Save{' '}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      // </View>
    // </KeyboardAvoidingView>
  );
};

export default Screen4;
