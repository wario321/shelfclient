import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {signOut} from '../actions'

class Header extends React.Component {

    state = {active : null}
    
    onSignOut = () => {
        this.props.signOut()
    }

    renderUser(){
        if(this.props.signIn.isLogin === false && this.props.signIn.currentUser == null){
            return <Link to="/" className="item"><button className="ui blue icon button"><i className="power on icon"></i> sign in</button></Link>
        }
        else{
            return <div className="item"><button className="ui icon red button" onClick={this.onSignOut}><i className="power off icon"></i><label> sign out</label></button></div>
        }
    }

    onClicked = (e) => {
        this.setState({active : e.target.id})
    }

    render(){
        return <div className="ui secondary pointing menu">
            <Link to={"/"} className={(this.state.active == "home") ? "active header item" : "header item"} id="home" onClick={this.onClicked}><i className="home icon"></i>Home</Link>
            <Link to={"/catalogs"} className={(this.state.active == "catalogs") ? "active item" : "header item"} id="catalogs" onClick={this.onClicked}><i className="shopping cart icon"></i>Shelf Catalogs</Link>
            <Link to={"/stock"} className={(this.state.active == "stock") ? "active item" : "header item"} id="stock" onClick={this.onClicked}><i className="warehouse icon"></i>Stock</Link>
        <div className="right menu">
            {this.renderUser()}
        </div>
    </div>
    }
}

const mapStateToProps = (state) => {
    return {signIn: state.auth }
}

export default connect(mapStateToProps,{signOut})(Header);