function delay(ms) {
  return new Promise((resolve,reject) => {
      setTimeout(function () {
          resolve()
      },ms)
  })
}

export default {
  namespace:'home',
  state:{
    number:0
  },
  effects:{
    *asyncAdd(action,{call,put}){
      yield call(delay,1000)
      yield put({type:'add'})
    }
  },
  reducers:{
    add(state){
      return {
        number:state.number + 1
      }
    }
  }
}
