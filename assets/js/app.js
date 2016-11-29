// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import { Nav, Jumbotron, HomeContents } from './components'
import { Login, RegisterBox, LoginBox } from './login'
import { Employee, EmployeePage, NewEmployee } from './employee'
import { AdventPage, NewAdvent } from './advent'
import { AdvancePage, NewAdvance } from './advance'
import * as Boot from 'react-bootstrap' // read up @ https://react-bootstrap.github.io/components.html

console.log(Boot) // what hast thou provided?

// Utility methods
// --------------


const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => r.json())
    .catch(e => console.log(e))

const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => console.log(e))
    .then(r => r.json())
// ----------------
const Error = () => <div>Page Not Found</div>


const Advent = (advent) =>
    <div>
    <a className="advent" href={`#/status/${advent.id}`}>
        <h1>{advent.name}</h1>
    </a>
    </div>






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
            <Route path="/compose" component={NewAdvent}/>
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