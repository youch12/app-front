export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const initialState = {
    roles: [],
    fullName: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.userInfos
            };

        case RESET_USER:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
}

export const setUser = (userInfos) => ({ type: SET_USER, userInfos })

export const resetUser = () => ({ type: RESET_USER })