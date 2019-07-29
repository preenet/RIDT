import React from 'react';
import './static/App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Home from './static/Home'
import Dashboard from './static/Dashboard'


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


        </div>

      </Router>

    );
  }

}




export default App;