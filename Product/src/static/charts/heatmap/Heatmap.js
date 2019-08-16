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
        stroke: {
          width: 0
        },
        plotOptions: {
          heatmap: {
            radius: 20,
            enableShades: false,
            colorScale: {
              ranges: [{
                from: 0,
                to: 50,
                color: '#00E396',
                name:'More Positive Comments in This Month',
              },
              {
                from: 51,
                to: 100,
                color: 'orange',
                name:'More Negative Comments in This Month',
              },
              ],
            },

          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff']
          }
        },
        xaxis: {
          type: 'category',
          categories: ['Hotel A','Hotel B','Hotel C','Hotel D','Hotel E','Hotel F','Hotel G','Hotel H','Hotel I',],
          labels: {
            style: {
              colors: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white',],
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
        
        title: {
          
          
        },
        legend: {
          labels: {
            colors:['white','white'],
            useSeriesColors: false
          },
        },
      },
      series: [
        {
          name: 'Jan',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Feb',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Mar',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Apr',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'May',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Jun',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Jul',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Aug',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Sep',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Oct',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Nov',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
        {
          name: 'Dec',
          data: generateData(9, {
            min: 0,
            max: 90
          })
        },
      ],
    }
  }

  render() {
    return (


      <div className="heatmap" id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="heatmap" height="800" />
      </div>


    );
  }
}

export default Heatmap;