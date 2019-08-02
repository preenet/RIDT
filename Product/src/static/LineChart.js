import React from 'react';
import ReactApexChart from 'react-apexcharts';



class LineChart extends React.Component {
    
    constructor(props) {
      super(props);

      this.state = {
        chartOptionsArea: {
          chart: {
            id: 'chartArea',
            toolbar: {
              autoSelected: 'pan',
              show: false
            },
          },
          colors: ['#546E7A'],
          stroke: {
            width: 3
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            opacity: 1,
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime',
            labels: {
              style: {
                colors:['white','white','white','white','white','white','white']
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
          title:{
            text:'Positive Comments Rate',
            align: 'center',  
            style:{
              color: 'white'
            }
          }
        },
        chartOptionsBrush: {
          chart: {
            id: 'chartBrush',
            brush: {
              target: 'chartArea',
              enabled: true
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date('19 Jun 2017').getTime(),
                max: new Date('14 Aug 2017').getTime()
              }
            },
          },
          colors: ['#008FFB'],
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.91,
              opacityTo: 0.1,
            }
          },
          xaxis: {
            type: 'datetime',
            tooltip: {
              enabled: false
            },
            labels: {
              style: {
                colors:['white','white','white','white','white','white','white','white','white','white','white'],
              },
            }
          },
          yaxis: {
            tickAmount: 2,
            labels: {
              style: {
                color:'white'
                
              },
            }
          },
          
      },
      series: [{
          name:'Positive Rate',
          data: this.generateDayWiseTimeSeries(new Date('1 Jan 2017').getTime(), 48, {
            min: 0,
            max: 100
          })
        }], 
      }
    }

    generateDayWiseTimeSeries (baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000*7;
        i++;
      }
      
      return series;
    }

    render() {

      return (
        

          <div id="charts">
            <div id="chart1">
              <ReactApexChart options={this.state.chartOptionsArea} series={this.state.series} type="line" height="230" />
            </div>
            <div id="chart2">
              <ReactApexChart options={this.state.chartOptionsBrush} series={this.state.series} type="area" height="130" />
            </div>
          </div>
  

      );
    }
  }


  export default LineChart;