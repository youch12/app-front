import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import notificationsReducer from 'containers/AppHeader/behavior';
import productsPageReducer from 'pages/Products/behavior';
import userInfosReducer from 'keycloak/behavior';

import { reducer as formReducer } from 'redux-form'

import thunk from 'redux-thunk';

const node1reducer = combineReducers({
    notifications: notificationsReducer,
    form: formReducer,
    userInfos: userInfosReducer,
    productsPage: productsPageReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(node1reducer,
    composeEnhancers(
        applyMiddleware(thunk))
);