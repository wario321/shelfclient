import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import Barcode from 'react-barcode'
import history from './history'
import {connect} from 'react-redux'
import {catalogsList,list_of_shelf,move_to_shelf} from './actions'

const Move_service = (props) => {
    const [term,setTerm] = useState('')
    const [select_shelf,setSelect_shelf] = useState(null)
    const [selected,setSelected] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            await props.catalogsList(props.shelf)
            await props.list_of_shelf()
        }

        fetchData()
    },[])

    const renderPromo = (data) => {
        if(data !== "false"){
            return <i className="ui red top attached label">Promotion : {data}</i>
        }

        return '';
    }


    const render_stock = (stock) => {
        if(stock > 0){
            return <span className="right floated time"><p style={{color: 'green'}}>IN STOCK</p></span>
        }
        else{
            return <span className="right floated time"><p style={{color:'red'}}>OUT OF STOCK</p></span>
        }
    }

    const add_data = (data) => {
        const check = selected.filter(mem => mem.title === data.title)
        if(check.length !== 0){
           selected.pop(check)
        }
        else{
           setSelected([...selected,data])
        }
        //setSelected([...selected,data])
        //console.log(selected)
        //console.log("check : ",check)
    }

    const onSubmit = () => {
        const format = {
            "target": select_shelf,
            "data": selected
        }
        props.move_to_shelf(props.shelf,format)
    }

    const renderData = () => {
        var filter = []
        if(term !== ''){
            filter = props.item.filter(mem => mem.title === term)
        }
        else{
            filter = props.item
        }
        return filter.map(mem => {
            return <div className="column">
               <div key={mem.id} className="ui fluid card">{renderPromo(mem.promotion)}
                <div className="content">
                    <div className="ui right floated compact segment">
                        <div className="ui fitted checkbox">
                            <input type="checkbox" onChange={() => add_data(mem)}/>
                            <label ></label>
                        </div>
                    </div>
                    <div className="header">{mem.title}</div>
                    <div className="description"><b>{mem.price} &nbsp; {mem.type}</b><span className="right floated time">{mem.weight}</span></div>
                    <div className="description">{mem.code}</div>
                    <div className="description">{mem.barcode_code} {render_stock(mem.stock)}</div>
                </div>
                <div className="extra content">
                <div className="barcode"><Barcode value={mem.barcode_code} /></div>
                <i className="bottom attached label">last update : {mem.last_update}</i>
                </div>
            </div>
            </div>
        })
    }

    const render_choice = () => {
        return props.index.filter(data => data !== props.shelf).map(mem => {
            return <div className="item" onClick={() => setSelect_shelf(mem)}>{mem}</div>
        })
    }
    
    return ReactDOM.createPortal(
        <div><div class="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
            <div class="content">
                <button className="ui right floated icon button" onClick={() => history.goBack()}><i className="x icon"></i></button>
                <div class="header"><h1>Move Labels</h1></div><br />
                <div><div className="ui menu">
                <div className="left menu">
                    <div className="item">
                    <div className="ui transparent icon input">
                    <input type="test" placeholder="search by shelf  name" onChange={(e) => setTerm(e.target.value)}></input>
                    <i className="search icon"></i>
                    </div>
                </div>
            </div> 
                <div className="right menu">
                    <div className="ui simple dropdown item">
                        {(select_shelf !== null) ? select_shelf : 'Move to Shelf'}
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            {render_choice()}
                        </div>
                    </div>
                </div>
            </div></div>
            </div> 
            <div class="scrolling content">
                <div className="ui segment">
                    <div className="ui four column grid">
                        {renderData()}
                    </div>
                </div>
                <div className="extra content">
                    <button className="ui right floated button" onClick={() => history.goBack()}>Cancel</button>
                    <button className="ui right floated button primary" onClick={onSubmit}>Apply</button>
                    
                </div>
            </div>
        </div>
        </div></div>,
               document.querySelector('#modal'))
}

const mapStateToProps = (state) => {
    console.log(state)
    return {item : state.Catalogs.shelf, index : state.Catalogs.index_shelf};
}
export default connect(mapStateToProps,{catalogsList,list_of_shelf,move_to_shelf})(Move_service);