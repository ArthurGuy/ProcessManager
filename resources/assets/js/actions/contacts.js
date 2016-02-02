
/*
 * action types
 * These are the various actions that can occur, they are used in the creators below
 */

export const FETCH_CONTACTS = 'FETCH_CONTACTS'
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE'
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'
export const CONTACT_DELETE_FAILED = 'CONTACT_DELETE_FAILED'
export const DELETE_CONTACT = 'DELETE_CONTACT'
export const CONTACT_SAVE_FAILED = 'CONTACT_SAVE_FAILED'
export const ADD_CONTACT = 'ADD_CONTACT'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'


/*
 * action creators
 * each action has a type which is what action takes place within the reducers
 */

const defaultFetchHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

let draftContactId = 0;
export function saveContact(contactData) {

    //We need a number that wont clash with the ids from the server
    let localContactId = 'local-'+draftContactId++

    return dispatch => {

        //Add it immediately
        dispatch(addLocalContact(contactData, localContactId))

        return fetch('/contacts', {
            method: 'POST',
            credentials: 'include',
            headers: defaultFetchHeaders,
            body: JSON.stringify(contactData)
        })
            .then(fetchCheckStatus)
            .then(response => response.json())
            .then(json => dispatch(updateLocalContact(localContactId, json)))
            .catch(error => {
                //Not sure whats going on here - validation failures end up here but according to the spec they
                // shouldn't cause the promise to fail
                dispatch(contactSaveFailed(localContactId, error.response))
                dispatch(deleteLocalContact(localContactId))
            })
    }
}

//Add a new contact locally
function addLocalContact(contactData, draftContactId) {
    return {
        type: ADD_CONTACT,
        isSaving: true,
        ...contactData,
        draftContactId
    };
}

//Saving to the api failed
function contactSaveFailed(draftContactId, response) {
    return {
        type: CONTACT_SAVE_FAILED,
        draftContactId,
        response
    }
}


//Update a ping with new data
export function updateLocalContact(draftContactId, data) {
    return {
        type: UPDATE_CONTACT,
        draftContactId,
        contact: data
    }
}

//request the pings from the api
export function fetchContacts() {

    //This uses "thunk" middleware to allow async process to fit into the redux flow
    return dispatch => {

        //fire a message now so we can record that a request is taking place
        dispatch(requestContacts())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('/contacts', {credentials: 'include', headers: defaultFetchHeaders})
            .then(response => response.json())
            //if needed multiple dispatch calls can be made
            .then(json => dispatch(receiveContacts(json)))
            .catch(response => dispatch(receiveError(response)))
    }
}

//a request from the api is in progress
function requestContacts() {
    return {
        type: FETCH_CONTACTS
    }
}

//handle the pings from the api
function receiveContacts(data) {
    return {
        type: RECEIVE_CONTACTS,
        contacts: data
    }
}

//handle the error from the api
function receiveError(response) {
    return {
        type: FETCH_CONTACTS_FAILURE,
        response: response
    }
}

//Delete a ping
export function deleteContact(contactId) {
    return dispatch => {
        return fetch('/contacts/' + contactId, { method: 'DELETE',
            credentials: 'include', headers: defaultFetchHeaders
        })
            .then(json => dispatch(deleteLocalContact(contactId)))
            .catch(response => dispatch(contactDeleteFailed(contactId, response)))
    }
}

//Deleting from the api failed
function contactDeleteFailed(contactId, response) {
    return {
        type: CONTACT_DELETE_FAILED,
        contactId,
        response
    }
}

//delete the local ping record
function deleteLocalContact(contactId) {
    return {
        type: DELETE_CONTACT,
        contactId
    }
}


//Convert errors on fetch requests into real errors
function fetchCheckStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}