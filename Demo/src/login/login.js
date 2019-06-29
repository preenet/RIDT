import React from "react";
import reactDom from "react-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    
    
    render() {
        return (
            <div className="root-container">
                <div className="box-controller">
                    <div className="controller">
                        Login Page
                    </div>
                </div>

                <div className="box-container">

                    <LoginBox />

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
        return(
        <div className="inner-container">

            <div className="header">
                Please Login
            </div>

            <div className="box">

                <div className="input-group">
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" name="username" className="login-input" placeholder="Username" />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password  </label><br/>
                    <input type="password" name="password" className="login-input" placeholder="Password" />
                </div>

                <button type="button" className="login=btn" onClick={this.submitLogin.bind(this)} >Login</button>

            </div>

        </div>
        );
    }

}

export default Login;