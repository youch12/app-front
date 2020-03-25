import Keycloak from 'keycloak-js'
import store from 'store';
import { setUser, resetUser } from './behavior';

const _kc = Keycloak({
    "realm": "dev",
    "url": "http://localhost:8080/auth",
    "clientId": "app-front",
    "public-client": true

});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'login-required',
    })
        .then((authenticated) => {
            if (authenticated) {
                store.dispatch(setUser(getUserInfos()))
                onAuthenticatedCallback();
            } else {
                console.warn("not authenticated!");
                doLogin();
            }
        })
};

const doLogin = _kc.login;

const doLogout = () => {
    store.dispatch(resetUser());
    _kc.logout();
}

const getToken = () => _kc.token;

const updateToken = (successCallback) => {
    return _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin)
};


const getUserInfos = () => ({
    roles: _kc.tokenParsed.realm_access.roles,
    fullName: _kc.tokenParsed.name,
    userName: _kc.tokenParsed.preferred_username,
    firstName: _kc.tokenParsed.given_name,
    lastName: _kc.tokenParsed.family_name,
    email: _kc.tokenParsed.email,
})


export default {
    initKeycloak,
    doLogin,
    doLogout,
    getToken,
    updateToken,
    getUserInfos,
}