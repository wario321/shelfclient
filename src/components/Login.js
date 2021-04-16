import React from 'react'
import {connect} from 'react-redux'
import {signIn , signOut ,stillSignIn,callApi} from '../actions'
import auth from '../firebase'
import {Link} from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,BarChart } from 'recharts';

class Login extends React.Component {

    
    state = {email:'',password:'',statedata:[],error:'',active: "day"}
    
    
    componentDidMount(){
        this.props.callApi();
         auth.onAuthStateChanged(user => {
            if(user){
                this.props.stillSignIn(user)
            }
        })
    }
    

    handleEmail = (event) =>{
        console.log(event.target.value)
        this.setState({email : event.target.value})
    }

    handlePass = (event) =>{
        this.setState({password: event.target.value})
    }

    handleSubmit = async () =>{
        console.log(this.state.email,this.state.password)
        try {
            const data = await auth.signInWithEmailAndPassword(this.state.email,this.state.password)
            const {user} = data
            this.props.signIn(user)
            if(this.state.err != null){
                this.setState({err:''})
            }
            
        }
        catch(err){
            console.log(err)
            this.setState({error: err.message})
        }
    }

    handleLogout = () =>{
        this.props.signOut();
    }

    renderError(err){
        if(err != ''){
            return <div className="ui red message">{this.state.error}</div>
        }
    }

    renderDash = () => {
        var mem = [1,2]
        return <div className="column"><Link to={`/catalogs`} className="ui blue fluid card">
            <div className="content">
                <div className="center aligned author">
                    <i className="ui large shopping cart icon"></i> <p className="ui header">Shelf Catalogs</p>
                </div>
                <div className="description">
                </div>
            </div>
            </Link></div>
            
        
    }

    renderCharts = () => {
        var data = []
        if(this.state.active == "day"){
            data = [
                {
                  name: '00:00 AM',
                  expenses: 1000,
                  income: 2400,
                  amt: 2400,
                },
                {
                  name: '04:00 AM',
                  expenses: 3000,
                  income: 1398,
                  amt: 2210,
                },
                {
                  name: '08:00 AM',
                  expenses: 2000,
                  income: 5800,
                  amt: 2290,
                },
                {
                  name: '12:00 AM',
                  expenses: 2780,
                  income: 3908,
                  amt: 2000,
                },
                {
                  name: '16:00 PM',
                  expenses: 1890,
                  income: 4800,
                  amt: 2181,
                },
                {
                  name: '20:00 PM',
                  expenses: 2390,
                  income: 3800,
                  amt: 2500,
                },
                {
                  name: '24:00 PM',
                  expenses: 3490,
                  income: 4300,
                  amt: 2100,
                },
              ]
            }
        else if(this.state.active == "month"){
            data = [
                { name: "January", expenses: 1000,income: 2400,amt: 2400},{name : "Febuary",expenses: 1500, income: 2500,amt: 2500},{name: "March",expenses: 2000,income:3000,amt:3000},
                {name: "April",expenses:1500,income:3000,amt:1400},{name:"May",expenses:1700,income:2500,amt:2000},{name:"June",expenses:1800,income:4000,amt:4000},{name:"July",expenses:2000,income:4000,amt:6000},
                {name: "August",expenses:2500,income:3500,amt:2500},{name:"September",expenses:1000,income:3300,amt:3300},{name:"October",income:3000,expenses:1500,amt:3000},
                {name:"November",expenses:2000,income:5000,amt:3000},{name:"December",expenses:1500,income:5000,amt:2200}
            ]
        }

          return <ResponsiveContainer width={"100%"} height={350}><LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#0FADF1" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="expenses" stroke="#F1370F" />
              </LineChart></ResponsiveContainer>
          
          
    }

    handleClick = (e) => {
        this.setState({active : e.target.id})
    }

    render(){
        console.log(this.state.error)
        if(this.props.isLogin === false && this.props.currentUser == null){
            return <div><div className="ui center aligned huge header">Electrical Shelf Labels system</div>
                        <div className="ui center segment">
                            <div className="ui form">
                                <h1 className="ui aligned center header">Login</h1>
                                <div className="field"><label>Email</label><input type="text" onChange={this.handleEmail}></input></div>
                                <div className="field"><label>Password</label><input type="password" onChange={this.handlePass}></input></div>
                                <button className="ui button" type="button" onClick={this.handleSubmit}>Submit</button>
                                {this.renderError(this.state.error)}
                        </div>
                    </div>
                </div>
        }
        else{
        return <div><h1>Hello {this.props.currentUser.email}</h1><br />
                    <div className="ui two column grid">
                        {this.renderDash()}
                        <div className="column"><Link to={`/stock`} className="ui blue fluid card">
                        <div className="content">
                            <div className="center aligned author">
                                <i className="ui large warehouse icon"></i> <p className="ui header">Stock Cargo</p>
                            </div>
                         <div className="description">
                     </div>
                    </div>
                    </Link></div>
                    </div>
                    <div className="ui secondary pointing menu">
                        <div className={(this.state.active == "day") ? 'item active' : 'item'} key='day' id='day' onClick={this.handleClick}>Day</div>
                        <div className={(this.state.active == "month") ? 'item active' : 'item'} id="month" onClick={this.handleClick}>Month</div>
                    </div>
                        <div className="ui segment">{this.renderCharts()}</div>
                    </div>
               
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return { isLogin : state.auth.isLogin , currentUser: state.auth.currentUser ,Data: Object.values(state.Calldata)}
}

export default connect(mapStateToProps,{signIn,signOut,stillSignIn,callApi})(Login);