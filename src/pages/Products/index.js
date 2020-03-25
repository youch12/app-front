import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import store from 'store';
import axios from 'axios';
import Card from 'components/Card';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import {

    LIST_PRODUCTS_BEGIN,
    LIST_PRODUCTS_SUCCESS,
    LIST_PRODUCTS_ERROR,
} from './behavior';


export function ProductsPage(props) {


    useEffect(() => {
        store.dispatch({ type: LIST_PRODUCTS_BEGIN });
        axios.get('api/products')
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

    const { products, loading, errorOccured } = props;

    if (loading)
        return <CircularProgress />

    if (errorOccured)
        return <Alert severity="error">An error Occured</Alert>


    return <div>
        {products.map(oneElement =>

            (<Card key={oneElement.productRef}
                title={oneElement.productTitle}
                imageUrl={oneElement.productImageUrl}
            />))}</div>




}


const mapStateToProps = (state) => {
    const { products, loading, errorOccured } = state.productsPage;
    return {
        products, loading, errorOccured
    }
}

export default connect(mapStateToProps, null)(ProductsPage);
