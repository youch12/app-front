import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProductsPage from 'pages/Products/ListPage';
import AddProductPage from 'pages/Products/AddPage';

export default function () {
    return (
        <Switch>
            <Route exact path="/" component={ProductsPage} />
            <Route exact path="/products/add" component={AddProductPage} />
            <Route exact path="/products/:edit" component={AddProductPage} />

        </Switch>
    );
}