import React from 'react'
import {Link} from 'react-router-dom'
import {callShelf,callImg,stillSignIn} from '../actions'
import {connect} from 'react-redux'
import history from '../history'
import Login from './Login'
import auth from '../firebase';
import Loading from './Loading'


class SelectCatalogs extends React.Component {
    /*constructor(props){
        super(props)
        this.state = {term : ''}
    }*/
    state = {term : '', pointing: false}

    componentDidMount(){
        this.props.callShelf();
        //this.props.callImg();
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.stillSignIn(user);
                localStorage.setItem('CurrentUser' , user.uid)
                console.log(localStorage.getItem('CurrentUser'))
            }
        })
    }

    handleChange = (e) => {
        this.setState({term: e.target.value})
    }

    /*renderListCard(){
        console.log(this.props.index)
        var filter = []
        if(this.state.term == ''){
            filter = this.props.index
        }
        else{
            filter = this.props.index.filter(mem => mem.name.toLowerCase() == this.state.term.toLowerCase())
        }
        return filter.map((mem) => {
            return <div className="column"><Link to={`/item/${mem.name}`} className="ui link cards">
                <div className="card">
                    <div className="image">
                        <img src={mem.img}></img>
                    </div>
                <div className="content">
                    <div className="header">{mem.name} <Link to={`/item/${mem.name}/delete`}><i className="ui right floated red trash alternate outline icon"></i></Link>
                    <Link to={`/item/${mem.name}/edit`}><i className="cog right floated gray icon"></i></Link></div>
                </div> 
                </div>
                </Link></div>
            
        })
    }*/

    renderListCard(){
        console.log(this.props.index)
        var filter = []
        if(this.state.term == ''){
            filter = this.props.index
        }
        else{
            filter = this.props.index.filter(mem => mem.name.toLowerCase() == this.state.term.toLowerCase())
        }
        return filter.map((mem) => {
            return <div className="column"><Link to={`/item/${mem.name}`} className="ui link cards">
                <div className="card">
                    <div className="image">
                        <img src={mem.img}></img>
                    </div>
                <div className="content">
                    <div className="header">{mem.name} <div className={`ui icon right floated simple dropdown item`}>
                        <i className="cog icon"></i>
                        <div className="menu">
                        <Link to={`/item/${mem.name}/edit`} className="item"><i className="images outline icon"></i>Change image</Link>
                        <Link to={`/item/${mem.name}/delete`} className="item"><i className="ui red trash alternate outline icon"></i>Delete Shelf</Link>
                        </div> 
                        </div></div>
                </div> 
                </div>
                </Link></div>
            
        })
    }

    render(){
        if(localStorage.getItem('CurrentUser') == null){
            history.push('/')
            return <div><Login /></div>
        }
        if(this.props.index.length == 0){
            return <Loading />
        }
        else{
            return <div><div className="ui menu">
                <div className="left menu">
                    <div className="item">
                    <div className="ui transparent icon input">
                    <input type="test" placeholder="search by shelf  name" onChange={this.handleChange}></input>
                    <i className="search icon"></i>
                    </div>
                </div>
               </div> 
                <Link to={"/catalogs/add_shelf"} className="five ui buttons"><button className="ui icon blue basic button">
                    <i className="plus icon"></i>Add Shelf </button>
                </Link>
            </div><div className="ui four column grid">
                {this.renderListCard()}</div></div>
        }
    }
}

const mapToStateToProps = (state) => {
    console.log(state)
    return {index: state.Catalogs.index,signIn: state.auth,img: state.Catalogs.src}
}

export default connect(mapToStateToProps,{callShelf,callImg,stillSignIn})(SelectCatalogs);