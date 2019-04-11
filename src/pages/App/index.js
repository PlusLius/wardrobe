import React,{Component} from 'react'
import './app.less'
import icon from '@/assets/images/icon/add-icon.png'
import fetch from '../../utils/fetch'

class App extends Component {
  componentWillMount(){
    fetch()
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
