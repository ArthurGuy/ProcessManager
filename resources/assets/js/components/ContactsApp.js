import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//import { fetchContacts } from './../actions/contacts'

class ContactsApp extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        //dispatch(fetchContacts());
    }

    render() {
        const { contacts } = this.props
        return (
            <div className="container-fluid">

                <h1>Contacts</h1>

                {contacts.map(contact =>
                    <span>{contact.name}</span>)}
            </div>
        )
    }
}

//the state params come from the reducers export
function mapStateToProps(state) {
    return {
        tags: state.pings.tags,
        filterTag: state.pings.filterTag,
        contacts: state.contacts.items
    }
}

export default connect(mapStateToProps)(ContactsApp)

ContactsApp.propTypes = {
    contacts: React.PropTypes.array.isRequired
};