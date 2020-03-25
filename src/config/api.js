import request from "axios";

export const get = (url, action) => dispatch =>
    dispatch(callApi(url, { data: {} }, action));

export const post = (url, data, action, successMessage) => dispatch =>
    dispatch(callApi(url, { method: "POST", data }, action, successMessage));

export const put = (url, data, action, successMessage) => dispatch =>
    dispatch(callApi(url, { method: "PUT", data }, action, successMessage));

export const deleteApi = (url, action, successMessage) => dispatch =>
    dispatch(callApi(url, { method: "DELETE" }, action, successMessage));

export const callApi = (url, config, action, successMessage = '') => dispatch => {
    dispatch({
        type: action.begin
    });
    let requestUrl = url;
    request(requestUrl, config)
        .then(response => {
            dispatch({
                type: action.success,
                response: response.data
            });


        })
        .catch(error => {
            console.debug("server.request.error", error);
            dispatch({
                type: action.error,
                error
            });
        });
};

export const getActionTypes = (action) => {
    return {
        begin: `${action}_BEGIN`,
        success: `${action}_SUCCESS`,
        error: `${action}_ERROR`,
    }
};
