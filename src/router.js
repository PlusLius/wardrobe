import React,{Fragment} from 'react'
import {Route,Router} from 'dva/router'
import App from '@/pages/App'
import Home from '@/pages/Home'

function RouterConfig({history}){
  return (
    <Router history={history}>
      <Fragment>
          <Route exact path='/' component={App}/>
          <Route exact path='/home' component={Home}/>
      </Fragment>
    </Router>
  )
}

export default RouterConfig
