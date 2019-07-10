import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        <h1>Hello Dashboard</h1>
        <Link to="/"><button type="button" className="login-btn" > Logout </button></Link>

      </div>
    );
  }
}

export default Dashboard;