import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import pingsReducer from './reducers/pings';
import contactsReducer from './reducers/contacts';
import userReducer from './reducers/user';
import DevToolsApp from './components/DevToolsApp';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { syncHistory, routeReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'


const reducer = combineReducers({
    pings: pingsReducer,
    contacts: contactsReducer,
    routing: routeReducer,
    user: userReducer
})

//const history = createHistory()
const reduxRouterMiddleware = syncHistory(browserHistory)


const loggerMiddleware = createLogger()

const finalCreateStore = compose(
    //Setup existing middlewares
    applyMiddleware(thunkMiddleware, loggerMiddleware, reduxRouterMiddleware),
    //Apply the devtools - NOT IN PRODUCTION!
    DevToolsApp.instrument()
)(createStore);



export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);

    // Required for replaying actions from devtools to work
    reduxRouterMiddleware.listenForReplays(store)

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    //if (module.hot) {
    //    module.hot.accept('./reducers', () =>
    //        store.replaceReducer(require('./reducers')/*.default if you use Babel 6+ */)
    //    );
    //}

    return store;
}