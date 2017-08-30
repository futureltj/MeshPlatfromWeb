/* global window */
import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as departmentService from 'services/department'
import { pageModel } from './common'
import { call } from 'redux-saga/effects'
const { prefix } = config
const { query,queryParent,update,remove,create } = departmentService

export default modelExtend(pageModel, {
  namespace: 'department',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
    currentParentId: 0
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/department') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put ,select}) {
      let currentParentId = yield select(state => state.department.currentParentId)
      payload.parentid=currentParentId
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * queryParent ({ payload = {} }, { call, put ,select}) {
      let currentParentId = yield select(state => state.department.currentParentId)
      payload.id=currentParentId
      const data = yield call(queryParent, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      console.log(payload)
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.department)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      console.log(payload)
      const data = yield call(remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put ,select}) {
      let currentParentId = yield select(state => state.department.currentParentId)
      payload.parentid=currentParentId
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const data = yield call(update, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * showChildren ({ payload }, { select, call, put }) {
      yield put({ type: 'changeCurrentParentId', payload: { currentParentId: payload } })
      yield put({ type: 'query' })
      yield put({ type: 'hideModal' })
    },
    * showParent ({ payload }, { select, call, put }) {
      //yield put({ type: 'changeCurrentParentId', payload: { currentParentId: payload } })
      let currentParentId = yield select(state => state.department.currentParentId)
      if(currentParentId===0){
        console.log('已是最顶级')
      }else{
        yield put({ type: 'queryParent' })
        yield put({ type: 'hideModal' })
      }

    },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    changeCurrentParentId (state, { payload }) {
      return { ...state, ...payload, modalVisible: false }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
