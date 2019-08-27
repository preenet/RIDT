import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'
import { getUser } from '../services/DataServices';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.state = {
            username: decoded.identity.username,
            status: decoded.identity.status,
            trial_time: decoded.identity.trial_time,
           
        };

        if (performance.navigation.type === 1) {
            console.log(this.state);
            this.getProfile();
        }
    }

    getProfile = () => {
        const user = {
            username: this.state.username
        }
        getUser(user).then(data => {
            if (data) {
                localStorage.setItem('usertoken', data.token)
                this.setState({
                    username: data.result.username,
                    status: data.result.status,
                    trial_time: data.result.trial_time
                })
            }
        });
    }

    edit(e) {
        e.preventDefault()
        this.props.history.push('/edit')
    }

    dashboard(e) {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }


    logout(e) {
        e.preventDefault()
        this.props.history.push('/')
        localStorage.removeItem('usertoken')
        console.log('Log out successfully');
    }

    render() {


        return (
            <div >
                <h1 style={{ color: 'white' }}>Hello, {this.state.username}</h1>
                <p style={{ color: 'white' }}>Your Account Status:  {this.state.status}</p>
                <p style={{ color: 'white' }}>Your Account Trial Time:  {this.state.status !== "approved" ? "unabled" : this.state.trial_time}</p>
                <small className="danger-error" > {this.state.status !== "approved" ? "You cannot access dashboard until the admin approves your account." : ""} </small>
                <div>
                    {/* <button type="button" className="controller" onClick={this.getProfile.bind(this)}> Refresh </button> */}
                    <button type="button" className="controller" onClick={this.edit.bind(this)}> Edit Profile </button>
                    <button type="button" className="controller" disabled={this.state.status !== 'approved'} onClick={this.dashboard.bind(this)}> Dashboard </button>
                    <button type="button" className="controller" onClick={this.logout.bind(this)}> Logout </button>
                </div>
               
            </div>
        );
    }
}

export default Profile;