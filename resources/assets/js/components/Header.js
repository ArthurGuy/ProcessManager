import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPings } from './../actions/pings'
import { routeActions } from 'react-router-redux'


export default class Header extends Component {

    constructor(props) {
        super(props)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    handleRefreshClick(e) {
        const { dispatch } = this.props

        console.log('refreshing data')

        e.preventDefault()

        dispatch(fetchPings())
    }

    render() {
        const { dispatch, isFetchingPings } = this.props
        return (
            <nav className="navbar navbar-full navbar-dark bg-primary m-b-1">

                <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header">&#9776;</button>

                <div className="collapse navbar-toggleable-xs" id="navbar-header">

                    <span className="navbar-brand">Process Monitor</span>

                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a className="nav-link" onClick={() => dispatch(routeActions.push('/pings'))}>Pings</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => dispatch(routeActions.push('/contacts'))}>Contacts</a></li>

                        <li className="nav-item">
                            <a className="nav-link" onClick={this.handleRefreshClick}>
                                <span title="Refresh data" className="octicon octicon-sync"></span> Reload
                            </a>
                        </li>
                        <li className="nav-item nav-link">{isFetchingPings && <span>Loading data...</span>}</li>
                    </ul>

                    <ul className="nav navbar-nav pull-xs-right">
                        <li className="nav-item"><span className="nav-link">Users Name</span></li>
                        <li className="nav-item"><a className="nav-link" href="/logout"><i className="fa fa-btn fa-sign-out"></i>Logout</a></li>
                        <li className="nav-item"><img width="40" height="40" src="" /></li>
                    </ul>

                </div>

            </nav>
        )
    }
}

//the state params come from the reducers export
function mapStateToProps(state) {
    console.log(state);
    return {
        isFetchingPings: state.pings.isFetching || false
    }
}

export default connect(mapStateToProps)(Header)