import { expect } from "chai"
import reducer, {
    ADD_PRODUCT_ACTIONS,
    RESET_FORM_PAGE,
    addProduct, resetPage,
} from './behavior'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from "sinon";
import * as api from "config/api";

describe('App Product page : Reducer', () => {

    it('should not handle unsupported action', () => {
        // Given
        const initialState = {
            creationLoading: false,
            creationSucces: false,
            creationError: false,
        };
        const action = {
            type: 'ACTION_TO_IGNORE',
        };

        // When
        const nextState = reducer(initialState, action);
        // Then
        expect(nextState).to.equal(initialState);
    });


    it('should handle ADD_PRODUCT_ACTIONS_BEGIN', () => {
        // Given
        const initialState = {};
        let action = {
            type: ADD_PRODUCT_ACTIONS.begin
        };

        // When
        const nextState = reducer(initialState, action);

        // Then
        expect(nextState).to.deep.equal({
            creationLoading: true,
            creationSucces: false,
            creationError: false,
        });

    });

    it('should handle ADD_PRODUCT_ACTIONS_SUCCESS', () => {
        // Given
        const initialState = {};
        let action = {
            type: ADD_PRODUCT_ACTIONS.success
        };

        // When
        const nextState = reducer(initialState, action);

        // Then
        expect(nextState).to.deep.equal({
            creationLoading: false,
            creationSucces: true,
            creationError: false,
        });

    });

    it('should handle ADD_PRODUCT_ACTIONS_ERROR', () => {
        // Given
        const initialState = {};
        let action = {
            type: ADD_PRODUCT_ACTIONS.error
        };

        // When
        const nextState = reducer(initialState, action);

        // Then
        expect(nextState).to.deep.equal({
            creationLoading: false,
            creationSucces: false,
            creationError: true,
        });

    });

    it('should handle RESET_FORM_PAGE', () => {
        // Given
        const initialState = {
            creationLoading: false,
            creationSucces: true,
            creationError: false,
        };
        const action = {
            type: RESET_FORM_PAGE,
        };

        // When
        const nextState = reducer(initialState, action);

        // Then
        expect(nextState).to.deep.equal({
            creationLoading: false,
            creationSucces: false,
            creationError: false,
        });
    });

});
describe('Action creators', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store;
    let sandbox;
    afterEach(() => sandbox.restore());

    beforeEach(() => {
        store = mockStore({});
        sandbox = sinon.createSandbox()
    });

    it('Should dispatch an reset action on resetPage call', () => {
        // Given
        const expectedActions = [{
            type: RESET_FORM_PAGE,

        }];
        // When
        store.dispatch(resetPage());
        // Then
        expect(store.getActions().length).to.eql(1);
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0]);

    });

    it('Should handle addProduct and dispatch response action', () => {
        // Given
        const expectedActions = [{
            type: "ADD_PRODUCT_ACTIONS_BEGIN",

        }, { type: "ADD_PRODUCT_ACTIONS_ERROR" }
        ];

        sandbox.stub(api, 'post').returns((dispatch) => {
            dispatch({
                type: ADD_PRODUCT_ACTIONS.begin,

            });
            dispatch(
                { type: ADD_PRODUCT_ACTIONS.error });
        });

        // When
        store.dispatch(addProduct({ productRef: "Ref123" }));
        // Then

        console.log("store.getActions() ", store.getActions())
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0]);
        expect(store.getActions()[1]).to.deep.equal(expectedActions[1])

    });

});