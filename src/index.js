import dva from 'dva'
import './reset-mobile.css'
import router from './router'
import models from './models'

const app = dva()

models.forEach(model => app.model(model))

app.router(router)

app.start('#root')

