import React from 'react';
import '../../../static/App.css';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';


var refreshIntervalId;
var lastDate = 0;
var data = []
var TICKINTERVAL = 86400000
let XAXISRANGE = 777600000
function getDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        data.push({
            x, y
        });
        lastDate = baseval
        baseval += TICKINTERVAL;
        i++;
    }
}

getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
    min: 10,
    max: 20
})

function getNewSeries(baseval, yrange) {
    var newDate = baseval + TICKINTERVAL;
    lastDate = newDate

    for (var i = 0; i < data.length - 10; i++) {
        // IMPORTANT
        // we reset the x and y of the data which is out of drawing area
        // to prevent memory leaks
        data[i].x = newDate - XAXISRANGE - TICKINTERVAL
        data[i].y = 0
        // console.log('date', new Date(data[i].x));
    }

    data.push({
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    })

}



class WordCloud extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRun: false,
            options: {
                chart: {
                    id: 'realtime',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },

                title: {
                    text: 'Dynamic Updating Chart',
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'datetime',
                    range: XAXISRANGE,
                },
                yaxis: {
                    max: 100
                },
                legend: {
                    show: false
                }
            },
            series: [{
                data: data.slice()
            }],
        }
    }

    run() {
        this.setState({
            isRun: true
        });
    }

    pause() {
        clearInterval(refreshIntervalId);
        this.setState({
            isRun: false
        });
    }

    componentDidUpdate(){
        if (this.state.isRun) {
            this.intervals();
        }
    }

    componentWillUnmount(){
        clearInterval(refreshIntervalId);
    }

    intervals() {
       
        refreshIntervalId = window.setInterval(() => {
            getNewSeries(lastDate, {
                min: 10,
                max: 90
            })
            ApexCharts.exec('realtime', 'updateSeries', [{
                data: data
            }])
        }, 1000)

    }

    render() {

        

        return (
            <div>
                <button type="button" className="controller " onClick={this.run.bind(this)}>Run</button>
                <button type="button" className="controller " onClick={this.pause.bind(this)}>Pause</button>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
                </div>
            </div>
        );
    }
}

export default WordCloud;

