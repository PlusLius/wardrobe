import React from 'react'
import {connect} from 'dva'
import Home from '@/pages/Home'

export default connect(state => state.home)(Home)
