import React, { Component } from 'react'
import { adminRoutes } from './routes'
import { Redirect, Route, Switch} from 'react-router-dom'
import {Frame} from './components'
import { connect } from 'react-redux'
 
const mapState = state => ({
  isLogin: state.user.isLogin
})

@connect(mapState
)
class App extends Component {
  render() {
    console.log(this.props)
    return (
      this.props.isLogin ?
      <Frame>
        <Switch>
            {
              adminRoutes.map(
                (route,key) =>{
                  return <Route 
                  key={key} 
                  path={route.pathname} 
                  exact={route.exact}
                  render={routerProps =>{ return <route.component {...routerProps} />}}/>
                }
              )
            }
            <Redirect to={adminRoutes[2].pathname} from='/admin' exact={true} />
            <Redirect to='/404' />
        </Switch>
      </Frame>
      :
      <Redirect to='login'/>
    )
  }
}

export default App