import produce from 'immer'
import { compose, createStore } from 'redux'

export const ADD_ITEM_TO_QUEUE = 'ADD_ITEM_TO_QUEUE'
export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE'

const state = {
  itemQueue: [],
  items: {},
}

export const addRemoveItemFromQueue = (type, item) => ({
  type, item
})

export const itemsReducer = (draft, payload) => {
  switch (payload.type) {
    case ADD_ITEM_TO_QUEUE: {
      return {
        items: {
          ...draft.items,
          [payload.item.id]: payload.item,
        },
        itemQueue: draft.itemQueue.concat(payload.item.id)
      }
    }

    case REMOVE_ITEM_FROM_QUEUE: {
      if (draft.items[payload.item.id]) {
        const { [payload.item.id]: removedItem, ...newItems } = draft.items

        return {
          items: newItems,
          itemQueue: draft.itemQueue.filter(i => i !== payload.item.id)
        }
      }
    }

    default:
      return draft
  }
}

const composeEnhancers = __DEV__
    ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export default createStore(
  itemsReducer,
  {
    itemQueue: [],
    items: {},
  },
  composeEnhancers(),
)
