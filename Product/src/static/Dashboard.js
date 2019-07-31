import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import BarChart from './Barchart';
import BarChart2 from './Barchart2';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        <h1>Hello Dashboard</h1>
        <div>
          <Link to="/"><button type="button" className="logout-btn" > Logout </button></Link>
        </div>


        <div className="left-top" >
          < BarChart />
        </div>

        <div className="right-top" >
          < BarChart2 />
        </div>



      </div>
    );
  }
}

export default Dashboard;