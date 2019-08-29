import React from 'react';
import './static/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './static/home/Home';
import Dashboard from './static/home/Dashboard';
import Profile from './static/profile/Profile';
import Edit from './static/profile/Edit';
import Admin from './static/admin/Admin';
class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

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

        </div>

      </Router>

    );
  }

}




export default App;
