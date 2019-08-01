import React from 'react';
import ReactApexChart from 'react-apexcharts';


class BarChart extends React.Component {
      
  constructor(props) {
    super(props);

    this.state = {
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
          categories: ['Good place', 'Great', 'Not bad', 'It\'s just not bad', 'Normal', 'Worth it', 'Bad',
            'Clean', 'Quiet', 'Beautiful'
          ],
        },
        title:{
          text:'Fequence of Word',
          align: 'center'
        }
      },
      series: [{
        name: 'Fequence',
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      }],
    }
    }

    render() {
      return (
        

        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height="350" />
        </div>


      );
    }
  }

  export default BarChart;