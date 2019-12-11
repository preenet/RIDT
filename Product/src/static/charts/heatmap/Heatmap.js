import React from 'react';
import '../../../static/App.css';
import ReactApexChart from 'react-apexcharts';

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

class Heatmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      options: {
        xaxis: {
          labels: {
            style: {
              colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',
                'white', 'white', 'white', 'white', 'white', 'white', 'white',]
            }
          }
        },

        yaxis: {
          labels: {
            style: {
              color: 'white'
            }
          }
        },
        legend: {
          labels: {
            useSeriesColors: true
          },
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [{
                from: -30,
                to: 5,
                name: 'Positive',
                color: '#00A100'
              },
              {
                from: 6,
                to: 20,
                name: 'Neutral',
                color: '#128FD9'
              },
              {
                from: 21,
                to: 45,
                name: 'Negative',
                color: '#FFB200'
              },
             
              ]
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'HeatMap Chart with Color Range',
          align: 'center',
          style: {
            color: 'white',
          }
        },

      },
      series: [
        {
          name: 'Jan',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Feb',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Mar',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Apr',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'May',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Jun',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Jul',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Aug',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        },
        {
          name: 'Sep',
          data: generateData(17, {
            min: -30,
            max: 45
          })
        }
      ],
    }

  }

  render() {
    return (
      <div id="chart" style={{height: 600, width: 900, margin: 'auto'}}>
        <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" />
      </div>


    );
  }
}

export default Heatmap;