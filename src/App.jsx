import React,{Component} from 'react'

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
          <img src="/add-icon.png" alt=""/>
          PLUS!
      </div>
    )
  }
}

export default App
