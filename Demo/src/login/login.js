import React from "react";
import reactDom from "react-dom";
import './login.css';
//import Route from 'react-router-dom/Route'
//import {BrowserRouter as Router} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isCommentOpen: false };
    }

    showLoginBox() {
        this.setState({ isLoginOpen: true, isCommentOpen: false });
    }

    showCommentBox() {
        this.setState({ isLoginOpen: false, isCommentOpen: true });
    }

    render() {
        return (

            

            <div className="root-container">
                <WelcomeBox />
                <div className="box-controller">
                    <button type="button" className={"controller " + (this.state.isLoginOpen
                        ? "selected-controller"
                        : "")}
                        onClick={this.showLoginBox.bind(this)}>
                        Login
                    </button>

                    <button type="button" className={"controller " + (this.state.isCommentOpen
                        ? "selected-controller"
                        : "")} onClick={this.showCommentBox.bind(this)}>
                        Comment
                    </button>

                </div>

                <div className="box-container">

                    {this.state.isLoginOpen && <LoginBox />}
                    {this.state.isCommentOpen && <CommentBox />}

                </div>

            </div>
        );

    }

}

class WelcomeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    render() {
        return (
            <div className="welcome">
                Welcome to The Real-Tme Interactive Dashboard for Tourism!

            </div>
        );
    }
}

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", errors: [] };

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
    }

    onPasswordChanged(e) {
        this.setState({ password: e.target.value })
        this.clearValiadtionErr("password");
    }

    submitLogin(e) {
        if (this.state.username == "") {
            this.showValidationErr("username", "Username cannot be empty!")
        }
        if (this.state.password == "") {
            this.showValidationErr("password", "Password cannot be empty!")
        }
        if (this.state.username != "" && this.state.password == "") {
            this.setState({ username: e.target.value });
            this.setState({ password: e.target.value });

        }
        console.log(this.state.username);
        console.log(this.state.username);
    }





    render() {

        let usernameErr = null;
        let passwordErr = null;

        for (let err of this.state.errors) {
            if (err.elm == "username") {
                usernameErr = err.msg;
            }
            if (err.elm == "password") {
                passwordErr = err.msg;
            }
        }

        return (
            <div className="inner-container">

                <div className="header">
                    Login
            </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username:</label><br />
                        <input type="text" name="username" className="login-input"
                            value={this.state.username} onChange={this.onUsernameChanged.bind(this)}
                            placeholder="Username" />
                    </div>
                    <small className="danger-error">{usernameErr ? usernameErr : ""}</small>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" name="password" className="login-input"
                            value={this.state.password} onChange={this.onPasswordChanged.bind(this)}
                            placeholder="Password" />
                    </div>
                    <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                    <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)} >Login</button>

                </div>

            </div>
        );
    }

}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hotelName: "", review: "", errors: [] };

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

    onHotelNameChanged(e) {
        this.setState({ hotelName: e.target.value })
        this.clearValiadtionErr("hotelName");
    }

    onReviewChanged(e) {
        this.setState({ review: e.target.value })
        this.clearValiadtionErr("review");
    }

    submitComment(e) {
        if (this.state.hotelName == "") {
            this.showValidationErr("hotelName", "Hotel name cannot be empty!")
        }
        if (this.state.review == "") {
            this.showValidationErr("review", "Review cannot be empty!")
        }
    }

    render() {

        let hotelNameErr = null;
        let reviewErr = null;

        for (let err of this.state.errors) {
            if (err.elm == "hotelName") {
                hotelNameErr = err.msg;
            }
            if (err.elm == "review") {
                reviewErr = err.msg;
            }
        }

        return (
            <div className="inner-container">

                <div className="header">
                    Comment
            </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="hotelname">Hotel Name:</label><br />
                        <input type="text" name="hotelname" className="comment-input"
                            onChange={this.onHotelNameChanged.bind(this)} placeholder="Hotel Name" />
                    </div>

                    <small className="danger-error">{hotelNameErr ? hotelNameErr : ""}</small>

                    <div className="input-group">
                        <label htmlFor="review">Review:</label><br />
                        <input type="text" name="review" className="comment-input" onChange={this.onReviewChanged.bind(this)} placeholder="Review" />
                    </div>

                    <small className="danger-error">{reviewErr ? reviewErr : ""}</small>

                    <button type="button" className="comment-btn" onClick={this.submitComment.bind(this)} >Comment</button>

                </div>

            </div>
        );
    }

}

export default Login;