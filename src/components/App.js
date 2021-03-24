import React from 'react'
import Login from './Login'
import Item from './Item'
import Catalog from './Catalog'
import Header from './Header'
import CatalogCreate from './CatalogCreate'
import SelectCatalogs from './SelectCatalogs'
import auth from '../firebase'
import {Router,Route} from 'react-router-dom'
import history from '../history'
import CatalogsEdit from './CatalogsEdit'
import CatalogsDelete from './CatalogsDelete'
import Shelf_Edit from './Shelf_Edit'
import Shelf_Delete from './Shelf_Delete'
import Shelf_Add from './Shelf_Add'
import Move_item from './Move_item'
import Stock from './Stock'

class App extends React.Component {

    render(){
        return <div>
            <Router history={history} >
                <div className="ui container">
                    <Header />
                    <Route path="/" exact component={Login} />
                    <Route path="/item/:shelf" exact component={Catalog} />
                    <Route path="/item/:shelf/edit" exact component={Shelf_Edit} />
                    <Route path="/item/:shelf/delete" exact component={Shelf_Delete} />
                    <Route path="/catalogs/add_shelf" exact component={Shelf_Add} />
                    <Route path="/create/:shelf" exact component={CatalogCreate} />
                    <Route path="/catalogs" exact component={SelectCatalogs} />
                    <Route path="/edit/:shelf/:id" exact component={CatalogsEdit} />
                    <Route path="/delete/:shelf/:id" exact component={CatalogsDelete} />
                    <Route path="/move_item/:shelf" exact component={Move_item} />
                    <Route path="/stock" exact component={Stock} />
                </div>
            </Router>
            </div>
    }
}

export default App;
