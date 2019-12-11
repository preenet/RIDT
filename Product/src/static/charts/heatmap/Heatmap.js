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
                from: 31,
                to: 50,
                name: 'Positive',
                color: '#00A100'
              },
              {
                from: 30,
                to: 30,
                name: 'Neutral',
                color: '#128FD9'
              },
              {
                from: 0,
                to: 29,
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
          name: 'Hotel Flora',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Villa Tuscolana Park Hotel',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Hotel Castel Gandolfo',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Villa Mercede',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Excel Hotel Roma Ciampino',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Tenuta Cusmano',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
        {
          name: 'Park Hotel Villa Grazioli',
          data: generateData(17, {
            min: 0,
            max: 45
          })
        },
       
      
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