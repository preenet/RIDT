import React from 'react';
import '../../static/App.css';
import { getHotelByName, addComment } from '../services/DataServices'
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Card from './Card';
// import Typing from '../test/Typing';
// import GetUsername from '../test/GetUsername';
// import Chatkit from '@pusher/chatkit-client';

class HotelBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: [], isLoggedin: false, comment: '', length: 200, username: '', test: [],
            currentUsername: '',
            // visibleScreen: "getUsernameScreen",
            messages: [],
            currentRoom: {},
            currentUser: {},
            typingUsers: [],
        };
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }

    sendMessage() {
        if (this.state.comment) {
            this.state.currentUser.sendMessage({
                text: this.state.comment,
                roomId: this.state.currentRoom.id,
            })
        }
        this.setState({ comment: '' });
    }

    sendTypingEvent(event) {
        
        // this.state.currentUser
        //     .isTypingIn({ roomId: this.state.currentRoom.id })
        //     .catch(error => console.error('error', error))

        this.setState({ comment: event.target.value });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    onUsernameSubmitted(username) {

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => {
                this.setState({
                    currentUsername: username,
                    visibleScreen: 'Chat'
                })
            })
            .catch(error => console.error('error', error))
    }

    componentDidMount() {


        this.getHotel();
        if (localStorage.getItem('usertoken')) {

            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            this.setState({
                isLoggedin: true,
                username: decoded.identity.username,
            });
        } else if (localStorage.getItem('admintoken')) {
            const token = localStorage.admintoken;
            const decoded = jwt_decode(token);
            this.setState({
                isLoggedin: true,
                username: decoded.identity.username,
            });
        }
        
        // const chatManager = new Chatkit.ChatManager({
        //     instanceLocator: 'v1:us1:2265d954-0085-464f-971d-6e8759b23438',
        //     userId: 'admin',
        //     tokenProvider: new Chatkit.TokenProvider({
        //         url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2265d954-0085-464f-971d-6e8759b23438/token',
        //     }),
        // });


        // chatManager.connect()
        //     .then(currentUser => {
        //         this.setState({ currentUser })
                
        //         return currentUser.subscribeToRoom({
        //             roomId: 'bcb3ab73-ba1d-4811-b91e-426684792a9b',
        //             messageLimit: 2,
        //             hooks: {

        //                 onUserStartedTyping: user => {
                            
        //                     this.setState({
        //                         typingUsers: [...this.state.typingUsers, user.name],
        //                     })
        //                 },
        //                 onUserStoppedTyping: user => {
        //                     this.setState({
        //                         typingUsers: this.state.typingUsers.filter(
        //                             username => username !== user.name
        //                         ),
        //                     })
        //                 },
        //             },
        //         })
        //     })
        //     .then(currentRoom => {
        //         this.setState({ currentRoom })
        //     })
        //     .catch(error => console.error('error', error))
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
            hotel: this.props.hotelname,
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
            length: 2000,
        });
    }

    viewLess(e) {
        e.preventDefault();
        this.setState({
            length: 200,
        });
    }

    render() {

        const listItems = this.state.comments.map((c, i) =>

            <div className="text-comment" key={i}>
                <div>
                    <Card comment={c} index={i} />
                </div>

            </div>);

        // if (this.state.visibleScreen === 'getUsernameScreen') {
        //     return <GetUsername onSubmit={this.onUsernameSubmitted} username={this.state.username} />
        // }
        // if (this.state.visibleScreen === 'Chat') {
            return (
                <div>
                  
                    <div>
                        <button type="button" className="left-controller" onClick={this.onBack.bind(this)}>Back</button>
                        <button type="button" className="right-controller" onClick={this.logout.bind(this)}>Logout</button>
                        <h1 className='welcome'>{this.props.hotelname}</h1>
                        <h2 style={{ color: 'white' }}>{this.state.username ? 'Hello, ' + this.state.username : ''}</h2>

                        <TextField
                            className='input-text'
                            label="Write a comment"
                            value={this.state.comment}
                            disabled={!this.state.isLoggedin}
                            onChange={this.sendTypingEvent}
                            onKeyPress={this._handleKeyPress}
                        />
                      
                          {/* <Typing currentUsername={this.state.currentUsername} /> */}

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

                        <div className="grid-text">  {listItems}</div>



                    </div>
                </div>

            );
        // }


    }

}

export default withRouter(HotelBox);