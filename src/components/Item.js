import React from 'react'
import Barcode from 'react-barcode'
import '../css/mystyle.css'




const Item = () => {
        return <div className="ui segment">
                <div className="ui header">Shelf 1</div>
                <div class="ui four column grid">
                    <div className="column">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Chicken</div>
                            <div className="description">50 Bath/kg</div>
                        </div>
                        <div className="extra content">
                        <div className="barcode"><Barcode value="chicken" /></div>
                        </div>
                    </div>
                    </div>
                    <div className="column">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Chicken</div>
                            <div className="description">50 Bath/kg</div>
                        </div>
                        <div className="extra content">
                        <div className="barcode"><Barcode value="chicken" /></div>
                        </div>
                    </div>
                    </div>
                    <div className="column">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Chicken</div>
                            <div className="description">50 Bath/kg</div>
                        </div>
                        <div className="extra content">
                        <div className="barcode"><Barcode value="chicken" /></div>
                        </div>
                    </div>
                    </div>
                    <div className="column">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Chicken</div>
                            <div className="description">50 Bath/kg</div>
                        </div>
                        <div className="extra content">
                            <div className="barcode"><Barcode value="chicken" /></div>
                        </div>
                    </div>
                    </div>
                    <div className="column">
                    <div className="ui fluid card">
                        <div className="content">
                            <div className="header">Chicken</div>
                            <div className="description">50 Bath/kg</div>
                        </div>
                        <div className="extra content">
                            <div className="barcode"><Barcode value="chicken" /></div>
                        </div>
                    </div>
                    </div>
                </div>
                 
                <div className="ui right floated button">Add labels</div> 
                </div>  
}

export default Item;