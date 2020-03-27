import React, { useEffect } from 'react';
import ProductForm from 'components/ProductForm'
import { connect } from 'react-redux';
import { addProduct, resetPage } from './behavior';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import * as selectors from './selectors';


export function AddPage(props) {


    function handleFormSubmit(values) {
        props.addProduct(values);
    }


    useEffect(() => {
        console.log("Triggered UseEffect with ", props)
        if (props.creationSucces) {
            console.log("Now to redirect")
            props.history.push("/");
        }

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

export const mapStateToProps = (state) => {
    return {
        creationLoading: selectors.isProcessingCreation(state),
        creationSucces: selectors.isCreationSuccess(state),
        creationError: selectors.hasErrorOcurred(state),
    }
}

export default connect(mapStateToProps, { addProduct, resetPage })(AddPage);