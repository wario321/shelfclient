import { rearg } from "lodash";
import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import history from './history'
import api from './api/api'
import {edit_shelf} from './actions'
import { connect } from "react-redux";


const onEditSubmit = () => {
    return <div>Hello test test</div>
}



const Edit_Shelf = (props) => {

    const [name,setName] = useState("")
    const [img,setImg] = useState(null)
    const [image,setImage] = useState({raw : ""})

    const handleShelf = (event) => {
        event.preventDefault()
        setName(event.target.value)
        //console.log(name)
    }
    
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
        console.log("image" ,image)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("submit working")
        
        const format_data = {
            "name": name,
            "image": image.raw
        }
        props.edit_shelf(props.shelf,format_data)
    }
    
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div className="content">
                    <form className="ui form error" name="test_form">
                        <div className="field"><label>Image</label><input type="file" name="image_edit" accept="image/*" onChange={handleFile} ></input></div>
                        <button className="ui button primary" onClick={handleSubmit}>Submit</button>
                        <div className="ui right floated button" onClick={() => history.goBack()}>Cancel</div>
                    </form>
                </div>
            </div>
        </div>
    ,document.querySelector("#edit"))

}


export default connect(null,{edit_shelf})(Edit_Shelf)