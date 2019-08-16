import React from 'react';
import '../../static/App.css';
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Summary from '../charts/summary/Summary';
import WordCloud from '../charts/word_cloud/WordCloud';
import Heatmap from '../charts/heatmap/Heatmap';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSummaryOpen: true, isWord_CloudOpen: false, isHeatmapOpen: false };
    console.log('Summary is showing!');
  }

  showSummary() {
    console.log('Summary is showing!');
    this.setState({ isSummaryOpen: true, isWord_CloudOpen: false, isHeatmapOpen: false });
  }

  showWordCloud() {
    console.log('Word-Cloud is showing!');
    this.setState({ isSummaryOpen: false, isWord_CloudOpen: true, isHeatmapOpen: false });
  }

  showHeatMap() {
    console.log('Heatmap is showing!');
    this.setState({ isSummaryOpen: false, isWord_CloudOpen: false, isHeatmapOpen: true });
  }

  logout(){
    console.log('Log out successfully');
  }

  render() {
    return (
      <div>
        <h1 style={{color: 'white'}}>RIDT</h1>

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

            <Link to="/"><button type="button" className="controller" onClick={this.logout.bind(this)}> Logout </button></Link>
          </div>



        </div>
       
        {this.state.isSummaryOpen && < Summary />}
       
        {this.state.isWord_CloudOpen && < WordCloud />}
       
        {this.state.isHeatmapOpen && < Heatmap />}
      
      </div>
    );
  }
}

export default Dashboard;