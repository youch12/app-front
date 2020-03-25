export const LIST_PRODUCTS_BEGIN = "LIST_PRODUCTS_BEGIN";
export const LIST_PRODUCTS_SUCCESS = "LIST_PRODUCTS_SUCCESS";
export const LIST_PRODUCTS_ERROR = "LIST_PRODUCTS_ERROR";

const initialState = {
    products: [],
    loading: false,
    errorOccured: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                errorOccured: true,
                products: action.data,
            };

        case LIST_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                errorOccured: true,
            };
        default:
            return state;
    }
};
