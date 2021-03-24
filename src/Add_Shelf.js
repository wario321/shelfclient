
import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import history from './history'
import {add_shelf} from './actions'
import { connect } from "react-redux";

const Add_Shelf = (props) => {

    const [name,setName] = useState("")
    const [image,setImage] = useState({raw : ""})
    
    const handleFile = async (e) => {
        if(e.target.files.length){
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setImage({
                raw : reader.result
                })
            }
            
        }
    }

    const handleName = async (e) => {
        setName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const format_data = {
            "uid": localStorage.getItem('CurrentUser'),
            "shelf_name": name,
            "image": image.raw
        }
        props.add_shelf(format_data)
    }
    
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div className="content">
                    <form className="ui form error" name="test_form">
                        <div className="field"><label>Shelf Name</label><input type="text" name="shelf_name" onChange={handleName} ></input></div>
                        <div className="field"><label>Image</label><input type="file" name="image_edit" accept="image/*" onChange={handleFile} ></input></div>
                        <button className="ui button primary" onClick={handleSubmit}>Submit</button>
                        <div className="ui right floated button" onClick={() => history.goBack()}>Cancel</div>
                    </form>
                </div>
            </div>
        </div>
    ,document.querySelector("#edit"))

}


export default connect(null,{add_shelf})(Add_Shelf)