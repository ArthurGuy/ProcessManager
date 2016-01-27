import React, { Component, PropTypes } from 'react'
import PingRow from './PingRow'

export default class PingTable extends Component {
    render() {
        return (
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Last Update</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.pings.map(ping =>
                    <PingRow
                        key={ping.id}
                        {...ping}
                        onEditClick={() => this.props.onPingEditClick(ping.id)}
                        onDeleteClick={() => this.props.onPingDeleteClick(ping.id)}
                        onEditCancelClick={() => this.props.onPingCancelEditClick(ping.id)}
                        onUpdateClick={(details) => this.props.onPingUpdateClick(ping.id, details)}
                    />
                )}
                </tbody>
            </table>
        )
    }
}
/*
PingTable.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
}
*/