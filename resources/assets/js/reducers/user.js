
import { FETCH_USER, RECEIVE_USER, FETCH_USER_FAILURE } from './../actions/user'

const initialState = {isFetching: false, name: 'John Doe', avatar: null, pingBaseUrl: null, locale: 'en-GB'}

//Process changes to pings
function user(state = initialState, action) {
    switch (action.type) {

        case RECEIVE_USER:
            return Object.assign({}, state, {
                isFetching: false,
                name: action.user.name,
                avatar: action.user.avatar,
                email: action.user.email,
                pingBaseUrl: action.user.pingBaseUrl
            })

        default:
            return state
    }
}

export default user