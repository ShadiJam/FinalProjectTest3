// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents } from './components'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html

console.log(Boot) // what hast thou provided?

// Utility methods
// --------------
const log = (...a) => console.log(...a)

const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => r.json())
    .catch(e => log(e))

const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())
// ----------------
const Error = () => <div>Page Not Found</div>

const Advent = (advent) =>
    <div>
    <a className="advent" href={`#/status/${advent.id}`}>
        <h1>{advent.name}</h1>
    </a>
    </div>

const Employee = (employee) =>
    <div>
        <a className="advent" href={`#/status/${employee.id}`}>
        <h1>{employee.FName}{employee.LName}</h1>
        <p>{employee.Department}</p>
        <p>{employee.Phone}</p>
        <p>{employee.Email}</p>
        </a>
    </div>

class EmployeePage extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get('/api/employee/'+this.state.id).then(x => {
            this.setState({ item: x })
        })
    }
    render() {
        const item = this.state.item
        if(!item)
            return <div/>

        return <div className="employee">
            return <div className="grid grid-3-600">
            {this.state.items.map(Employee)}
        </div>
        </div>
    }
}

class RegisterBox extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formE1 = eventObject.target
        window.form = formE1
        var inputEmail = formE1.theEmail.value, 
            inputPassword = formE1.thePassword.value
        // the .value property on an input reveals what the user has entered for this input 
        var promise = post('/account/register',{
            email: inputEmail,
            password: inputPassword
        })
        promise.then(
            (resp) => log(resp),
            (err) => log(err)
        )
    }
    render() {
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return (
            <form id="register-form" onSubmit={this._handleSubmit}>
        
                <p> Or Create an Account </p>
                <div>
                    <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
                    <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
                </div>
                    <a className="register-button" href="#/status/newEmployee">
                    <button type="submit">Register</button>
                    </a>
            </form> 
        )
    }
}

class LoginBox extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formE2 = eventObject.target
        window.form = formE2
        var inputEmail = formE2.theEmail.value, 
            inputPassword = formE2.thePassword.value
        // the .value property on an input reveals what the user has entered for this input 
        var promise = post('/account/login',{
            email: inputEmail,
            password: inputPassword
        })
        promise.then(
            (resp) => log(resp),
            (err) => log(err)
        )
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }
        return (
            <form id="login-form" onSubmit={this._handleSubmit}>

                <p>Please Log In</p>   
                <div>
                    <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
                    <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
                </div>
                    <a className="login-button" href="#/">
                    <button type="submit">Log In</button>
                    </a>
            </form>
        )
    }
}
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        var err 
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        } 
        return (
            <div className="login-stuff">
                <LoginBox />
                <RegisterBox />
            </div>
        )
    }
}

class NewEmployee extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        post('/api/employee', {
        FName: this.refs.FName.value,
        LName: this.refs.LName.value,
        Department: this.refs.Department.value,
        Phone: this.refs.Phone.value,
        Email: this.refs.Email.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <form className="employee-form" onSubmit={this._handleSubmit}>

        {this.state.errors ? <p>There were errors with your Event:</p> : null}
        {err}

        <div>
            <textarea ref="FName" type="text" placeholder="First Name" required></textarea>
            <textarea ref="LName" type="text" placeholder="Last Name" required></textarea>
            <textarea ref="Department" type="text" placeholder="Department Name" required></textarea>
            <textarea ref="Phone" type="Phone" placeholder="Phone including area code" required></textarea>
            <textarea ref="Email" type="Email" placeholder="Email Address" required></textarea>
        </div>
        <div>
                <button type="submit">Add Employee</button>
            </div>
        </form>
    }
}


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('api/advent').then(advents => {
            advents = advents.reverse()
            this.setState({items: advents})
        }).catch(e => log(e))
    }
    render(){
        return <div className="grid grid-3-600">
            {this.state.items.map(Advent)}
        <div>
        <a className="compose-advent" href="#/compose">
            <button>Create New Event</button>
        </a>
        </div>
        </div>
    }
}

