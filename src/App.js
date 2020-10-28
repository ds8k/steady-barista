import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { Provider as StoreProvider } from 'react-redux'
import { Button, Provider as PaperProvider, Title } from 'react-native-paper'

import Barista from './components/Barista'
import ItemsList from './components/ItemsList'
import MenuItem from './components/MenuItem'

import * as types from './resources/constants'
import store from './redux'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E4FDE1',
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
})

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <SafeAreaView>
            <Title>Coffee ala Cam</Title>
            <Barista />
            <View style={styles.itemContainer}>
              <MenuItem type={types.CAFE_AU_LAIT} />
              <MenuItem type={types.CAPPUCCINO} />
              <MenuItem type={types.EXPRESSO} />
            </View>
            <ItemsList />
          </SafeAreaView>
        </View>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
