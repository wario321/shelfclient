import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import Barcode from 'react-barcode'
import {connect} from 'react-redux'
import {addItem,filter,enableList} from './actions'
import './css/mystyle.css'
import { set } from 'lodash'

const Modal = props => {
    const[selected,setSelected] = useState([]);
    const[term,setTerm] = useState(null);
    
    useEffect(() => {
        //props.filter(props.Data,term)
        if(term){
            console.log('case1')
            //props.enableList()
            props.filter(props.enable,term)
        }else{
           props.enableList(); 
           
        }
    },[term])
    
    const addFunc = (mem) => {
        //setSelected([...selected,selected.filter(mem2 => mem2.id !== mem.id)]);
        setSelected([...selected,mem]);
        console.log(selected.filter(checked => checked.id !== mem.id))
    }

    const onSubmit = () => {
        props.addItem(props.shelf,selected);
    }

    const renderData = () => {
        return props.enable.map(mem => {
            return <div className="column">
            <div className="ui fluid card">
            <div className="content">
                <div className="ui right floated compact segment">
                    <div className="ui fitted checkbox">
                        <input type="checkbox" onClick={() => addFunc(mem)}/>
                        <label></label>
                    </div>
                </div>
                <div className="header">{mem.title}</div>
                <div className="description">{mem.price}  {mem.type}</div>
            </div>
            <div className="extra content">
            <div className="barcode"><Barcode value="12345678" /></div>
            </div>
        </div>
        </div>
        })
    }

    return ReactDOM.createPortal(
        <div class="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
            <div class="content">
                <button className="ui right floated icon button" onClick={props.onDismiss}><i className="x icon"></i></button>
                <div class="header"><h1>Enable Labels</h1></div><br />
                <div className="ui catogory search">
                    <div className="ui icon input">
                        <input className="prompt" type="text" placeholder="Search label id" onChange={(event) => setTerm(event.target.value)}/>
                        <i className="search icon"></i>
                    </div>
                </div>
            </div>
            <div class="scrolling content">
                <div className="ui segment">
                    <div className="ui four column grid">
                        {renderData()}
                    </div>
                </div>
                <div className="extra content">
                    <button className="ui right floated button" onClick={props.onDismiss}>Cancel</button>
                    <button className="ui right floated button primary" onClick={onSubmit}>Apply</button>
                    
                </div>
            </div>
        </div>
        </div>,
               document.querySelector('#modal'))
}

const mapStateToProps = (state) => {
    console.log(state)
    return {enable : state.Catalogs.shelf};
}
export default connect(mapStateToProps,{addItem,filter,enableList})(Modal);