import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {stock} from '../actions'
import {Link} from 'react-router-dom'
import Login from './Login'
import history from '../history'
import auth from "../firebase"

class Stock extends React.Component {

    state = {currentpage : 1, perpages: 5,clicked: false,page: [],term: '',actived : null}

    componentDidMount(){
        this.props.stock()
        auth.onAuthStateChanged(user => {
            if(user){
                //this.props.stillSignIn(user);
                localStorage.setItem('CurrentUser' , user.uid)
                console.log(localStorage.getItem('CurrentUser'))
            }
        })
    }

    renderList = () => {
        var indexOfLastData = this.state.currentpage * this.state.perpages
        var indexOfFirstDate = indexOfLastData - this.state.perpages
        var currentData = null
        if(this.state.term != ''){
            currentData = this.props.item.filter(mem => mem.title == this.state.term)
        }
        else{
            currentData = this.props.item.slice(indexOfFirstDate,indexOfLastData)
        }
         
        return currentData.map(mem => {
            return <div className="item">
                    <div className="right floated content">
                        <Link to={`/item/${mem.shelf}`} className={ (mem.shelf) ? "ui blue button" : ''}>{mem.shelf}</Link>
                    </div>
                    <div className="content">
                        <div className="header">{mem.title}</div>
                        <div className="description"><p style={(mem.stock > 0) ? {color: 'green'} : {color:'red'}}>Stock : {mem.stock}</p></div>
                        <div className="description">Code : {mem.code}</div>
                        <div className="description">Barcode : {mem.barcode_code}</div>
                    </div>
            </div>
        })
    }

    handleClick = (e) => {
        this.setState({currentpage: e.target.id})
        console.log(this.state.currentpage)
        this.setState({actived: e.target.id})
    }

    handleChange = (e) => {
        this.setState({term : e.target.value})
    }

    renderPageNumber = () => {
        var pages = []
        for(var i = 1; i <= Math.ceil(this.props.item.length / this.state.perpages);i++){
            pages.push(i)
        }
        return pages.map(mem => {
            return <div className={(this.state.actived == mem) ? "active item" : "item"} key={mem} id={mem} onClick={this.handleClick}>{mem}</div>
        })
    }

    render(){
        if(localStorage.getItem('CurrentUser') == null){
            history.push('/')
            return <div><Login /></div>
        }
        else {
            return <div><div className="ui large header">Stock</div><div className="ui menu">
        <div className="left menu">
            <div className="item">
            <div className="ui transparent icon input">
            <input type="test" placeholder="search by name" onChange={this.handleChange}></input>
            <i className="search icon"></i>
            </div>
        </div>
       </div></div>
            <div className="ui segment">
                <div className="ui relaxed divided list">
                    {this.renderList()}
                </div>
        </div>
        <div className="ui right floated pagination menu">
            {this.renderPageNumber()}
            </div>
        </div>
    }
        }
        
}

const mapStateToProps = (state) => {
    console.log(state)
    return {item : state.Catalogs.stock}
}

export default connect(mapStateToProps,{stock})(Stock);