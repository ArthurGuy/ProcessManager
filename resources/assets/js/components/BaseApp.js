import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Header from './Header'

function App({ push, children }) {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    )
}

export default connect(
    null,
    routeActions
)(App)