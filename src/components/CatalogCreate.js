import React from 'react'
import ReactDOM from 'react-dom'
import Modal from '../Modal'
import Data from '../data/catalog.json'
import history from '../history'
import {connect} from 'react-redux'
import {enableList} from '../actions'

class CatalogCreate extends React.Component {

    componentDidMount(){
        this.props.enableList();
    }

    render(){
        console.log(this.props.enable)
        return <div>
            <Modal Data={this.props.enable} shelf={this.props.match.params.shelf} onDismiss={() => history.push(`/item/${this.props.match.params.shelf}`)}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {enable : state.Catalogs.shelf}
}
export default connect(mapStateToProps,{enableList})(CatalogCreate);