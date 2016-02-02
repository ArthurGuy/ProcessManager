import { combineReducers } from 'redux'
import { _ } from 'lodash'

import { ADD_PING, SET_PING_TAG_FILTER, FETCH_PINGS, RECEIVE_PINGS, FETCH_PINGS_FAILURE, UPDATE_PING,
    PING_SAVE_FAILED, POPULATE_PING_ADD_FORM, SET_PING_EDIT_MODE, DELETE_PING } from './../actions/pings'

const initialState = {isFetching: false, filterTag:null, items:[], tags:[]}

//Check over all the pings for our local id, when found replace with the new object
function updateLocalPing(state, action) {
    if (state.id !== action.draftPingId) {
        return state
    }
    return action.ping
}

//Check over all the pings for our local id, when found replace with the new object
function setPingEditMode(state, action) {
    if (state.id === action.id) {
        state.editMode = action.state
        return state
    }
    return state
}

function extractTags(pings) {
    var tags = []
    for (var i in pings) {
        tags = _.union(tags, pings[i].tags)
    }
    return tags
}



//Process changes to pings
export default function pings(state = initialState, action) {
    let nextState = {}
    switch (action.type) {
        case ADD_PING:

            var pings = [
                ...state.items,
                {
                    id: action.draftPingId,
                    name: action.name,
                    isSaving: action.isSaving,
                    description: 'saving new ping...',
                    completed: false,
                    editMode: false,
                    tags: [],
                    active: true,
                    error: false,
                    frequency: 'day',
                    frequency_value: 1,
                    last_ping: "0000-00-00 00:00:00"
                }
            ]
            return {isFetching: true, items: pings, errorMessage:null, tags:extractTags(pings)}

        case UPDATE_PING:
            nextState = {isFetching: false}
            //Locate our existing object and replace with the new one
            nextState.items = state.items.map(t =>
                updateLocalPing(t, action)
            )

            return Object.assign({}, state, nextState)

        case FETCH_PINGS:
            return Object.assign({}, state, {
                isFetching: true
            })

        case RECEIVE_PINGS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.pings,
                tags: extractTags(action.pings)
            })

        case FETCH_PINGS_FAILURE:
            console.log(action.response)
            return Object.assign({}, state, {
                isFetching: false
            })

        case SET_PING_EDIT_MODE:
            nextState = {isFetching: false}
            //Locate our temporary object and replace with the proper one from the api
            nextState.items = state.items.map(t =>
                setPingEditMode(t, action)
            )

            return Object.assign({}, state, nextState)

        /*
        case UPDATE_PING:
            action.state = false;
            nextState = {isFetching: false}
            //Locate our temporary object and replace with the proper one from the api
            nextState.items = state.items.map(t =>
                setPingEditMode(t, action)
            )

            return Object.assign({}, state, nextState)
        */

        case SET_PING_TAG_FILTER:
            return Object.assign({}, state, {
                filterTag: action.tag
            })

        case PING_SAVE_FAILED:
            console.log('save error')

            return Object.assign({}, state, {isFetching: false, errorMessage: action.response.statusText})

        case DELETE_PING:
            console.log('removing item ', action.pingId)

            nextState = {}
            //Locate our temporary object and filter it out
            nextState.items = state.items.filter(t =>
                (t.id !== action.pingId)
            )

            nextState.tags = extractTags(nextState.items)

            return Object.assign({}, state, nextState)

        default:
            return state
    }
}
