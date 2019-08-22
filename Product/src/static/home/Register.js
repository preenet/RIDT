import React from 'react';
import '../../static/App.css';
import { Route , withRouter} from 'react-router-dom';
import Dashboard from './Dashboard';
import {register} from './UserServices.js';
import {login} from './UserServices';

class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", errors: [], isRegistered: false };
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
        this.clearValiadtionErr("register");
        // eslint-disable-next-line
        if (/[.~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(e.target.value) && e.target.value.length !== 0) {
            this.showValidationErr("sformat", "Username cannot contain special character!");
            console.log('Username cannot contain special character!');
        }
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
        this.clearValiadtionErr("pformat");
        this.clearValiadtionErr("register");
        if (e.target.value.length < 6 && e.target.value.length !== 0) {
            this.showValidationErr("pformat", "Password must be more than 6 digits!");
            console.log('Password must be more than 6 digits!');
        }
    }



    submitRegister(e) {
        e.preventDefault()

        if (this.state.username !== "" && this.state.password !== "") {
            this.setState({ username: e.target.value });
            this.setState({ password: e.target.value });
            this.setState({ isRegistered: true});
            console.log('Format correct!');
            console.log('Register successfully!');   

            const newUser = {
                username: this.state.username,
                password: this.state.password
            }
            register(newUser).then(res =>{
                login(newUser).then(res => {
                    if(!res.error){
                        this.props.history.push('/')
                    }
                })
                     
            }) 
        }
    }


    render() {

        let registerErr = null;
        let pFormatErr = null;
        let sFormatErr = null;

        for (let err of this.state.errors) {

            if (err.elm === "pformat") {
                pFormatErr = err.msg;
            }
            if (err.elm === "sformat") {
                sFormatErr = err.msg;
            }
            if (err.elm === "register") {
                registerErr = err.msg;
            }

        }
        
        

        return (

            <div className="box-container" >
                <div className="inner-container" >
                    <Route path="/dashboard"
                        exact strict component={Dashboard}
                    />
                    <div className="header" >
                        Register </div>

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
                            onClick={this.submitRegister.bind(this)}> Register </button>

                        

                        <small className="danger-error"> {registerErr ? registerErr : ""} </small>


                    </div>

                </div>
            </div>
        );
    }

}

export default withRouter(RegisterBox);