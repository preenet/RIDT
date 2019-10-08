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
          <div className="sparkline">
          < Sparkline />
        </div>


        <div className="grid-chart">

          <div className="chart grid-item" >
            < BarChart />
          </div>

          <div className="chart grid-item">
            < BarChart2 />
          </div>

          <div className="chart grid-item">
            < StackedChart />
          </div>

          <div className="chart grid-item">
            < LineChart />
          </div>

        </div>
      

      </div>
    );
  }
}

export default Summary;