import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { REMOVE_ITEM_FROM_QUEUE } from '../redux'
import * as types from '../resources/constants'

const { menuWaitTimes } = types
console.log('menuWaitTimes', menuWaitTimes);

const Barista = () => {
  const [isWorking, setIsWorking] = useState(false)

  const dispatch = useDispatch()
  const nextItem = useSelector(s => s.items[s.itemQueue[0]]) || {}

  useEffect(() => {
    if (!isWorking && nextItem.id) {
      setIsWorking(true)

      setTimeout(() => {
        dispatch({
          type: REMOVE_ITEM_FROM_QUEUE,
          item: { id: nextItem.id },
        })

        setIsWorking(false)
      }, menuWaitTimes[nextItem.type] * 1000)
    }
  },[
    isWorking,
    nextItem.id,
    nextItem.type,
  ])

  return null
}

export default Barista
