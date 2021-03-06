import React from 'react'
import RouterView from '@/router'
import MenuList from './components/MenuList'
import './index.scss'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return <div className="home-container">
      <div className="home-aside">
        <MenuList />
      </div>
      <div className="home-content">
        <div className="home-content-title"></div>
        <div className="home-content-container">
          <RouterView routes={this.props.routes} />
        </div>
      </div>
    </div>
  }
}

export default Home