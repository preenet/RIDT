import React from "react";
import reactDom from "react-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginOpen: true, isCommentOpen: false };
    }

    showLoginBox(){
        this.setState({isLoginOpen: true, isCommentOpen: false});
    }

    showCommentBox(){
        this.setState({isLoginOpen: false, isCommentOpen: true});
    }

    render() {
        return (
            <div className="root-container">
                <div className="box-controller">
                    <button type="button" className="login-page" onClick={this.showLoginBox.bind(this)}>
                        Login Page
                    </button>

                    <button type="button" className="comment-page" onClick={this.showCommentBox.bind(this)}>
                        Comment Page
                    </button>

                </div>

                <div className="box-container">

                    {this.state.isLoginOpen && <LoginBox    />}
                    {this.state.isCommentOpen && <CommentBox    />}
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
                    Please Login
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
                    Please Input Your Comment
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