import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Surface } from 'react-native-paper'

import MenuItem from './MenuItem'
import { REMOVE_ITEM_FROM_QUEUE } from '../redux'

const Counter = () => {
  const [counterBusy, setCounterBusy] = useState(false)
  const dispatch = useDispatch()
  const completed = useSelector(s => s.completed)
  const [nextItem] = completed

  useEffect(() => {
    if (!counterBusy && nextItem.id) {
      setCounterBusy(true)

      setTimeout(() => {
        dispatch({
          type: REMOVE_ITEM_FROM_COMPLETED,
          item: { id: nextItem.id },
        })

        setCounterBusy(false)
      }, 3000)
    }
  },[
    isWorking,
    nextItem.id,
    nextItem.type,
  ])

  return (
    <FlatList
      horizontal
      data={completed}
      keyExtractor={i => i.id}
      renderItem={({ item }) => (
        <MenuItem type={item.type} color="#575761" />
      )}
    />
  )
}

export default Counter
