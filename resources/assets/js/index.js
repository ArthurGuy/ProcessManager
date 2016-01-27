import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link, browserHistory } from 'react-router'

import { fetchPings } from './actions/pings'

import BaseApp from './components/BaseApp'
import Header from './components/Header'
import PingsApp from './components/PingsApp'
import DevToolsApp from './components/DevToolsApp'
import ContactsApp from './components/ContactsApp'
import NotFound from './components/NotFound'

import processMangerApp from './reducers/pings'

import configureStore from './configureStore'



const store = configureStore()

let rootElement = document.getElementById('root')
if (rootElement) {
    render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={BaseApp}>
                    <Route path="pings" component={PingsApp}/>
                    <Route path="contacts" component={ContactsApp}/>
                    <Route path="*" component={NotFound}/>
                </Route>
            </Router>
        </Provider>,
        rootElement
    )
}
//<DevToolsApp />