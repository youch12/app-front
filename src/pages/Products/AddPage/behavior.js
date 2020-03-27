import { post, getActionTypes } from "config/api";

export const ADD_PRODUCT_ACTIONS = getActionTypes("ADD_PRODUCT_ACTIONS");
export const RESET_FORM_PAGE = "RESET_FORM_PAGE";

// Action creators
export function addProduct(values) {
    return (dispatch) => {
        dispatch(post("api/products", values, ADD_PRODUCT_ACTIONS));
    };
}

export function resetPage() {

    return (dispatch) => {
        dispatch({ type: RESET_FORM_PAGE });
    };
}

const initialState = {
    creationLoading: false,
    creationSucces: false,
    creationError: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT_ACTIONS.begin:
            return {
                creationLoading: true,
                creationSucces: false,
                creationError: false,
            };

        case ADD_PRODUCT_ACTIONS.success:
            return {
                creationLoading: false,
                creationSucces: true,
                creationError: false,
            };

        case ADD_PRODUCT_ACTIONS.error:
            return {
                creationLoading: false,
                creationSucces: false,
                creationError: true,
            };

        case RESET_FORM_PAGE:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
