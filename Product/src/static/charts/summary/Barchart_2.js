import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getTop10 } from '../../services/DataServices';


class BarChart2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']

            },
          }
        },
        yaxis: {
          labels: {
            style: {
              color: 'white'
            },
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " comments"
            },

          }
        },
        legend: {
          position: 'top',
          offsetX: 0,
          offsetY: 0,
          labels: {
            useSeriesColors: true
          },

        },
        title: {
          text: 'Number of Comments for Each Hotel',
          align: 'center',
          style: {
            color: 'white'
          }
        },

      },
      series: [{
        name: 'Neutral',
        data: []
      }, {
        name: 'Positive',
        data: []
      }, {
        name: 'Negative',
        data: []
      }],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getTop10().then(data => {
      const hotel = [];
      const positive = [];
      const negative = [];
      const neutral = [];
      for (let i = 0; i < data.length; i++) {
        hotel.push(data[i].hotel);
        positive.push(data[i].positive);
        negative.push(data[i].negative);
        neutral.push(data[i].neutral);
      }
      
      this.setState({
        options: {
          ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: hotel }
        },
        series: [{ data: neutral }, {data: positive}, {data: negative}]
      })
    }).catch(err => {
      alert('Cannot connect to database, please try again!');
    })
  }

  render() {
    return (
      <div>

        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="340" width="500" />
        </div>
      </div>

    );
  }
}

export default BarChart2;