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

const Advent = (advent) =>
    <a className="advent" href={`#/status/${advent.id}`}>
        <h1>{advent.name}</h1>
    </a>

const Error = () => <div>Page Not Found</div>

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
        post('/api/advance', {
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

        return <form className="build-advance-form" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your Advance:</p> : null}
        {err}

        <div>
            <p>
            In order to initialize your event advance, you'll need to provide details for the following categories:
            </p>
        <div className="advance-section-form">
        <div>
            <textarea ref="name" type="text" placeholder="Event Name" required></textarea>
            <textarea ref="startDate" type="DateTime" placeholder="Start Date DD/MM/YR" required></textarea>
            <textarea ref="endDate" type="DateTime" placeholder="End Date DD/MM/YR" required></textarea>
        </div>
        
        </div>  
        </div>
        <div>
                <button type="submit">Add Section</button>
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
            <Route path="/" component={Home}/>
            <Route path="/status/:id" component={AdventPage}/>
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