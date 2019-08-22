import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", status: "", trial_time: "" };

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

    edit(e){
        e.preventDefault()
        this.props.history.push('/edit')
    }

    dashboard(e){
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
               
                <h1 style={{ color: 'white' }}>Hello {this.state.username}</h1>
                <p style={{ color: 'white' }}>Your account status: {this.state.status}</p>
                <p style={{ color: 'white' }}>Your account trial time: {this.state.trial_time}</p>
                <button type="button" className="controller" onClick={this.edit.bind(this)}> Edit </button>
                <button type="button" className="controller" onClick={this.dashboard.bind(this)}> Dashboard </button>
                <button type="button" className="controller" onClick={this.logout.bind(this)}> Logout </button>
            </div>
        );
    }
}

export default Profile;