import React,{Component} from 'react'
import {connect} from 'dva'


@connect(
  state => state.home
)
class Home extends Component {
  render(){
    console.log(this.props.number)
    return (
      <div>Hello Home
           <p>{this.props.number}</p>
           <button onClick={()=>this.props.dispatch({type:'home/add'})}>+</button>
           <button onClick={()=>this.props.dispatch({type:'home/asyncAdd'})}>异步+</button>
      </div>
    )
  }
}

export default Home
