export class Login extends Component {
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
                <RegisterBox />
                <LoginBox />
            </div>
        )
    }
}

export class RegisterBox extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    _handleSubmit(eventObject) {
        eventObject.preventDefault()
        //forms by default will refresh the page
        var formEl = eventObject.target
        window.form = formEl
        var inputEmail = formEl.theEmail.value, 
            inputPassword = formEl.thePassword.value
        // the .value property on an input reveals what the user has entered for this input 
        var promise = post('/account/register',{
            email: inputEmail,
            password: inputPassword
       }).then(x => {
            if(!x.errors) window.location.hash = `#/status/${x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render() {
        return (
            <form id="register-form" onSubmit={this._handleSubmit}>
        
                <p> Or Create an account: </p>
                <div>
                    <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
                    <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
                </div>
                    <button type="submit">Register</button>
            </form> 
        )
    }
}


export class LoginBox extends Component {
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
        return (
            <form id="login-form" onSubmit={this._handleSubmit}>

                <p>Please Log In</p>   
                <div>
                    <input name="theEmail" ref="Email" type="email" placeholder="user@email.com" required/>
                    <input name="thePassword" ref="Password" type="password" placeholder="Your Password"/>
                </div>
                    <button type="submit">Log In</button>
            </form>
        )
    }
}
