import React from 'react'
import {Link} from 'react-router-dom'
import {catalogs,editItem} from '../actions'
import {connect} from 'react-redux'
import Edit from '../Edit'
import history from '../history'
import _ from 'lodash'

class CatalogsEdit extends React.Component {
    componentDidMount(){
        this.props.catalogs(this.props.match.params.shelf,this.props.match.params.id);
    }

    render(){
        console.log(this.props.item)
        return <div><Edit initialValues={this.props.item[0]} id={this.props.match.params.id} shelf={this.props.match.params.shelf} /></div>
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {item: state.Catalogs.item}
}

export default connect(mapStateToProps,{catalogs})(CatalogsEdit)

 