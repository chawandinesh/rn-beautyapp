import React from 'react';
import {Text, View} from 'react-native';
import Screen1 from './src/screens/screen1';
import Screen2 from './src/screens/screen2'
import Screen3 from './src/screens/screen3'
import Screen4 from './src/screens/screen4'
import Screen5 from './src/screens/screen5'
import Context from './src/screens/context'
import {GlobalContext} from './src/screens/context'
import StackNavigator from './src/navigator/stackNavigator'

const App = () => {
  return (
    <Context>
      <StackNavigator/>
    </Context>
    // </View>
  )
};

export default App;
