import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from 'routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('models/home'))
          cb(null, { component: require('routes/home/') })
        }, 'home')
      },
      childRoutes: [
        {
          path: 'home',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/home'))
              cb(null, require('routes/home/'))
            }, 'home')
          },
        }, {
          path: 'user',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/user'))
              cb(null, require('routes/user/'))
            }, 'user')
          },
        }, {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/login'))
              cb(null, require('routes/login/'))
            }, 'login')
          },
        },{
          path: 'department',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/department'))
              cb(null, require('routes/department/'))
            }, 'department')
          },
        },{
          path: 'datamodel',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/datamodel'))
              cb(null, require('routes/datamodel/'))
            }, 'datamodel')
          },
        },{
          path: 'devicetype',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/devicetype'))
              cb(null, require('routes/devicetype/'))
            }, 'devicetype')
          },
        },{
          path: 'device',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/device'))
              cb(null, require('routes/device/'))
            }, 'device')
          },
        },{
          path: 'gwconfig',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/gwconfig'))
              cb(null, require('routes/gwconfig/'))
            }, 'device')
          },
        },{
          path: 'gateway',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('models/gateway'))
              cb(null, require('routes/gwconfig/'))
            }, 'gateway')
          },
        }
      ],
    },
  ]

  return <Router history={history} routes={routes} />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
