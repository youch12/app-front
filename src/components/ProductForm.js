import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'productRef',
        'productTitle',
        'productQuantity',
        'productPrice'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    return errors
}

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    )

const renderCheckbox = ({ input, label }) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)

const renderNumberField = ({

    meta: { touched, error },
    children,
    label,
    inputAdornment,
    input,
    ...custom
}) => {
    return (

        <FormControl error={touched && !!error}>
            <InputLabel htmlFor="adornment-amount">{label}</InputLabel>
            <Input
                {...input}
                {...custom}
                startAdornment={<InputAdornment position="start">{inputAdornment}</InputAdornment>}
            />
        </FormControl>
    )
}



const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <FormControl error={touched && error}>
            <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
            <Select
                native
                {...input}
                {...custom}
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple'
                }}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    )

const useStyles = makeStyles(theme => ({
    formField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ProductForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.formField}>
                <Field
                    name="productRef"
                    component={renderTextField}
                    label="Product Ref"

                />
            </div>
            <div className={classes.formField}>
                <Field name="productTitle" component={renderTextField} label="Title" />
            </div>
            <div className={classes.formField}>
                <Field name="productDescription" component={renderTextField} label="Description" />
            </div>
            <div className={classes.formField}>
                <Field name="productImageUrl" component={renderTextField} label="Image Url"

                    multiline
                    rowsMax="4"
                    margin="normal" />
            </div>
            <div className={classes.formField}>
                <Field
                    name="productCategory"
                    component={renderSelectField}
                    label="Category"
                >
                    <option value="" />
                    <option value="Food">Food</option>
                    <option value="Home">Home</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Entertainment">entertainment</option>
                    <option value="Tech">Tech</option>
                </Field>
            </div>
            <div className={classes.formField}>
                <Field name="productIsActive" component={renderCheckbox} label="Is Active" />
            </div>
            <div className={classes.formField}>
                <Field
                    name="productQuantity"
                    component={renderNumberField}
                    label="Product Quantity"
                    inputAdornment="+/-"

                />
            </div>

            <div className={classes.formField}>
                <Field
                    name="productPrice"
                    component={renderNumberField}
                    inputAdornment="$"
                    label="Product Price"
                />
            </div>
            <div className={classes.formField}>

                <Button
                    className={classes.button}
                    type="submit" disabled={pristine || submitting}
                    variant="contained"
                    color="secondary"
                    size="small">
                    Submit
                </Button>
                <Button
                    className={classes.button}
                    type="button" disabled={pristine || submitting} onClick={reset}
                    variant="contained"
                    color="secondary"
                    size="small">
                    Clear Values
                </Button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'productForm', // a unique identifier for this form
    validate
})(ProductForm)