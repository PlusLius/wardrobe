import React,{Component} from 'react'
import './app.less'
import icon from '@/assets/images/icon/add-icon.png'
import {query} from '@/services'

class App extends Component {
  componentWillMount(){
    query({
      id:'41935867588333502',
      page:1
    }).then(data => console.log(data))
  }
  render(){
    return (
      <div className="App">
          PLUS!
          <img src={icon} alt=""/>
          <span className="fa fa-folder"></span>
          PLUS!
          <h1>111</h1>
          <div className="test">haha</div>
      </div>
    )
  }
}

export default App
