import React from "react";
import reactDom from "react-dom";
import './login.css';

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

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    submitLogin(e) {

    }

    render() {
        return (
            <div className="inner-container">

                <div className="header">
                    Login
            </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username:</label><br />
                        <input type="text" name="username" className="login-input" placeholder="Username" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" name="password" className="login-input" placeholder="Password" />
                    </div>

                    <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)} >Login</button>

                </div>

            </div>
        );
    }

}

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    submitComment(e) {

    }

    render() {
        return (
            <div className="inner-container">

                <div className="header">
                    Comment
            </div>

                <div className="box">

                    <div className="input-group">
                        <label htmlFor="hotelname">Hotel Name:</label><br />
                        <input type="text" name="hotelname" className="comment-input" placeholder="Hotel Name" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="review">Review:</label><br />
                        <input type="text" name="review" className="comment-input" placeholder="Review" />
                    </div>

                    <button type="button" className="comment-btn" onClick={this.submitComment.bind(this)} >Comment</button>

                </div>

            </div>
        );
    }

}

export default Login;