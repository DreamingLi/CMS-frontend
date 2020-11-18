import React, { Component } from 'react'
import { adminRoutes } from './routes'
import { Redirect, Route, Switch} from 'react-router-dom'
import {Frame} from './components'

export default class app extends Component {
  render() {
    return (
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
    )
  }
}

