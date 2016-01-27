import { combineReducers } from 'redux'
import {_} from 'lodash'
import { ADD_PING, SET_PING_TAG_FILTER, FETCH_PINGS, RECEIVE_PINGS, FETCH_PINGS_FAILURE, SAVED_PING,
    PING_SAVE_FAILED, POPULATE_PING_ADD_FORM, SET_PING_EDIT_MODE, UPDATE_PING, PING_REMOVED } from './../actions/pings'


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

const initialState = {isFetching: false, filterTag:null, items:[], tags:[]}

//Process changes to pings
function pings(state = initialState, action) {
    let nextState = {}
    switch (action.type) {
        case ADD_PING:

            var pings = [
                ...state.items,
                {
                    id: action.draftPingId,
                    name: action.name,
                    isSaving: action.isSaving,
                    description: 'default description',
                    completed: false,
                    editMode: false,
                    tags: []
                }
            ]
            return {isFetching: true, items: pings, tags:extractTags(pings)}

        case SAVED_PING:
            nextState = {isFetching: false}
            //Locate our temporary object and replace with the proper one from the api
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
                lastUpdated: action.receivedAt,
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

        case UPDATE_PING:
            action.state = false;
            nextState = {isFetching: false}
            //Locate our temporary object and replace with the proper one from the api
            nextState.items = state.items.map(t =>
                setPingEditMode(t, action)
            )

            return Object.assign({}, state, nextState)

        case SET_PING_TAG_FILTER:
            return Object.assign({}, state, {
                filterTag: action.tag
            })

        case PING_SAVE_FAILED:
            console.log('save error')

            nextState = {isFetching: false}

            return Object.assign({}, state, nextState)

        case PING_REMOVED:
            console.log('removing item ', action.pingId)

            nextState = {}
            //Locate our temporary object and filter it out
            nextState.items = state.items.filter(t =>
                (t.id !== action.pingId)
            )

            return Object.assign({}, state, nextState)

        default:
            return state
    }
}

export default pings