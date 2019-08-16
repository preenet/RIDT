import React from 'react';
import '../../../static/App.css';
import BarChart from './Barchart';
import BarChart2 from './Barchart_2';
import StackedChart from './StackedChart';
import LineChart from './LineChart';
import Sparkline from './Sparkline';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        <div className="top">
          < Sparkline />
        </div>
        <div className="bottom">
          <div className="left-top">
            < LineChart />
          </div>

          <div className="right-top" >
            < BarChart />
          </div>

          <div className="left-bottom">
            < BarChart2 />
          </div>

          <div className="right-bottom">
            < StackedChart />
          </div>

        </div>



      </div>
    );
  }
}

export default Summary;