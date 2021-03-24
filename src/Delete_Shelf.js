import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {delete_shelf} from './actions'
import {Link} from 'react-router-dom'

const Delete_Shelf = props => {

    const onSubmit = () => {
        const uid = {
            "uid": localStorage.getItem("CurrentUser")
        }
        props.delete_shelf(props.shelf,uid)
    }

    const content = () => {
        return <p></p>
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visibe active">
            <div className="ui standard modal visible active">
                <div className="header">Delete {props.shelf}</div>
                <div className="content">
                    Are you sure you want to delete {props.shelf}
                </div>
                <div className="actions">
                    <button onClick={onSubmit} className="ui button negative">Delete</button>
                    <div onClick={() => window.location.href=`/catalogs`} className="ui button">Cancel</div>
                </div>
            </div>
        </div> 
    ,document.querySelector('#delete'))
}

export default connect(null,{delete_shelf})(Delete_Shelf)