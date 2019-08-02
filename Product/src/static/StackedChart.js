import React from 'react';
import ReactApexChart from 'react-apexcharts';


class StackedChart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true,
          stackType: '100%'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            }
          }
        }],
        xaxis: {
          categories: ['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D', 'Hotel E', 'Hotel F',
            'Hotel G', 'Hotel H','Hotel I'
          ],
          labels: {
            style: {
              colors: ['white','white','white','white','white','white','white','white','white']
            },
          }
        },
        yaxis:{
          labels: {
            style: {
              color:'white'
            },
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'right',
          offsetX: -10,
          offsetY: 50,
          labels:{
            useSeriesColors: true
          },
        },
        title:{
          text:'Type of Comments for Each Hotel',
          align: 'center',
          style:{
            color: 'white'
          }
        }
      },
      series: [{
        name: 'Neutral',
        data: [44, 55, 41, 67, 22, 43, 21, 49,39]
      }, {
        name: 'Positive',
        data: [13, 23, 20, 8, 13, 27, 33, 12,14]
      }, {
        name: 'Negative',
        data: [11, 17, 15, 15, 21, 14, 15, 13,9]
      }],
    }
  }

  render() {
    return (


      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" width="600"/>
      </div>


    );
  }
}

export default StackedChart