class AdventPage extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get('/api/advent/'+this.state.id).then(x => {
            this.setState({ item: x })
        })
    }
    render() {
        const item = this.state.item
        if(!item)
            return <div/>

        return <div className="advent">
            <h5>{item.name}</h5>
            <hr/>
            <p>{item.startDate}</p>
            <p>{item.endDate}</p>
            <hr/>
            <div>
                <a className="build-advance" href="#/build">
            <button>Build Event Advance</button>
        </a>
        </div>
        </div>
    }
}

class AdvancePage extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get("api/advance"+this.state.id).then(x => {
            this.setState({ item: x })
        })
    }
    render() {
        const item = this.state.item
        if(!item)
            return <div/>
        
        return <div className="Advance">
        <h5>{item.AdvanceName}</h5>
            <hr/>
            <p>{item.dueDate}</p>
            <ul className="advance-sections">
                {this.state.sections.map(x => <li>{x}</li>)}
                </ul>
            <hr/>
            <div>
                <a className="build-advance" href={`#/status/${advance.id}`}>
            <button>Edit Event Advance</button>
        </a>
        </div>
        </div>

    }
}

class NewAdvent extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/advent', {
            name: this.refs.name.value,
            startDate: this.refs.startDate.value,
            endDate: this.refs.endDate.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <form className="advent-form" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your Event:</p> : null}
        {err}

        <div>
            <textarea ref="name" type="text" placeholder="Event Name" required></textarea>
            <textarea ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required></textarea>
            <textarea ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required></textarea>
        </div>
        <div>
                <button type="submit">Submit Event</button>
            </div>
        </form>
    }
}

class NewAdvance extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/advance'+this.state.id, {
            AdvanceName: this.refs.AdvanceName.value,
            dueDate: this.refs.dueDate.value })
        post('api/section'+this.state.id, {
            SectionName: this.refs.SectionName.value,
            SectionDescription: this.refs.SectionDescription.value,
            Cost: this.refs.Cost.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
                </ul>
        }

        return <form className="build-advance-form" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your Advance:</p> : null}
        {err}

        <div>
            <p>
            In order to initialize your event advance, you'll need to provide details for the following categories:
            </p>
        <div className="advance-section-form">
        <div>
            <textarea ref="AdvanceName" type="text" placeholder="Advance Name - not required"></textarea>
            <textarea ref="dueDate" type="DateTime" placeholder="Due Date DD/MM/YR - not required"></textarea>
            <textarea ref="SectionName" type="text" placeholder="Name your first section" required></textarea>
            <textarea ref="SectionDescription" type="text" placeholder="Add a short description about this section - not required"></textarea>
            <textarea ref="Cost" type="int" placeholder="Include the cost of the items in this section if applicable - this info will not be displayed to your staff if you don't want it to be."></textarea>
        </div>
        
        </div>  
        </div>
        <div>
                <button type="submit">Add this Section</button>
            </div>
        </form>
    }
}


const Layout = ({children}) => 
    <div>
        <div>
            <Nav />
            <Jumbotron />
        </div>
            {children}
    </div>
const reactApp = () => 
    render(
    <Layout>
        <Router history={hashHistory}>
            <Route path="/Login" component={Login}/>
            <Route path="/" component={Home}/>
            <Route path="/status/:id" component={AdventPage}/>
            <Route path="/status/newEmployee" component={NewEmployee}/>
            <Route path="/status/:id" component={EmployeePage}/>
            <Route path="/compose" component={NewAdvent}/>
            <Route path="/build" component={NewAdvance}/>
            <Route path="*" component={Error}/>
        </Router>
    </Layout>,
    document.querySelector('.app'))
reactApp()
// Flow types supported (for pseudo type-checking at runtime)
// function sum(a: number, b: number): number {
//     return a+b;
// }
//
// and runtime error checking is built-in
// sum(1, '2');