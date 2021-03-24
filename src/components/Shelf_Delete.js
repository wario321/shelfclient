import React from 'react'
import ReactDOM from 'react-dom'
import Delete_Shelf from '../Delete_Shelf'

class Shelf_Delete extends React.Component {
    render() {
        return <div><Delete_Shelf shelf={this.props.match.params.shelf}/></div>
    }
}

export default Shelf_Delete