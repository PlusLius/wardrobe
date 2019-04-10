import React,{Component} from 'react'
import './app.less'
import icon from '@/assets/images/icon/add-icon'

class App extends Component {
  componentWillMount(){
    fetch('/comments/show?id=41935867588333502&page=1').then(data => data.json()).then(data => {
      console.log(data)
    })
  }
  render(){
    return (
      <div>
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
