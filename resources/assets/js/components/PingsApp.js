import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { savePing, setPingEditMode, updatePing, fetchPings, filterByTag, deletePing, VisibilityFilters } from './../actions/pings'
import AddNewPing from './pings/AddNewPing'
import PingTable from './pings/PingTable'
import TagList from '../common/components/TagList'
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

//the state params come from the reducers export
function mapStateToProps(state) {
    return {
        visiblePings: selectPings(state.pings.items, state.pings.filterTag),
        visibilityFilter: state.visibilityFilter,
        tags: state.pings.tags,
        filterTag: state.pings.filterTag,
        errorMessage: state.pings.errorMessage
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(PingsApp)

PingsApp.propTypes = {
    visiblePings: React.PropTypes.array.isRequired,
    filterTag: React.PropTypes.string
};