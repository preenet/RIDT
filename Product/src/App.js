import React from 'react';
import './static/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './static/home/Home';
import Dashboard from './static/home/Dashboard';
import Profile from './static/profile/Profile';
import Edit from './static/profile/Edit';
import Admin from './static/admin/Admin';
import HotelBox from './static/comment/Hotel';
import jwt_decode from 'jwt-decode';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

  }

  componentDidMount() {
    if (localStorage.admintoken) {
      const token = localStorage.admintoken;
      const decoded = jwt_decode(token);
      this.setState({
        username: decoded.identity.username,

      });
    }else if(localStorage.usertoken){
      const token = localStorage.admintoken;
      const decoded = jwt_decode(token);
      this.setState({
        username: decoded.identity.username,

      });
    }
  }

  render() {



    return (


      <Router>
        <div className="App" >

          <Route path="/" exact strict component={Home} />

          <Route path="/dashboard" exact strict component={Dashboard} />

          <Route path="/profile" exact strict component={Profile} />

          <Route path="/edit" exact strict component={Edit} />

          <Route path="/admin" exact strict component={Admin} />

          <Route path="/hotel/:hotelname" exact strict render={({ match }) => <HotelBox hotelname={match.params.hotelname} username={this.state.username} />} />


        </div>

      </Router>
    );





  }

}


export default App
