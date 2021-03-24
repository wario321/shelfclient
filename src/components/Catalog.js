import React from 'react'
import Barcode from 'react-barcode'
import _ from 'lodash'
import Data from '../data/catalog.json'
import '../css/mystyle.css'
import {Link} from 'react-router-dom'
import {catalogsList,stillSignIn} from '../actions'
import {connect} from 'react-redux'
import Loading from './Loading'
import auth from '../firebase'

class Catalog extends React.Component {
    
    state = {data: Data.catalog, Currentuser: null,term: "",delay: false}

    componentDidMount(){
        setTimeout(() => {
            this.props.catalogsList(this.props.match.params.shelf);
            this.setState({delay: true})
        },1000)
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.stillSignIn(user)
                this.setState({Currentuser : user})
            }
        })
    }

    /*componentDidUpdate(){
        var user = auth.currentUser
        if(user){
            this.setState({Currentuser : user})
        }
    }*/

    handle_term = (e) =>{
        this.setState({term : e.target.value})
    }

    renderPromo(data){
        if(data !="false"){
            return <i className="ui red top attached label">Promotion : {data}</i>
        }

        return '';
    }

    render_stock(stock){
        if(stock > 0){
            return <span className="right floated time"><p style={{color: 'green'}}>IN STOCK</p></span>
        }
        else{
            return <span className="right floated time"><p style={{color:'red'}}>OUT OF STOCK</p></span>
        }
    }

    renderList = () => {
        var data = []
        if(this.state.term != ""){
            data = this.props.item.filter(mem => mem.title == this.state.term)
        }
        else {
            data = this.props.item
        }
        return data.map((mem,index) => {
            console.log(mem)
            return <div className="column">
               <div key={mem.id} className="ui fluid card">{this.renderPromo(mem.promotion)}
                <div className="content">
                    <Link to={`/delete/${this.props.match.params.shelf}/${mem.id}`}><i className="ui right floated red trash alternate outline icon"></i></Link>
                    <Link to={`/edit/${this.props.match.params.shelf}/${mem.id}`}><i className="edit right floated icon"></i></Link>
                    <div className="header">{mem.title}</div>
                    <div className="description"><b>{mem.price} &nbsp; {mem.type}</b><span className="right floated time">{mem.weight}</span></div>
                    <div className="description">{mem.code}</div>
                    <div className="description">{mem.barcode_code} {this.render_stock(mem.stock)}</div>
                </div>
                <div className="extra content">
                <div className="barcode"><Barcode value={mem.barcode_code} /></div>
                <i className="bottom attached label">last update : {mem.last_update}</i>
                </div>
            </div>
            </div>
        })
    }

    renderShelf = () => {
    return <div><div className="ui menu">
                    <div className="left menu">
                        <div className="item">
                            <div className="ui transparent icon input">
                            <input type="test" placeholder="search by shelf  name" onChange={this.handle_term}></input>
                            <i className="search icon"></i>
                            </div>
                        </div>
                        <div className="item">
                            <Link to={`/move_item/${this.props.match.params.shelf}`}><button className="ui blue icon button"><i className="caret square right outline"></i> Move Service</button></Link>
                        </div>
                    </div>
                </div>
                <div className="ui segment"><div className="ui header">{this.props.match.params.shelf}</div>
                    <div class="ui four column grid">
                        {this.renderList()}
                <div className="column">
                <div className="ui fluid card">
                    <Link to={`/create/${this.props.match.params.shelf}`} className="ui icon button">
                    <i className="huge plus icon"></i>
                    </Link>
                </div>
                </div>
                </div></div><Link to={'/catalogs'} className="ui blue right floated button">Back to catalogs</Link></div>
         
    }

    render(){
        if(this.props.item.length == 0 || this.state.delay != true){
            return <Loading />
        }
        else{
            return <div>
                    {this.renderShelf()}
                </div> 
        }
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log(state)
    return {item: state.Catalogs.shelf}
}

export default connect(mapStateToProps,{catalogsList,stillSignIn})(Catalog);