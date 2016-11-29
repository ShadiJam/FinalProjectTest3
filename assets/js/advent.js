export class AdventPage extends Component {
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

export class NewAdvent extends Component {
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
