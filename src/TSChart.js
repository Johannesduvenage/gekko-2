import React, { Component } from 'react';
import Chart from 'chart.js';
import './TSChart.css';

class TSChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.changeData = this.changeData.bind(this);
    }

    render() {
        return (
            <div>
                <div className="chartDiv">
                    <canvas ref={this.chartRef}></canvas>
                </div>
                <div>
                    <button onClick={this.changeData}>Change Data</button>
                </div>
            </div>
        );
    }

    componentDidMount () {
        this.doChart();
    }

    async getDataFromQuaalude() {
        console.log("Getting Data From Quaalude..");
        let dataFromQuaalude = await fetch("http://localhost:3001/tsdata");
        let parsedResponse = await dataFromQuaalude.json();
        console.log("Data received: " + parsedResponse);
        return parsedResponse;
    }

    async changeData() {
        let dataFromQuaalude = await this.getDataFromQuaalude();
        this.myLineChart.data.datasets.forEach( (dataset) => { 
            dataset.data = dataFromQuaalude;
        });
        this.myLineChart.update()
    }

    async doChart() {
        const node = this.chartRef.current;

        // generate random data;
        let sequenceLabels = Array.from({length: 40}, (v, k) => k+1);
        let dataFromQuaalude = await this.getDataFromQuaalude();
        console.log("Added the following data to chart: " + dataFromQuaalude);
        this.myLineChart = new Chart(node, {
            type: 'line',
            data: {
                labels: sequenceLabels,
                datasets: [{
                    label: '# of Votes',
                    data: dataFromQuaalude,
                    fill: false
                }],
                
            },
            
            options: {  
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
             }
        });
    }
}

export default TSChart