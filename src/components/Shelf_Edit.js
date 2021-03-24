import React from 'react'
import ReactDOM from 'react-dom'
import Edit_Shelf from '../Edit_Shelf'

class Shelf_Edit extends React.Component {
    render() {
        return <div><Edit_Shelf shelf={this.props.match.params.shelf}/></div>
    }
}

export default Shelf_Edit