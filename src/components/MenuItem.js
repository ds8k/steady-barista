import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Caption, Subheading, Surface, TouchableRipple } from 'react-native-paper'
import uniqueId from 'lodash.uniqueid'

import * as types from '../resources/constants'
import { ADD_ITEM_TO_QUEUE, addRemoveItemFromQueue } from '../redux'

const styles = StyleSheet.create({
  item: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#8acb88',
    justifyContent: 'center',
    borderRadius: 15,
  }
})

const MenuItem = ({ type }) => {
  const dispatch = useDispatch()

  const onPress = useCallback(() => {
    dispatch({
      type: ADD_ITEM_TO_QUEUE,
      item: {
        id: uniqueId(),
        type,
      }
    })
  }, [dispatch, type])

  return (
    <TouchableRipple onPress={onPress}>
      <Surface style={styles.item}>
        <Subheading>{types.itemNames[type]}</Subheading>
        <Caption>{`~${types.menuWaitTimes[type]}`} secs</Caption>
      </Surface>
    </TouchableRipple>
  )
}


export default MenuItem