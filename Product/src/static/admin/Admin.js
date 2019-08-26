import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'
import Accounts from './Accounts';
import WaitingList from './WaitingList';
import Log from './Log';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", isLogShow: true, isAccountShow: false, isWaitingListShow: false,};

    }
  
    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            username: decoded.identity.username,
            status: decoded.identity.status,
            trial_time: decoded.identity.trial_time
        });
        console.log(decoded.identity);
    }
    
    showLog(e){
        e.preventDefault();
        console.log('Log is showing!');
        this.setState({ isLogShow: true, isAccountShow: false, isWaitingListShow: false, });
    }

    showDashboard(e){
        e.preventDefault();
        this.props.history.push('/dashboard');
        console.log('Dashboard is showing!');
    }

    showAccount(e){
        e.preventDefault();
        console.log('Account is showing!');
        this.setState({ isLogShow: false, isAccountShow: true, isWaitingListShow: false, });
    }

    showWaitingList(e){
        e.preventDefault()
        console.log('Waiting List is showing!');
        this.setState({ isLogShow: false, isAccountShow: false, isWaitingListShow: true,  });
    }

    logout(e) {
        e.preventDefault();
        this.props.history.push('/');
        localStorage.removeItem('usertoken')
        console.log('Log out successfully');
    }

    render() {
        return (
            <div >
                <h1 style={{ color: 'white' }}>Hello {this.state.username}</h1>
                <button type="button"
                    className={
                        "controller " + (this.state.isLogShow ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showLog.bind(this)} >
                    System Logs</button>
              
                    <button type="button"
                    className={
                        "controller " + (this.state.isAccountShow ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showAccount.bind(this)} >
                    All Accounts</button>
                    <button type="button"
                    className={
                        "controller " + (this.state.isWaitingListShow ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.showWaitingList.bind(this)} >
                    Waiting List</button>
                    <button type="button"
                    className="controller"
                    onClick={this.showDashboard.bind(this)} >
                    Dashboard</button>
                <button type="button" className="controller" onClick={this.logout.bind(this)}> Logout </button>
                {this.state.isLogShow && <Log/>}
                {this.state.isAccountShow && < Accounts />}
                {this.state.isWaitingListShow && < WaitingList />}
            </div>
        );
    }
}

export default Admin;