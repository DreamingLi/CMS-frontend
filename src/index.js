import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {mainRoutes} from './routes'

import { Provider } from 'react-redux'

import './index.css'

import store from './store'


ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Route path='/admin' render={(routerProps) => {return <App {...routerProps}/>}}/>
            {
                mainRoutes.map(
                    (route,key) => <Route key={key} path={route.pathname} component={route.component}/>
                )
            }
            <Redirect to='/admin' from="/" exact />
            
            <Redirect to='/404' />
        </Switch>
    </BrowserRouter>
</Provider>
, document.getElementById('root'));
