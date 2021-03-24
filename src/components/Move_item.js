import React from 'react'
import ReactDOM from 'react-dom'
import Move_service from '../Move_service'

class Movie_item extends React.Component {
    render() {
        return <div><Move_service shelf={this.props.match.params.shelf}/></div>
    }
}

export default Movie_item