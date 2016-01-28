
/*
 * action types
 * These are the various actions that can occur, they are used in the creators below
 */

export const ADD_PING = 'ADD_PING'
export const UPDATE_PING = 'UPDATE_PING'
export const DELETE_PING = 'DELETE_PING'
export const SET_PING_TAG_FILTER = 'SET_PING_TAG_FILTER'
export const SET_PING_EDIT_MODE = 'SET_PING_EDIT_MODE'
export const FETCH_PINGS = 'FETCH_PINGS'
export const FETCH_PINGS_FAILURE = 'FETCH_PINGS_FAILURE'
export const RECEIVE_PINGS = 'RECEIVE_PINGS'
export const PING_SAVE_FAILED = 'PING_SAVE_FAILED'
export const POPULATE_PING_ADD_FORM = 'POPULATE_PING_ADD_FORM'
export const PING_DELETE_FAILED = 'PING_DELETE_FAILED'


/*
 * action creators
 * each action has a type which is what action takes place within the reducers
 */

const defaultFetchHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

let draftPingId = 0;
export function savePing(name) {

    //We need a number that wont clash with the ids from the server
    let localPingId = 'local-'+draftPingId++

    return dispatch => {

        //Add it immediately
        dispatch(addLocalPing(name, localPingId))

        return fetch('/pings', {
            method: 'POST',
            credentials: 'include',
            headers: defaultFetchHeaders,
            body: JSON.stringify({
                name
            })
        })
        .then(fetchCheckStatus)
        .then(response => response.json())
        .then(json => dispatch(updateLocalPing(localPingId, json)))
        .catch(error => {
            //Not sure whats going on here - validation failures end up here but according to the spec they
            // shouldn't cause the promise to fail
            dispatch(pingSaveFailed(localPingId, error.response))
            dispatch(deleteLocalPing(localPingId))
        })
    }
}

//Add a new ping locally
export function addLocalPing(name, draftPingId) {
    return {
        type: ADD_PING,
        isSaving: true,
        name,
        draftPingId
    };
}

//Update a ping with new data
export function updateLocalPing(draftPingId, data) {
    return {
        type: UPDATE_PING,
        draftPingId,
        ping: data
    }
}

//Saving to the api failed
export function pingSaveFailed(draftPingId, response) {
    return {
        type: PING_SAVE_FAILED,
        draftPingId,
        response
    }
}

//Deleting from the api failed
export function pingDeleteFailed(pingId, response) {
    return {
        type: PING_DELETE_FAILED,
        pingId,
        response
    }
}

//Delete a ping
export function deletePing(pingId) {
    return dispatch => {

        //We could remove immediately but we then need a copy to put back if the action fails,
        //easier to keep this one basic

        return fetch('/pings/' + pingId, { method: 'DELETE',
            credentials: 'include', headers: defaultFetchHeaders
        })
        .then(json => dispatch(deleteLocalPing(pingId)))
        .catch(response => dispatch(pingDeleteFailed(pingId, response)))
    }
}

//delete the local ping record
export function deleteLocalPing(pingId) {
    return {
        type: DELETE_PING,
        pingId
    }
}

//request the pings from the api
export function fetchPings() {

    //This uses "thunk" middleware to allow async process to fit into the redux flow
    return dispatch => {

        //fire a message now so we can record that a request is taking place
        dispatch(requestPings())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('/pings', {credentials: 'include', headers: defaultFetchHeaders})
            .then(response => response.json())
            //if needed multiple dispatch calls can be made
            .then(json => dispatch(receivePings(json)))
            .catch(response => dispatch(receiveError(response)))
    }
}

//update a ping with the api
export function updatePing(pingId, details) {
    //console.log("Updating ping", details);

    return dispatch => {

        return fetch('/pings/' + pingId, { method: 'PUT',
            credentials: 'include', headers: defaultFetchHeaders, body: JSON.stringify({
                ...details
            })
        })
        .then(response => response.json())
        .then(json => dispatch(updateLocalPing(pingId, json)))
        .then(json => dispatch(setPingEditMode(pingId, false)))
        .catch(response => dispatch(pingSaveFailed(pingId, response)))
    }
}

//a request from the api is in progress
export function requestPings() {
    return {
        type: FETCH_PINGS
    }
}

//handle the pings from the api
export function receivePings(data) {
    return {
        type: RECEIVE_PINGS,
        pings: data
    }
}

//handle the error from the api
export function receiveError(response) {
    return {
        type: FETCH_PINGS_FAILURE,
        response: response
    }
}

//toggle the edit mode for a ping
export function setPingEditMode(id, state) {
    return { type: SET_PING_EDIT_MODE, id, state }
}

//filter the displayed ping results
export function filterByTag(tag) {
    return { type: SET_PING_TAG_FILTER, tag }
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