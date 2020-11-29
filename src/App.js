import React, { Component } from 'react'
import { adminRoutes } from './routes'
import { Redirect, Route, Switch} from 'react-router-dom'
import {Frame} from './components'
import { connect } from 'react-redux'
 
const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin ?
      <Frame>
        <Switch>
            {
              adminRoutes.map(
                (route,key) =>{
                  return(
                  <Route 
                    key={key} 
                    path={route.pathname} 
                    exact={route.exact}
                    render={
                      routerProps =>{ 
                        const hasPermission = route.roles.includes(this.props.role)
                        return hasPermission ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth" />
                      }
                    }
                  />
                  )
                }
              )
            }
            <Redirect to={adminRoutes[2].pathname} from='/admin' exact={true} />
            <Redirect to='/404' />
        </Switch>
      </Frame>
      :
      <Redirect to='/login'/>
    )
  }
}

export default App