import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Dashboard from './Dashboard';
import { timingSafeEqual } from 'crypto';


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
                if (elm != err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };
        });
    }

    onUsernameChanged(e) {
        this.setState({ username: e.target.value })
        this.clearValiadtionErr("username");
        this.clearValiadtionErr("login");
        this.clearValiadtionErr("uformat");
        this.clearValiadtionErr("sformat");
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
        this.clearValiadtionErr("password");
        this.clearValiadtionErr("login");
        this.clearValiadtionErr("pformat");
    }



    submitLogin(e) {

        if (this.state.username == "") {
            this.showValidationErr("username", "Username cannot be empty!")
        }
        if (this.state.password == "") {
            this.showValidationErr("password", "Password cannot be empty!")
        }
        if (this.state.username != "" && this.state.password != "") {
            this.setState({ username: e.target.value });
            this.setState({ password: e.target.value });
        }
        if(this.state.username.length > 10){
            this.showValidationErr("uformat","Username is too long!");
        }
        if(this.state.password.length < 6){
            this.showValidationErr("pformat","Password must be more than 6 digits!");
        }
        if( /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.state.username)){
            this.showValidationErr("sformat","Username cannot contain special character!");

        }

        if (this.state.username == "test" && this.state.password == "test1234") {
            this.setState({ isLoggedIn: true });
            this.showValidationErr("login", "Click again to redirect to dashboard!");
        } else if (this.state.username != "" && this.state.password != "") {
            this.showValidationErr("login", "Username or password is incorrect!")
        }

    }


    render() {

        let usernameErr = null;
        let passwordErr = null;
        let loginErr = null;
        let uFormatErr = null;
        let pFormatErr = null;
        let sFormatErr = null;

        for (let err of this.state.errors) {
            if (err.elm == "username") {
                usernameErr = err.msg;
            }
            if (err.elm == "password") {
                passwordErr = err.msg;
            }
            if (err.elm == "login") {
                loginErr = err.msg;
            }
            if(err.elm == "uformat"){
                uFormatErr = err.msg;
            }
            if(err.elm == "pformat"){
                pFormatErr = err.msg;
            }
            if(err.elm == "sformat"){
                sFormatErr = err.msg;
            }

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
                                onChange={this.onUsernameChanged.bind(this)}
                                placeholder="Username" />
                        </div>
                        <small className="danger-error" > {usernameErr ? usernameErr : ""} </small>
                        <small className="danger-error" > {uFormatErr ? uFormatErr : ""} </small>
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
                        <small className="danger-error" > {passwordErr ? passwordErr : ""} </small>
                        <small className="danger-error" > {pFormatErr ? pFormatErr : ""} </small>
                        <Link to={this.state.isLoggedIn ? "/dashboard" : ""} >

                            <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)} > Login </button>

                        </Link>

                        <small className="login-suc" > {loginErr ? loginErr : ""} </small>

                    </div>

                </div>
            </div>
        );
    }

}

export default LoginBox;