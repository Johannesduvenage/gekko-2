import React, { Component } from 'react';
import Chart from 'chart.js';
import './TSChart.css';

class TSChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.changeData = this.changeData.bind(this);
        this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {value: 'AAPL'};
    }

    render() {
        return (
            <div>
                <div className="chartDiv">
                    <canvas ref={this.chartRef}></canvas>
                </div>
                <div>
                    <input type="text" value={this.state.value} onChange={this.handleChangeSymbol} onKeyPress={this.enterPressed}></input>
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

    handleChangeSymbol(event) {
        this.setState({value: event.target.value});
        console.log("Symbol changed to " + event.target.value);
    }

    enterPressed(event) {
        if (event.key === 'Enter') {
            console.log("Enter Pressed");
            this.changeData();
        }
    }

    async getDataFromQuaalude() {
        console.log("Getting Data From Quaalude..");
        let dataFromQuaalude = await fetch("http://localhost:3001/tsdata/"+ this.state.value);
        let parsedResponse = await dataFromQuaalude.json();
        console.log("Data received: " + parsedResponse);
        return parsedResponse;
    }

    async changeData(event) {
        let dataFromQuaalude = await this.getDataFromQuaalude();
        let sequenceLabels = [];
        let dataSeries = []
        for (let k in dataFromQuaalude) {
            sequenceLabels.push(k);
            dataSeries.push(dataFromQuaalude[k]);
        }

        console.log("Updating chart with data. Num rows: " + sequenceLabels.length)
        this.myLineChart.data.datasets.forEach( (dataset) => { 
            dataset.labels = sequenceLabels;
            dataset.data = dataSeries;
        });

        this.myLineChart.update()
    }

    async doChart() {
        const node = this.chartRef.current;

        let dataFromQuaalude = await this.getDataFromQuaalude();

        let sequenceLabels = [];
        let dataSeries = []
        for (let k in dataFromQuaalude) {
            sequenceLabels.push(k);
            dataSeries.push(dataFromQuaalude[k]);
        }

        console.log("Added the following data to chart: " + dataFromQuaalude);
        this.myLineChart = new Chart(node, {
            type: 'line',
            data: {
                labels: sequenceLabels,
                datasets: [{
                    label: 'Price',
                    data: dataSeries,
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