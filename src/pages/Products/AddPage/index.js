import React from 'react';
import ProductForm from 'components/ProductForm'
import { connect } from 'react-redux';


export function AddPage() {
    return (
        <ProductForm />);
}

export default connect(null, null)(AddPage);
