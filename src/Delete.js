import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {deleteItem} from './actions'
import {Link} from 'react-router-dom'

const Delete = props => {

    const onSubmit = () => {
        props.deleteItem(props.shelf,props.id)
    }

    const content = () => {
        return `Are you sure you want to delete this label`
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visibe active">
            <div className="ui standard modal visible active">
                <div className="header">Delete Label</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    <button onClick={onSubmit} className="ui button negative">Delete</button>
                    <div onClick={() => window.location.href=`/item/${props.shelf}`} className="ui button">Cancel</div>
                </div>
            </div>
        </div> 
    ,document.querySelector('#delete'))
}

export default connect(null,{deleteItem})(Delete)