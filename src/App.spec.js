import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import Copyright from 'components/Copyright'
import Container from '@material-ui/core/Container';
import MainLayout from 'containers/MainLayout';
import AppHeader from 'containers/AppHeader';
import AppSideBar from 'containers/AppSideBar';
import App from "./App";


describe('App: index', () => {


    it('Should render children components only when rendering in shallow mode', () => {

        // When
        const container = shallow(
            <App />);


        // Then

        expect(container.find(Router).length).to.equal(1);
        expect(container.find('main').length).to.equal(1);
        expect(container.find('div').length).to.equal(2);

        expect(container.find(AppHeader).length).to.equal(1);
        expect(container.find(AppSideBar).length).to.equal(1);
        expect(container.find(Container).length).to.equal(1);
        expect(container.find(Copyright).length).to.equal(1);
        expect(container.find(MainLayout).length).to.equal(1);
    });


    it('This will fail', () => {

        // When
        const container = mount(
            <App />);
        /*
        This will try to render the AppHeader, and all its children.
        However, AppHeader is connected to the store, so we need to 
        fake a store for this test to run*/
    });



});
