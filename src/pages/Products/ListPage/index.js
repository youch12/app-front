import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from 'components/Card';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom'


import {
    loadProductsList
} from './behavior';
import { Button } from '@material-ui/core';


export function ProductsPage(props) {


    useEffect(() => {
        props.loadProductsList();

    }, []);

    const { products, loading, errorOccured } = props;

    if (loading)
        return <CircularProgress />

    if (errorOccured)
        return <Alert severity="error">An error Occured</Alert>


    return <div>
        <Button
            color="primary"
            size="small">
            <Link to="/products/add">Add</Link>
        </Button>
        {products.map(oneElement =>

            (<Card key={oneElement.productRef}
                title={oneElement.productTitle}
                imageUrl={oneElement.productImageUrl}
            />))}</div>

}


const mapStateToProps = (state) => {
    const { products, loading, errorOccured } = state.productsListPage;
    return {
        products, loading, errorOccured
    }
}

export default connect(mapStateToProps, { loadProductsList })(ProductsPage);
