import React, { useEffect } from 'react';
import ProductForm from 'components/ProductForm'
import { connect } from 'react-redux';
import { addProduct, resetPage } from './behavior';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


export function AddPage(props) {


    function handleFormSubmit(values) {
        props.addProduct(values);
    }


    useEffect(() => {
        if (props.creationSucces)
            props.history.push("/");

    }, [props.creationSucces])

    useEffect(() => {

        return () => {
            console.log("Reseting")
            props.resetPage();
        }

    }, [])


    const { creationLoading, creationError } = props;

    if (creationLoading)
        return <CircularProgress />

    return (

        <div>
            {creationError && <Alert severity="error">An error Occured</Alert>}
            <ProductForm onSubmit={handleFormSubmit} />);
        </div>);
}

const mapStateToProps = (state) => {
    const { creationLoading,
        creationSucces,
        creationError, } = state.productsAddPage;
    return {
        creationLoading,
        creationSucces,
        creationError,
    }
}

export default connect(mapStateToProps, { addProduct, resetPage })(AddPage);