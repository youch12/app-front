import addPageReducer from "./AddPage/behavior";
import listPageReducer from "./ListPage/behavior";

import { combineReducers } from 'redux'

export default combineReducers({
    addPage: addPageReducer,
    listPage: listPageReducer
});