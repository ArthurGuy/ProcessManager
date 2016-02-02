import React, { Component, PropTypes } from 'react'
import ContactRow from './ContactRow'

export default class ContactTable extends Component {
    render() {
        return (
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Tags</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.contacts.map(contact =>
                    <ContactRow
                        key={contact.id}
                        {...contact}
                        onDeleteClick={() => this.props.onContactDeleteClick(contact.id)}
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