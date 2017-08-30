import { parse } from 'qs'
import { } from 'services/home'

import app from '../index'

const colProps = {
  lg: 12,
  md: 24,
}
export default {
  namespace: 'home',
  state: {
    streamdata : [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {

      })
    },
  },
  effects: {

  },
  reducers: {
  },
}
