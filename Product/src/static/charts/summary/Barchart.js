import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { getWords } from '../../services/DataServices'

class BarChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      words: [],
      options: {
        plotOptions: {
          bar: {
            horizontal: true,
          },

        },
        dataLabels: {
          enabled: false,

        },
        xaxis: {
          categories: [],
          tickPlacement: 'between',
          labels: {
            style: {
              colors: ['white'],

            },
          }
        },

        yaxis: {
          labels: {
            style: {
              color: 'white',
              fontSize: '14px',
            },
          }
        },
        title: {
          text: 'Fequence of Word',
          align: 'center',
          style: {
            color: 'white',
          }
        }
      },
      series: [{
        data: []
      }],
    }
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    getWords().then(data => {
      let info = []
      let info1 = []
      for (let i = 0; i < 10; i++) {
        info.push(data[i].text)
        info1.push(data[i].value)
      }

      this.setState({
        options: {
          ...this.state.options, xaxis: { ...this.state.options.xaxis, categories: info }
        },
        series: [{
          data: info1,
          name: 'Fequence'
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
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="340" width="500" />
        </div>
      </div>

    );
  }
}

export default BarChart;