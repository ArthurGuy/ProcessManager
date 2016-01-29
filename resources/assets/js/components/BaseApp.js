import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import Header from './Header'
import { fetchUser } from './../actions/user'

class BaseApp extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchUser());
    }

    render() {
        return (
            <div>
                <Header />
                <div>{this.props.children}</div>
            </div>
        )
    }
}

//function App({ push, children }) {

//}

//the state params come from the reducers export
function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(BaseApp)