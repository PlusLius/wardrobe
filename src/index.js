// import React from 'react'
// import ReactDOM from 'react-dom'
import dva from 'dva'
// import App from './pages/App'
import './reset-mobile.css'
import router from './router'
import models from './models'

const app = dva()

models.forEach(model => app.model(model))

app.router(router)

app.start('#root')


// ReactDOM.render(
//   <App/>
// ,document.querySelector('#root'))
