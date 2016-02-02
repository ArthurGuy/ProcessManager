import { FETCH_CONTACTS, FETCH_CONTACTS_FAILURE, RECEIVE_CONTACTS, DELETE_CONTACT, ADD_CONTACT,
    CONTACT_SAVE_FAILED, UPDATE_CONTACT } from './../actions/contacts'

const initialState = {isFetching: false, items:[{id: 1, name:'Hello', email:'test@example.com', filter_tags:[]}], tags:[]}

//Check over all the pings for our local id, when found replace with the new object
function updateLocalContact(state, action) {
    if (state.id !== action.draftContactId) {
        return state
    }
    return action.contact
}

//Process changes to pings
function contacts(state = initialState, action) {
    switch (action.type) {

        case ADD_CONTACT:

            var contacts = [
                ...state.items,
                {
                    id: action.draftContactId,
                    name: action.name,
                    email: action.email,
                    filter_tags: action.filter_tags,
                    isSaving: action.isSaving,
                    active: true
                }
            ]
            return {isFetching: true, items: contacts, errorMessage:null}

        case UPDATE_CONTACT:
            nextState = {isFetching: false}
            //Locate our existing object and replace with the new one
            nextState.items = state.items.map(t =>
                updateLocalContact(t, action)
            )

            return Object.assign({}, state, nextState)

        case CONTACT_SAVE_FAILED:
            console.log('save error')

            return Object.assign({}, state, {isFetching: false, errorMessage: action.response.statusText})

        case FETCH_CONTACTS:
            return Object.assign({}, state, {
                isFetching: true
            })

        case RECEIVE_CONTACTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.contacts
                //tags: extractTags(action.contacts)
            })

        case FETCH_CONTACTS_FAILURE:
            console.log(action.response)
            return Object.assign({}, state, {
                isFetching: false
            })

        case DELETE_CONTACT:
            console.log('removing item ', action.contactId)

            let nextState = {}
            //Locate our object and filter it out
            nextState.items = state.items.filter(t =>
                (t.id !== action.contactId)
            )

            return Object.assign({}, state, nextState)

        default:
            return state
    }
}

export default contacts