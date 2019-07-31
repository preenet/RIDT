import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import Summary from './Summary';
import Word_Cloud from './Word_Cloud';
import Heatmap from './Heatmap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSummaryOpen: true, isWord_CloudOpen: false, isHeatmapOpen: false };

  }

  showSummary() {
    this.setState({ isSummaryOpen: true, isWord_CloudOpen: false, isHeatmapOpen: false });
  }

  showWordCloud() {
    this.setState({ isSummaryOpen: false, isWord_CloudOpen: true, isHeatmapOpen: false });
  }

  showHeatMap() {
    this.setState({ isSummaryOpen: false, isWord_CloudOpen: false, isHeatmapOpen: true });
  }

  render() {
    return (
      <div>
        <h1>RIDT</h1>

        <div>
          <div>

          </div>

          <div>

            <button type="button" className={
              "controller " + (this.state.isSummaryOpen ?
                "selected-controller" :
                "")
            } onClick={this.showSummary.bind(this)}>Summary</button>

            <button type="button" className={
              "controller " + (this.state.isWord_CloudOpen ?
                "selected-controller" :
                "")
            } onClick={this.showWordCloud.bind(this)}>Word-Cloud</button>

            <button type="button" className={
              "controller " + (this.state.isHeatmapOpen ?
                "selected-controller" :
                "")
            } onClick={this.showHeatMap.bind(this)}>Heatmap</button>

            <Link to="/"><button type="button" className="logout-btn"> Logout </button></Link>
          </div>



        </div>

        {this.state.isSummaryOpen && < Summary />}
        {this.state.isWord_CloudOpen && < Word_Cloud />}
        {this.state.isHeatmapOpen && < Heatmap />}

      </div>
    );
  }
}

export default Dashboard;