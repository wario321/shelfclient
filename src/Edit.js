import React from 'react'
import ReactDOM from 'react-dom'
import {Field, reduxForm} from 'redux-form'
import {editItem} from './actions'
import {connect} from 'react-redux'

const renderInput2 = (field) => {
    return <div className="field">
        <label>{field.label}</label>
        <input {...field.input} /*type={field.type}*/ autoComplete="off" ></input>
        <div>{renderError2(field.meta)}</div>
    </div>
}

const renderError2 = ({error,touched}) => {
    if(touched && error){
        return (<div className="ui error message">
            <div className="header">{error}</div>
        </div>)
    }
}

const renderInput3 = (field) => {
    return <div className="field">
        
        <div className="fields">
             <div className="twelve wide field">
                <label>{field.label}</label> 
                <input {...field.input} autoComplete="off"></input>
           </div>
            <div className="four wide field">
                 <label>type</label>
                <Field name="type" component="select" className="ui fluid dropdown">
                    <option value="baht/kg">Kg/baht</option>
                    <option value="baht/pack">baht/pack</option>
                    <option value="baht">baht</option>
                </Field>
            </div>
        </div>
    </div>
}

var Edit = props => {
    const onEditSubmit = (formValue) =>{
        //console.log(`form data is ${Object.values(formValue)}`)
        //console.log(props.id)
        props.editItem(props.shelf,props.id,formValue);
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div className="content">
                    <form className="ui form error" onSubmit={props.handleSubmit(onEditSubmit)}>
                        <Field name="title" component={renderInput2} /*type="text"*/label="Enter title" />
                        <Field name="price" component={renderInput3} /*type="text"*/ label="Enter price" />
                        <Field name="promotion" component={renderInput2} /*type="text"*/ label="Enter promotion" />
                        <Field name="weight" component={renderInput2} /*type="text"*/ label="Enter weight" />
                        <button className="ui button primary" type="submit">Submit</button>
                        <div className="ui right floated button" onClick={() => {window.location.href=`/item/${props.shelf}`}}>Cancel</div>
                    </form>
                </div>
            </div>
        </div>
    ,document.querySelector("#edit"))

}

const validate = (formValue) => {
    const error = {}

    if(!formValue.title){
        error.title = "You must enter title"
    }

    if(!formValue.price){
        error.price = "You must enter price"
    }

    if(!formValue.promo){
        error.promo = "You must enter promotion"
    }

    return error
}

Edit = connect(null,{editItem})(Edit)

export default reduxForm({
    form: 'edit',validate
})(Edit);