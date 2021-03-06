import React from 'react';
import '../../../static/App.css';
import BarChart from './Barchart';
import BarChart2 from './Barchart_2';
import StackedChart from './StackedChart';
import LineChart from './LineChart';
import Sparkline from './Sparkline';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSummaryShow: false };

  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        isSummaryShow: true,
      });
    }, 1500);
  }

  render() {
    return (

      <div>
        <Loader
          type="Oval"
          color="white"
          height={100}
          width={100}
          timeout={1000} />

        {this.state.isSummaryShow && <div>

          <div className="summary">
            <div className="summray-item">
              <div className="grid-chart">

                <div className="chart grid-item" >
                  < BarChart />
                </div>

                <div className="chart grid-item">
                  < BarChart2 />
                </div></div>
            </div>
            <div className="summray-item"> <div className="sparkline">
              < Sparkline />
            </div></div>
            <div className="summray-item">

              <div className="grid-chart">

                <div className="chart grid-item">
                  < StackedChart />
                </div>

                <div className="chart grid-item">
                  < LineChart />
                </div>

              </div>
            </div>
          </div>

        </div>}

      </div>
    );
  }
}

export default Summary;