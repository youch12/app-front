import React from 'react';
import { Switch, Route } from "react-router-dom";
import ProductsPage from 'pages/Products';

export default function () {
    return (
        <Switch>
            <Route exact path="/" component={ProductsPage} />
        </Switch>
    );
}