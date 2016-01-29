
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const RECEIVE_USER = 'RECEIVE_USER'

const defaultFetchHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export function fetchUser() {

    //This uses "thunk" middleware to allow async process to fit into the redux flow
    return dispatch => {

        //fire a message now so we can record that a request is taking place
        dispatch(requestUser())

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch('/site', {credentials: 'include', headers: defaultFetchHeaders})
            .then(response => response.json())
            //if needed multiple dispatch calls can be made
            .then(json => dispatch(receiveUser(json)))
            .catch(response => dispatch(receiveError(response)))
    }
}

//a request from the api is in progress
export function requestUser() {
    return {
        type: FETCH_USER
    }
}

//handle the pings from the api
export function receiveUser(data) {
    return {
        type: RECEIVE_USER,
        user: data
    }
}

//handle the error from the api
export function receiveError(response) {
    return {
        type: FETCH_USER_FAILURE,
        response: response
    }
}