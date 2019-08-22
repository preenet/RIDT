import React from 'react';
import '../../static/App.css';
import { Route , withRouter} from 'react-router-dom';
import Dashboard from './Dashboard';
import { login } from '../services/UserServices';

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", errors: [], isLoggedIn: false };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({ errors: [...prevState.errors, { elm, msg }] }));
    }

    clearValiadtionErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };
        });
    }

    onUsernameChanged(e) {
        this.setState({ username: e.target.value })
        this.clearValiadtionErr("sformat");
        this.clearValiadtionErr("login");
        // eslint-disable-next-line
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(e.target.value) && e.target.value.length !== 0) {
            this.showValidationErr("sformat", "Username cannot contain special character!");
            console.log('Username cannot contain special character!');
        }
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
        this.clearValiadtionErr("pformat");
        this.clearValiadtionErr("login");
        if (e.target.value.length < 6 && e.target.value.length !== 0) {
            this.showValidationErr("pformat", "Password must be more than 6 digits!");
            console.log('Password must be more than 6 digits!');
        }
    }



    submitLogin(e) {
        e.preventDefault()
        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({ username: e.target.value });
            this.setState({ password: e.target.value });
            console.log('Format correct!');

            const user = {
                username: this.state.username,
                password: this.state.password
            }
            
            login(user).then(res => {
                console.log(res)
                if (res === undefined){
                    console.log('Login failed')
                }else if(!res.error){
                    console.log('Login successful')
                    this.props.history.push('/profile')
                }
            })
        }
       
    }


    render() {

        let loginErr = null;
        let pFormatErr = null;
        let sFormatErr = null;

        for (let err of this.state.errors) {

            if (err.elm === "pformat") {
                pFormatErr = err.msg;
            }
            if (err.elm === "sformat") {
                sFormatErr = err.msg;
            }
            if (err.elm === "login") {
                loginErr = err.msg;
            }

        }
        
        if(this.state.isLoggedIn){
            console.log('Dashboard is showing!');
        }

        return (

            <div className="box-container" >
                <div className="inner-container" >
                    <Route path="/dashboard"
                        exact strict component={Dashboard}
                    />
                    <div className="header" >
                        Login </div>

                    <div className="box" >

                        <div className="input-group" >
                            <label htmlFor="username" > Username: </label><br />
                            <input type="text"
                                name="username"
                                className="login-input"
                                value={this.state.username}
                                maxLength={10}
                                onChange={this.onUsernameChanged.bind(this)}
                                placeholder="Username" />
                        </div>


                        <small className="danger-error" > {sFormatErr ? sFormatErr : ""} </small>
                        <div className="input-group" >
                            <label htmlFor="password" > Password: </label><br />
                            <input type="password"
                                name="password"
                                className="login-input"
                                value={this.state.password}
                                onChange={this.onPasswordChanged.bind(this)}
                                placeholder="Password" />
                        </div>

                        <small className="danger-error" > {pFormatErr ? pFormatErr : ""} </small>

                        
                       
                            <button type="button" className="login-btn"  style={{color: this.state.password.length < 6 || !this.state.username? '':'white'}} 
                            disabled={this.state.password.length < 6 || !this.state.username }
                            onClick={this.submitLogin.bind(this)}> Login </button>

                        

                        <small className="danger-error"> {loginErr ? loginErr : ""} </small>


                    </div>

                </div>
            </div>
        );
    }

}

export default withRouter(LoginBox);