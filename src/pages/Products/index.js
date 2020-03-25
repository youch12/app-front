import React, { useEffect } from 'react';
import KeycloakService from 'keycloak';
import store from 'store';
import axios from 'axios';
import { connect } from 'react-redux';

import {

    LIST_PRODUCTS_BEGIN,
    LIST_PRODUCTS_SUCCESS,
    LIST_PRODUCTS_ERROR,
} from './behavior';


export function ProductsPage() {


    useEffect(() => {
        store.dispatch({ type: LIST_PRODUCTS_BEGIN });
        axios.get('http://localhost:8081/api/products',

            {
                headers: {
                    Authorization: 'Bearer ' + KeycloakService.getToken()
                }
            })
            .then((response) => {
                // handle success
                store.dispatch({ type: LIST_PRODUCTS_SUCCESS, data: response.data });
                console.log(response);
            })
            .catch((error) => {
                // handle error
                store.dispatch({ type: LIST_PRODUCTS_ERROR });
                console.log(error);
            });


    }, []);


    return <div><h2>Products Page</h2></div>


}


const mapStateToProps = (state) => {
    const { products, loading, errorOccured } = state.productsPage;
    return {
        products, loading, errorOccured
    }
}

export default connect(mapStateToProps, null)(ProductsPage);
