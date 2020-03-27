import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AddPage, mapStateToProps } from "./index";
import { shallow, mount } from 'enzyme';
import ProductForm from 'components/ProductForm'
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';


/* Due to some limitation of enzyme library:
Read this:
https://github.com/enzymejs/enzyme/issues/2254
Some hooks are not accessible when using shallow, 
so we use mount, and because we have a redux-form that requires
a store, we're gonna pass it down using a provider */



describe('AddPage: index', () => {

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store;

    beforeEach(() => {
        store = mockStore({
            form: {
                productForm: {}
            }
        });
    });

    it('Should render form when first is loaded', () => {
        // Given
        const props = {
            creationLoading: false,
            creationSucces: false,
            creationError: false,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            }
        };

        // When
        const container = shallow(
            <AddPage {...props} />);


        // Then
        expect(container.find(ProductForm).length).to.equal(1);
    });


    it('Should display spinner when loading props is true', () => {
        // Given
        const props = {
            creationLoading: true,
            creationSucces: false,
            creationError: false,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            }
        };

        // When
        const container = shallow(
            <AddPage {...props} />);

        // Then
        expect(container.find(ProductForm).length).to.equal(0);
        expect(container.find(CircularProgress).length).to.equal(1);

    });

    it('Should error alert when error props is true', () => {
        // Given
        const props = {
            creationLoading: false,
            creationSucces: false,
            creationError: true,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            }
        };

        // When
        const container = shallow(
            <AddPage {...props} />);

        // Then
        expect(container.find(ProductForm).length).to.equal(1);
        expect(container.find(Alert).length).to.equal(1);
        expect(container.find(Alert).text()).to.equal("An error Occured");

    });

    it('Should handle form submit and call add Product function', () => {
        // Given
        const props = {
            creationLoading: false,
            creationSucces: false,
            creationError: false,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            }
        };

        // When

        const container = mount(
            <Provider store={store}>
                <AddPage {...props} />
            </Provider>);

        // Access form props and trigger the call of onSubmit
        container.find(ProductForm).props().onSubmit({ productRef: "Ref" });

        // Then
        expect(props.addProduct.callCount).to.equal(1);

    });

    it('Should redirect to main page when creation success is passed as true', () => {
        // Given
        let props = {
            creationLoading: true,
            creationSucces: false,
            creationError: false,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            }
        };

        // When
        const container = mount(
            <Provider store={store}>
                <AddPage {...props} />
            </Provider>);

        expect(props.history.push.called).to.be.false;
        // Simulate a store update by updating props

        props = {
            ...props,
            creationLoading: false,
            creationSucces: true,
        }
        container.setProps({
            children: (
                <AddPage {...props} />
            ),
        });
        // Then

        expect(props.history.push.calledWith("/")).to.be.true;
    });

    it('Should trigger a page reset when page is unmounted', () => {
        // Given
        const props = {
            creationLoading: false,
            creationSucces: false,
            creationError: false,
            addProduct: sinon.spy(),
            history: {
                push: sinon.spy(),
            },
            resetPage: sinon.spy(),
        };

        // When
        const container = mount(
            <Provider store={store}>
                <AddPage {...props} />
            </Provider>);

        container.unmount();

        // Then
        expect(props.resetPage.called).to.be.true;
    });

    it('Should match state to props', () => {

        const state = {
            pages: {
                products: {
                    addPage:
                    {
                        creationLoading: false,
                        creationSucces: true,
                        creationError: false,
                    }
                }
            }
        };
        const returnedState = mapStateToProps(state);
        expect(returnedState).to.deep.equal({
            creationLoading: false,
            creationSucces: true,
            creationError: false,
        });
    });
});
