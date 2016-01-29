import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { savePing, setPingEditMode, updatePing, fetchPings, filterByTag, deletePing, VisibilityFilters } from './../actions/pings'
import AddNewPing from './pings/AddNewPing'
import PingTable from './pings/PingTable'
import TagList from '../common/components/TagList'
import Alert from '../common/components/Alert'
import {_} from 'lodash'

class PingsApp extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchPings());
    }

    render() {
        // Injected by connect() call:
        const { dispatch, visiblePings, filterTag } = this.props
        return (
            <div className="container-fluid">

                <h1>Pings</h1>

                <Alert type="danger" message={ this.props.globalWarning } />

                <p>Tags: <TagList tags={this.props.tags} onTagClick={tag => dispatch(filterByTag(tag))} /></p>

                <p>
                    {filterTag && <span>Filtering by tag: <TagList tags={[filterTag]} /></span>}
                    {filterTag && <a onClick={tag => dispatch(filterByTag(null))}>clear</a>}
                </p>

                <PingTable
                    pings={visiblePings}
                    onPingEditClick={id => dispatch(setPingEditMode(id, true)) }
                    onPingDeleteClick={id => dispatch(deletePing(id)) }
                    onPingUpdateClick={(id, details) => dispatch(updatePing(id, details)) }
                    onPingCancelEditClick={id => dispatch(setPingEditMode(id, false)) }
                />

                <div className="card-footer text-muted">
                    { this.props.user.pingBaseUrl }/[ping-name]
                </div>

                <AddNewPing onAddClick={name => dispatch(savePing(name))} errorMessage={this.props.errorMessage} />

            </div>
        )
    }
}

function selectPings(pings, filterTag) {
    //filter pings by filterTag

    if (filterTag == null) {
        return pings
    }

    return pings.filter(ping => _.contains(ping.tags, filterTag))
}

function checkForAlerts(pings) {
    let alerts = false;

    for (var i in pings) {
        if (pings[i].error && pings[i].active) {
            alerts = true;
        }
    }
    return alerts
}

//the state params come from the reducers export
function mapStateToProps(state) {

    let globalWarning = ''
    if (checkForAlerts(state.pings.items)) {
        globalWarning = 'One or more pings are in an error state'
    }

    return {
        visiblePings: selectPings(state.pings.items, state.pings.filterTag),
        visibilityFilter: state.visibilityFilter,
        tags: state.pings.tags,
        filterTag: state.pings.filterTag,
        errorMessage: state.pings.errorMessage,
        globalWarning: globalWarning,
        user: state.user
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(PingsApp)

PingsApp.propTypes = {
    visiblePings: React.PropTypes.array.isRequired,
    filterTag: React.PropTypes.string
};