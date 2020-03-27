import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from "react-router-dom";
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Card from 'components/Card';
import { ProductsPage } from './index';


describe('ListPage / Cmp', () => {

    const props = {
        products: [{
            productId: "a232c568c", productRef: "ProductRef",
            productTitle: "Title1",
            productImageUrl: "imageUrl"
        },
        {
            productId: "87b35c46d", productRef: "ProductRef2",
            productTitle: "Title2",
            productImageUrl: "imageUrl2"
        }],
        loading: false, errorOccured: false,
        loadProductsList: sinon.spy(),
    };

    it('Should render product cards and add button link, on shallow mode', () => {
        // When
        const container = shallow(
            <ProductsPage {...props} />);


        // Then
        expect(container.find("div").length).to.equal(1);
        expect(container.find(Button).length).to.equal(1);
        expect(container.find(Link).length).to.equal(1);
        expect(container.find(Card).length).to.equal(2);
        expect(container.find(CardContent).length).to.equal(0);
        // console.log("mount ", container.debug())


    });

    it('Should render all children, on mount mode', () => {
        // When
        /* To mount our page, we need router since our page has a link */
        const container = mount(
            <Router>
                <ProductsPage {...props} />
            </Router>
        );


        // Then
        expect(container.find(CardContent).length).to.equal(2);
        // console.log("mount ", container.debug())

    });



});
