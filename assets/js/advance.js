export class AdvancePage extends Component {
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


export class NewAdvance extends Component {
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