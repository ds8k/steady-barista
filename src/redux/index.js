import produce from 'immer'
import { compose, createStore } from 'redux'

export const ADD_ITEM_TO_QUEUE = 'ADD_ITEM_TO_QUEUE'
export const REMOVE_ITEM_FROM_QUEUE = 'REMOVE_ITEM_FROM_QUEUE'
export const REMOVE_ITEM_FROM_COMPLETED = 'REMOVE_ITEM_FROM_COMPLETED'

const state = {
  completed: [],
  itemQueue: [],
  items: {},
}

export const itemsReducer = (draft, payload) => {
  switch (payload.type) {
    case ADD_ITEM_TO_QUEUE: {
      return {
        ...draft,
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
          ...draft,
          items: newItems,
          itemQueue: draft.itemQueue.filter(i => i !== payload.item.id),
          completed: draft.completed.concat(removedItem),
        }
      }
    }

    case REMOVE_ITEM_FROM_COMPLETED: {
      return {
        ...draft,
        completed: draft.completed.filter(i => i.id !== payload.item.id)
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
    completed: [],
  },
  composeEnhancers(),
)
