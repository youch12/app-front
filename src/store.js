import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import notificationsReducer from 'containers/AppHeader/behavior';
import productsListPageReducer from 'pages/Products/ListPage/behavior';

import userInfosReducer from 'keycloak/behavior';

import { reducer as formReducer } from 'redux-form'

import thunk from 'redux-thunk';

const node1reducer = combineReducers({
    notifications: notificationsReducer,
    form: formReducer,
    userInfos: userInfosReducer,
    productsListPage: productsListPageReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(node1reducer,
    composeEnhancers(
        applyMiddleware(thunk))
);