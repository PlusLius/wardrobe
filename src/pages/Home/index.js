import React,{Component} from 'react'
import {connect} from 'dva'
import styles from './home'

@connect(
  state => state.home
)
class Home extends Component {
  render(){
    return (
      <div className={styles.homePage}>

        <div className={styles.recommend}>为你推荐</div>
      </div>
    )
  }
}

export default Home
