export const Employee = (employee) =>
    <div>
        <a className="advent" href={`#/status/${employee.id}`}>
        <h1>{employee.FName}{employee.LName}</h1>
        <p>{employee.Department}</p>
        <p>{employee.Phone}</p>
        <p>{employee.Email}</p>
        </a>
    </div>

export class EmployeePage extends Component {
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

export class NewEmployee extends Component {
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