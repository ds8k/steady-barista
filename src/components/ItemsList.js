import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Surface, Text } from 'react-native-paper'

import * as types from '../resources/constants'

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#648381',
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
})

const ItemsList = () => {
  const itemQueue = useSelector(s => s.itemQueue)

  return (
    <FlatList
      data={itemQueue}
      keyExtractor={item => item}
      renderItem={({ item }) => <ListItem id={item} />}
    />
  )
}

const ListItem = ({ id }) => {
  const item = useSelector(s => s.items[id])

  return (
    <Surface style={styles.listItem}>
      <Text>{types.itemNames[item?.type]}</Text>
    </Surface>
  )
}

export default ItemsList
