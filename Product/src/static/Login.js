import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Dashboard from './Dashboard';



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
        this.clearValiadtionErr("sformat");
        this.clearValiadtionErr("login");
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(e.target.value) && e.target.value.length != 0) {
            this.showValidationErr("sformat", "Username cannot contain special character!");
        }
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
        this.clearValiadtionErr("pformat");
        this.clearValiadtionErr("login");
        if (e.target.value.length < 6 && e.target.value.length != 0) {
            this.showValidationErr("pformat", "Password must be more than 6 digits!");
        }

    }



    submitLogin(e) {

        if (this.state.username != "" && this.state.password != "") {
            this.setState({ username: e.target.value });
            this.setState({ password: e.target.value });
        }

        if (this.state.username == "test" && this.state.password == "test1234") {
            this.setState({ isLoggedIn: true });


            // this.showValidationErr("login", "Click again to redirect to dashboard!");
        } else if (this.state.username != "" && this.state.password != "") {
            this.showValidationErr("login", "Username or password is incorrect!")
        }



    }


    render() {

        let loginErr = null;
        let pFormatErr = null;
        let sFormatErr = null;

        for (let err of this.state.errors) {

            if (err.elm == "pformat") {
                pFormatErr = err.msg;
            }
            if (err.elm == "sformat") {
                sFormatErr = err.msg;
            }
            if (err.elm == "login") {
                loginErr = err.msg;
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
                        <Link to={this.state.isLoggedIn ? "/dashboard" : ""} >

                            <button type="button" className="login-btn" disabled={this.state.password.length < 6 || !this.state.username} onClick={this.submitLogin.bind(this)}> Login </button>

                        </Link>

                        <small className="danger-error"> {loginErr ? loginErr : ""} </small>

                       
                    </div>

                </div>
            </div>
        );
    }

}

export default LoginBox;