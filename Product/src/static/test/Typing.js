import React, { Component } from 'react'
import '../App.css';
import Chatkit from '@pusher/chatkit-client';
import TypingIndicator from './TypingIndicator';

class Typing extends Component {

  constructor(props) {
    super(props);

    this.state ={
      messages: [],
      currentRoom: {},
      currentUser: {},
      typingUsers: [],
      chatInput: '',
    }

  }

  componentDidMount() {
    
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:2265d954-0085-464f-971d-6e8759b23438',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2265d954-0085-464f-971d-6e8759b23438/token',
      }),
    })
    
    chatManager.connect()
      .then(currentUser => {
        this.setState({ currentUser })
        console.log(this.state.currentUser);
        return currentUser.subscribeToRoom({
          roomId: 'bcb3ab73-ba1d-4811-b91e-426684792a9b',
          messageLimit: 2,
          hooks: {
            onUserStartedTyping: user => {
                this.setState({
                  typingUsers: [...this.state.typingUsers, user.name],
                })
              },
            onUserStoppedTyping: user => {

              this.setState({
                typingUsers: this.state.typingUsers.filter(
                  username => username !== user.name
                ),
              })
            },
          },
        })
      })
      .then(currentRoom => {
        this.setState({ currentRoom })
       })
      .catch(error => console.error('error', error))
  }

  render() {
    return (
      
        <TypingIndicator typingUsers={this.state.typingUsers} />
    
    );
  }
}

export default Typing;
