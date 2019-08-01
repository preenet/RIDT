import React from 'react';
import './App.css';
import BarChart from './Barchart';
import BarChart2 from './Barchart_2';
import StackedChart from './StackedChart';
import LineChart from './LineChart';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  render() {
    return (
      <div>
        

        <div className="left-top" >
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
    );
  }
}

export default Summary;