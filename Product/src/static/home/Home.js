import React from 'react';
import '../../static/App.css';
import LoginBox from './Login';
import ViewBox from '../comment/View';
import RegisterBox from './Register'


class HomeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoginOpen: false, isViewOpen: true, isRegisterOpen: false };
    }

   
    showLoginBox() {
        console.log('LoginBox is showing!');
        this.setState({ isLoginOpen: true, isViewOpen: false, isRegisterOpen: false });
    }

    showViewBox() {
        console.log('ViewBox is showing!');
        this.setState({ isLoginOpen: false, isViewOpen: true, isRegisterOpen: false });
    }

    showRegisterBox() {
        console.log('RegisterBox is showing!');
        this.setState({ isLoginOpen: false, isViewOpen: false, isRegisterOpen: true });
    }

    render() {


        return (

            <div>

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showLoginBox.bind(this)} >
                    Login </button>

                    <button type="button"
                    className={
                        "controller " + (this.state.RegisterOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showRegisterBox.bind(this)} >
                    Regitser </button>
                <div className="root-container" >

                    {this.state.isLoginOpen && < LoginBox />}
                    {this.state.isViewOpen && < ViewBox />}
                    {this.state.isRegisterOpen && < RegisterBox />}

                    {(this.state.isLoginOpen || this.state.isRegisterOpen) && <button type="button"
                        className="cancel-btn"
                        onClick={this.showViewBox.bind(this)}>
                        Cancel </button>}
                </div>
            </div>


        );
    }
}

export default HomeBox;