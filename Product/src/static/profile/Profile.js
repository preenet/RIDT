import React from 'react';
import '../../static/App.css';
import jwt_decode from 'jwt-decode'
import ViewBox from '../comment/View';
import Edit from './Edit';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            status:'',
            trial_time:'',
            isCommentShow: true,
            isEditShow: false
        }
    }

    componentDidMount() {
        
        if (localStorage.usertoken) {
            
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            this.setState({
                username: decoded.identity.username,
                status: decoded.identity.status,
                trial_time: decoded.identity.trial_time,
            });
        } else {
            alert('Please login!');
            this.props.history.push('/');
            window.location.reload();
        }
    }

    dashboard(e) {
        e.preventDefault()
        this.props.history.push('/dashboard')
    }

    showEdit(e) {
        e.preventDefault()
        console.log('Edit is showing!');
        this.setState({ isEditShow: true, isCommentShow: false });
    }

    showComment(e) {
        e.preventDefault()
        console.log('Comment is showing!');
        this.setState({ isCommentShow: true, isEditShow: false });
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
                <h1 style={{ 'color': 'white' }} >Hello, {this.state.username}</h1>
                <p style={{ 'color': 'white' }}>Your Account Status:  {this.state.status}</p>
                <p style={{ 'color': 'white' }}>Your Account Expire Time:  {this.state.status !== "approved" ? "Disabled" : this.state.trial_time}</p>
                <small className="danger-error" > {this.state.status !== "approved" ? "You cannot access dashboard until the admin approves your account." : ""} </small>
                <div>
                    {/* <button type="button" className="controller" onClick={this.getProfile.bind(this)}> Refresh </button> */}
                    <button type="button" className="controller" onClick={this.showComment.bind(this)}> View Comment </button>
                    <button type="button" className="controller" onClick={this.showEdit.bind(this)}> Edit Profile </button>
                    <button type="button" className={this.state.status === 'approved' ? "controller" : "controller-disabled"} disabled={this.state.status !== 'approved'} onClick={this.dashboard.bind(this)}> Dashboard </button>
                    <button type="button" className="controller" onClick={this.logout.bind(this)}> Logout </button>
                </div>
                {this.state.isEditShow && < Edit />}
                {this.state.isCommentShow && < ViewBox />}

            </div>
        );
    }
}

export default Profile;