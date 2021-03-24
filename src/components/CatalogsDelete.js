import React from 'react'
import {catalogs} from '../actions'
import Delete from '../Delete'
import {connect} from 'react-redux'

class CatalogsDelete extends React.Component {
    componentDidMount(){
        this.props.catalogs(this.props.match.params.shelf,this.props.match.params.id);
    }

    renderContent = () => {
        console.log(this.props.item[0].title)

        return `Are you sure you want to delete ${this.props.item[0].title} label`
    }
    render(){
        return <div><Delete shelf={this.props.match.params.shelf} id={this.props.match.params.id} content={this.renderContent()}/></div>
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {item: state.Catalogs.deleteitem}
}
export default connect(mapStateToProps,{catalogs})(CatalogsDelete);