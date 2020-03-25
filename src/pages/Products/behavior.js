import { get, getActionTypes } from "config/api";

const LIST_PRODUCTS_ACTIONS = getActionTypes("LIST_PRODUCTS");

// Action creators
export function loadProductsList() {

    return (dispatch) => {
        dispatch(get("api/products", LIST_PRODUCTS_ACTIONS));
    };
}

const initialState = {
    products: [],
    loading: false,
    errorOccured: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PRODUCTS_ACTIONS.begin:
            return {
                products: [],
                loading: true,
                errorOccured: false,
            };

        case LIST_PRODUCTS_ACTIONS.success:
            return {
                loading: false,
                errorOccured: false,
                products: action.response,
            };

        case LIST_PRODUCTS_ACTIONS.error:
            return {
                products: [],
                loading: false,
                errorOccured: true,
            };
        default:
            return state;
    }
};
