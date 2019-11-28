import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getRate } from '../../services/DataServices';


class LineChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Positive Comments',
          align: 'center',
          style: {
            color: 'white',
          }
        },

        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'white', 'white', 'white', 'white', 'white']
            },
          }
        },
        yaxis: {
          labels: {
            style: {
              color: 'white',
            },
          }
        }
      },
      series: [{
        name: "Positive comments",
        data: []
      }],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getRate().then(data => {

      const info = []
      const info1 = []
      for (let i = 0; i < data.length; i++) {
        info.push(data[i][1]);
        info1.push(data[i][0]);
      }
      console.log(info1);
      this.setState({
        options: {
          chart: {
            xaxis: {
              categories: info1
            }
          }
        },
        series: [{
          data: info
        }]
      });

    }).catch(err => {
      alert('Cannot connect to database, please try again!');
    });
  }


  render() {
    return (

      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" width="500" />
        </div>

      </div>

    );
  }
}

export default LineChart;