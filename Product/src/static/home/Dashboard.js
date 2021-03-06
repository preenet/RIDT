import React from 'react';
import '../../static/App.css';
import { withRouter } from 'react-router-dom';
import Summary from '../charts/summary/Summary';
import WordCloud from '../charts/word_cloud/WordCloud';
import Heatmap from '../charts/heatmap/Heatmap';
import jwt_decode from 'jwt-decode'


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", status: "", trial_time: "", isSummaryOpen: true, isWord_CloudOpen: false, isHeatmapOpen: false, niubi: '' };
    console.log('Summary is showing!');
  }

  componentDidMount() {

    if (localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      this.setState({
        username: decoded.identity.username,
        status: decoded.identity.status,
        trial_time: decoded.identity.trial_time
      });
     
    } else if (localStorage.admintoken) {
      const token = localStorage.admintoken;
      const decoded = jwt_decode(token);
      this.setState({
        username: decoded.identity.username,
        status: decoded.identity.status,
        trial_time: decoded.identity.trial_time
      });
    } else {
      alert('Please login!');
      this.props.history.push('/');
      window.location.reload();
    }

  }

  onBack(e) {
    e.preventDefault();
    this.props.history.goBack();
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

  render() {
    return (
      <div>

        <div>
          <button type="button" className="left-controller" onClick={this.onBack.bind(this)}>Back</button>
          <button type="button" className="right-controller" onClick={this.logout.bind(this)}>Logout</button>
        </div>

        <h2 className="welcome">Current User: {this.state.username}</h2>

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


        </div>

        {this.state.isSummaryOpen && < Summary/>}

        {this.state.isWord_CloudOpen && < WordCloud />}

        {this.state.isHeatmapOpen && < Heatmap />}

      </div>
    );
  }
}

export default withRouter(Dashboard);