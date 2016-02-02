import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ContactTable from './contacts/ContactTable'
import AddNewContact from './contacts/AddNewContact'

import { fetchContacts, deleteContact, saveContact } from './../actions/contacts'

class ContactsApp extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchContacts());
    }

    render() {
        const { contacts, dispatch } = this.props
        return (
            <div className="container-fluid">

                <h1>Contacts</h1>

                <ContactTable
                    contacts={contacts}
                    onContactDeleteClick={id => dispatch(deleteContact(id)) }
                />

                <AddNewContact onAddClick={contactData => dispatch(saveContact(contactData))} errorMessage={this.props.errorMessage} />
            </div>
        )
    }
}

//the state params come from the reducers export
function mapStateToProps(state) {
    return {
        contacts: state.contacts.items,
        errorMessage: state.contacts.errorMessage
    }
}

export default connect(mapStateToProps)(ContactsApp)

ContactsApp.propTypes = {
    //contacts: React.PropTypes.array.isRequired
};