
/*
 * action types
 * These are the various actions that can occur, they are used in the creators below
 */

export const ADD_PING = 'ADD_PING'
export const UPDATE_PING = 'UPDATE_PING'
export const PING_REMOVED = 'PING_REMOVED'
export const SAVED_PING = 'SAVED_PING'
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

export function addLocalPing(name, draftPingId) {
    return {
        type: ADD_PING,
        isSaving: true,
        name,
        draftPingId
    };
}

export function pingSaved(draftPingId, data) {
    return {
        type: SAVED_PING,
        draftPingId,
        ping: data,
        receivedAt: Date.now()
    }
}

export function pingSaveFailed(draftPingId, response) {
    return {
        type: PING_SAVE_FAILED,
        draftPingId,
        response,
        receivedAt: Date.now()
    }
}

export function pingDeleteFailed(pingId, response) {
    return {
        type: PING_DELETE_FAILED,
        pingId,
        response
    }
}


let draftPingId = 0;
export function savePing(name) {

    //We need a number that wont clash with the ids from the server
    let localPingId = 'local-'+draftPingId++;

    return dispatch => {

        //Add it immediately
        dispatch(addLocalPing(name, localPingId))

        return fetch('/pings', { method: 'POST',
            credentials: 'include', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                name
            })
        })
            .then(fetchCheckStatus)
            .then(response => response.json())
            .then(json => dispatch(pingSaved(localPingId, json)))
            .catch(response => {
                dispatch(pingSaveFailed(localPingId, response))
                dispatch(pingRemoved(localPingId))
            })
    }
}

export function deletePing(pingId) {
    return dispatch => {

        //Add it immediately
        //dispatch(addLocalPing(name, pingId))

        return fetch('/pings/' + pingId, { method: 'DELETE',
            credentials: 'include', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(json => dispatch(pingRemoved(pingId)))
        .catch(response => dispatch(pingDeleteFailed(pingId, response)))
    }
}

export function pingRemoved(pingId) {
    return {
        type: PING_REMOVED,
        pingId
    }
}

export function requestPings() {
    return {
        type: FETCH_PINGS
    }
}

export function receivePings(data) {
    return {
        type: RECEIVE_PINGS,
        pings: data,
        receivedAt: Date.now()
    }
}

export function receiveError(response) {
    return {
        type: FETCH_PINGS_FAILURE,
        response: response
    }
}

export function fetchPings() {

    //This uses "thunk" middleware to allow async process to fit into the redux flow
    return dispatch => {

        //fire a message now so we can record that a request is taking place
        dispatch(requestPings())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('/pings', {credentials: 'include', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            //if needed multiple dispatch calls can be made
            .then(json => dispatch(receivePings(json)))
            .catch(response => dispatch(receiveError(response)))
    }
}

export function setPingEditMode(id, state) {
    return { type: SET_PING_EDIT_MODE, id, state }
}

export function updatePing(pingId, details) {
    //console.log("Updating ping", details);

    return dispatch => {

        //Add it immediately
        //dispatch(addLocalPing(name, pingId))

        return fetch('/pings/' + pingId, { method: 'PUT',
            credentials: 'include', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                ...details
            })
        })
            //.then(fetchCheckStatus)
            .then(response => response.json())
            //.then(json => dispatch(pingSaved(localPingId, json)))
            .then(json => dispatch(pingSaved(pingId, json)))
            .then(json => dispatch(setPingEditMode(pingId, false)))
            //.catch(response => dispatch(pingSaveFailed(pingId, response)))
    }

    //return { type: UPDATE_PING, id, details }
}

export function filterByTag(tag) {
    return { type: SET_PING_TAG_FILTER, tag }
}

//Convert errors on fechh requests into real errors
function fetchCheckStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}