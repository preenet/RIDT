import React from 'react';
import '../../static/App.css';
import { getHotelByName, addComment } from '../services/DataServices'
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

class HotelBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { comments: [], isLoggedin: false, comment: '', length: 200, username:''};
    }

    componentDidMount() {
        this.getHotel();
        if (localStorage.getItem('admintoken') || localStorage.getItem('usertoken')) {
           
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            this.setState({
                isLoggedin: true,
                username: decoded.identity.username,
            });
        }
    }


    getHotel = () => {
        const hotel = { name: this.props.hotelname }
        getHotelByName(hotel).then(res => {
            console.log(res.data);
            this.setState(
                {
                    comments: res.data
                },
            )
        }).catch(err => {
            console.log(err);
            alert('Cannot connect to database, please try again!');
        })
    }

    onCommentChanged(e) {
        e.preventDefault();
        this.setState({ 
            comment: e.target.value,
         });
    }

    clear() {
        this.setState({
            comment: ''
        });
    }

    submit(e) {
        e.preventDefault();
        const comment = {
            username: this.state.username,
            content: this.state.comment,
            hotel: this.props.hotelname
        }

        addComment(comment).then(res => {
            this.getHotel();
            this.clear()
        }).catch(err => {
            console.log(err);
        });
    }

    onBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    logout(e) {
        e.preventDefault();
        this.props.history.push('/');
        if (localStorage.usertoken) {
            localStorage.removeItem('usertoken');
        }
        if (localStorage.admintoken) {
            localStorage.removeItem('admintoken');
        }
        console.log('Log out successfully');
    }

    viewMore(e) {
        e.preventDefault();
        this.setState({
            length : 2000,
        });
    }

    viewLess(e) {
        e.preventDefault();
        this.setState({
            length : 200,
        });
    }

    render() {
        
        const listItems = this.state.comments.map((c, i) =>

            <div className="text-comment" key={i}>
                <div>
                    <strong> ID: {i + 1}  Date:  {c.date}   </strong>
                    <strong> Rating: {c.rating}</strong>
                    <p>{c.content.length > this.state.length ? c.content.slice(0, this.state.length) + '...' : c.content}</p>
                    <p className="underline-left" onClick={this.viewMore.bind(this)}>Show More</p>
                    <p className="underline-right" onClick={this.viewLess.bind(this)}>Show Less</p>
                </div>


            </div>);
        return (
            <div>
                <button type="button" className="left-controller" onClick={this.onBack.bind(this)}>Back to Home</button>
                <button type="button" className="right-controller" onClick={this.logout.bind(this)}>Logout</button>
                <h1 className='welcome'>{this.props.hotelname}</h1>
                <h2 style={{color:'white'}}>{this.state.username?'Hello, '+ this.state.username:''}</h2>
                <TextField
                    className='input-text'
                    label="Write Comment"
                    value={this.state.comment}
                    disabled={!this.state.isLoggedin}
                    onChange={this.onCommentChanged.bind(this)}
                />

                <div>
                    <small className="danger-error" > {!this.state.isLoggedin ? 'You need to login before typing!' : ''} </small>
                    <small className="danger-error">
                        <Link
                            className='small-login'
                            to={{
                                pathname: "/",
                                value: {
                                    isLoginOpen: true
                                }
                            }}>
                            {!this.state.isLoggedin ? 'Login/' : ''}
                        </Link>
                        <Link
                            className='small-login'
                            to={{
                                pathname: "/",
                                value: {
                                    isRegisterOpen: true
                                }
                            }}>
                            {!this.state.isLoggedin ? 'Register' : ''}
                        </Link>
                    </small>


                </div>

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.clear.bind(this)} >
                    Clear </button>

                <button type="button"
                    className={
                        "controller " + (this.state.isLoginOpen ?
                            "selected-controller" :
                            "")
                    }
                    onClick={this.submit.bind(this)} disabled={!this.state.isLoggedin || this.state.comment.length === 0}>
                    Submit </button>



                {listItems}

            </div>
        );
    }

}

export default withRouter(HotelBox);