import React from 'react';
import ReactApexChart from 'react-apexcharts';



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
            categories: ['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D', 'Hotel E', 'Hotel F', 'Hotel G', 'Hotel H', 'Hotel I'],
            labels: {
              style: {
                colors: ['white','white','white','white','white','white','white','white','white']
                
              },
            }
          },
          yaxis: {
            labels: {
              style: {
                color:'white'
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
            labels:{
              useSeriesColors: true
            },
            
          },
          title:{
            text:'Number of Comments for Each Hotel',
            align: 'center',
            style:{
              color: 'white'
            }
          },
          
        },
        series: [{
          name: 'Neutral',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
          name: 'Positive',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
          name: 'Negative',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
      }
    }

    render() {
      return (
        

        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350"  width="520"/>
        </div>


      );
    }
  }

  export default BarChart2;