import React from 'react';
import '../../App.css';
import ReactApexChart from 'react-apexcharts';
import { getNumber, getTotalCount, getPositiveCount, getNegativeCount, getNeutralCount } from '../../services/DataServices';


window.Apex = {
    stroke: {
        width: 3
    },
    markers: {
        size: 0
    },
    tooltip: {
        fixed: {
            enabled: true,
        }
    }
};


class Sparkline extends React.Component {

    getAll = () => {
        getNumber().then(data => {
            this.setState(
                {
                    total_comments: data.results.total_number,
                    positive_comments: data.results.positive_number,
                    negative_comments: data.results.negative_number,
                    neutral_comments: data.results.neutral_number,
                    percent_positive: data.results.p_positive,
                    percent_negative: data.results.p_negative,
                    percent_neutral: data.results.p_neutral,
                    chartOptionsTopSpark1: {
                        title: {
                            text: data.results.total_number
                        }
                    },
                    chartOptionsTopSpark2: {
                        title: {
                            text: data.results.positive_number
                        }
                    },
                    chartOptionsTopSpark3: {
                        title: {
                            text: data.results.negative_number
                        }
                    }
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    getTotalCount = () => {
        getTotalCount().then(data => {
            const info = []
            for (let i = 0; i < data.results.length; i++) {
                info.push({ x: data.results[i].date, y: data.results[i].count });
            }
           
            const info1 = []
            for (let i = data.results.length - 1; i > data.results.length - 10; i--) {
                info1.push(data.results[i].count);
            }

            this.setState(
                {
                    seriesTopSpark1: [{
                        data: [...info],
                        name: 'Comment'
                    }],
                    seriesSpark1: [
                        {
                            data: [...info1],
                            name: 'Comment'
                        }
                    ],
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    getPositiveCount = () => {
        getPositiveCount().then(data => {

            const info = []
            for (let i = 0; i < data.results.length; i++) {
                info.push({ x: data.results[i].date, y: data.results[i].count });
            }

            const info1 = []
            for (let i = data.results.length - 1; i > data.results.length - 10; i--) {
                info1.push(data.results[i].count);
            }

            this.setState(
                {
                    seriesTopSpark2: [{
                        data: [...info],
                        name: 'Comment'
                    }],
                    seriesSpark2: [
                        {
                            data: [...info1],
                            name: 'Comment'
                        }
                    ],
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    getNegativeCount = () => {
        getNegativeCount().then(data => {

            const info = []
            for (let i = 0; i < data.results.length; i++) {
                info.push({ x: data.results[i].date, y: data.results[i].count });
            }

            const info1 = []
            for (let i = data.results.length - 1; i > data.results.length - 10; i--) {
                info1.push(data.results[i].count);
            }

            this.setState(
                {
                    seriesTopSpark3: [{
                        data: [...info],
                        name: 'Comment'
                    }],
                    seriesSpark3: [
                        {
                            data: [...info1],
                            name: 'Comment'
                        }
                    ],
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    getNeutralCount = () => {
        getNeutralCount().then(data => {

            const info = []
            for (let i = 0; i < data.results.length; i++) {
                info.push({ x: data.results[i].date, y: data.results[i].count });
            }

            const info1 = []
            for (let i = data.results.length - 1; i > data.results.length - 10; i--) {
                info1.push(data.results[i].count);
            }

            this.setState(
                {
                    seriesTopSpark4: [{
                        data: [...info],
                        name: 'Comment'
                    }],
                    seriesSpark4: [
                        {
                            data: [...info1],
                            name: 'Comment'
                        }
                    ],
                },
            )
        }).catch(err => {
            alert('Cannot connect to database, please try again!');
        })
    }

    componentDidMount() {
        this.getAll();
        this.getTotalCount();
        this.getPositiveCount();
        this.getNegativeCount();
        this.getNeutralCount();

    }

    constructor(props) {

        super(props);
        this.getAll();
        this.state = {
            total_comments: "",
            positive_comments: "",
            negative_comments: "",
            neutral_comments: "",
            percent_total: "100%",
            percent_positive: "",
            percent_negative: "",
            percent_neutral: "",
            test: 0,
            seriesTopSpark1: [],
            seriesTopSpark2: [],
            seriesTopSpark3: [],
            seriesSpark1: [{
                data: []
            }],
            seriesSpark2: [{
                data: []
            }],
            seriesSpark3: [{
                data: []
            }],
            seriesSpark4: [{
                data: []
            }],

            chartOptionsTopSpark1: {
                chart: {
                    sparkline: {
                        enabled: true
                    },
                },
                colors: ['#DCE6EC'],
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.3,
                },
                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                },
                yaxis: {
                    min: 0
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                },
                subtitle: {
                    text: 'Total Comments',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                }
            },
            chartOptionsTopSpark2: {
                chart: {
                    sparkline: {
                        enabled: true
                    },
                },
                colors: ['#DCE6EC'],
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    color: 'white',
                    opacity: 0.3
                },
                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                },
                yaxis: {
                    min: 0
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                },
                subtitle: {
                    text: 'Positive Comments',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                }
            },
            chartOptionsTopSpark3: {
                chart: {
                    sparkline: {
                        enabled: true
                    },
                },
                colors: ['#DCE6EC'],
                stroke: {
                    curve: 'straight'
                },
                fill: {
                    opacity: 0.3,
                    color: 'white'
                },
                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                    labels: {
                        style: {
                            colors: ['white']
                        }
                    },
                },
                yaxis: {
                    min: 0
                },
                title: {
                    text: '',
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                },
                subtitle: {
                    text: 'Negative Comments',
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                        cssClass: 'apexcharts-yaxis-title',
                        color: 'white'
                    }
                }
            },
            chartOptionsSparkLine: {
                chart: {
                    height: 35,
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '80%'
                    }
                },
                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {

                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },


        }
    }

    render() {

        return (


            <div id="sparklines">

                <div >
                    {/* <div> <button type="button" >View By Year</button></div>
                    <div> <button type="button" >View By Month</button></div>
                    <div> <button type="button" >View By Day</button></div> */}

                    <div>
                        <div className="sparkline-top" id="spark1">
                            <ReactApexChart options={this.state.chartOptionsTopSpark1} series={this.state.seriesTopSpark1} type="area" width="550" height="160" />
                        </div>
                    </div>
                    <div>
                        <div className="sparkline-center" id="spark2">
                            <ReactApexChart options={this.state.chartOptionsTopSpark2} series={this.state.seriesTopSpark2} type="area"  width="550" height="160" />
                        </div>
                    </div>
                    <div>
                        <div className="sparkline-bottom" id="spark3">
                            <ReactApexChart options={this.state.chartOptionsTopSpark3} series={this.state.seriesTopSpark3} type="area" width="550" height="160" />
                        </div>
                    </div>
                </div>

                <div className="sparkline-foot" >
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ color: 'white' }}>Comments</td>
                                <td style={{ color: 'white' }}>Percentage of Total</td>
                                <td style={{ color: 'white' }}>Last 10 days Increase</td>
                                <td style={{ color: 'white' }}>Volume</td>
                            </tr>

                            <tr>
                                <td title="Total Comments" style={{ color: 'white' }}>{this.state.total_comments}</td>
                                <td style={{ color: 'white' }}>{this.state.percent_total}</td>
                                <td>
                                    <div id="chart1">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark1} type="line" height="35" />
                                    </div>
                                </td>
                                <td>
                                    <div id="chart5">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark1} type="bar" height="35" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td title="Positive Comments" style={{ color: 'white' }}>{this.state.positive_comments}</td>
                                <td style={{ color: 'white' }}>{this.state.percent_positive}</td>
                                <td>
                                    <div id="chart2">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark2} type="line" height="35" />
                                    </div>
                                </td>
                                <td>
                                    <div id="chart6">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark2} type="bar" height="35" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td title="Negative Comments" style={{ color: 'white' }}>{this.state.negative_comments}</td>
                                <td style={{ color: 'white' }}>{this.state.percent_negative}</td>
                                <td>
                                    <div id="chart3">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark3} type="line" height="35" />
                                    </div>
                                </td>
                                <td>
                                    <div id="chart7">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark3} type="bar" height="35" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td title="Neutral Comments" style={{ color: 'white' }}>{this.state.neutral_comments}</td>
                                <td style={{ color: 'white' }}>{this.state.percent_neutral}</td>
                                <td>
                                    <div id="chart4">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark4} type="line" height="35" />
                                    </div>
                                </td>
                                <td>
                                    <div id="chart8">
                                        <ReactApexChart options={this.state.chartOptionsSparkLine} series={this.state.seriesSpark4} type="bar" height="35" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        );
    }
}

export default Sparkline;