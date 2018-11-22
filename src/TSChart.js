import React, { Component } from 'react';
import Chart from 'chart.js';
import './TSChart.css';

// Color scheme: https://coolors.co/fe938c-e6b89c-ead2ac-9cafb7-4281a4

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
                <h1>My Portfolio</h1> 
                <div>
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
        
        let sequenceLabels = [];
        let dataSeries = []
        for (let k in parsedResponse) {
            sequenceLabels.push(k);
            dataSeries.push(parsedResponse[k]);
        }

        parsedResponse.sequenceLabels = sequenceLabels;
        parsedResponse.dataSeries = dataSeries;
        return parsedResponse;
    }

    async changeData(event) {
        let dataFromQuaalude = await this.getDataFromQuaalude();

        console.log("Updating chart with data. Num rows: " + dataFromQuaalude.sequenceLabels.length)
        this.myLineChart.data.labels = dataFromQuaalude.sequenceLabels;
        this.myLineChart.data.datasets.forEach( (dataset) => { 
            dataset.label = this.state.value + ' Price';
            dataset.data = dataFromQuaalude.dataSeries;
        });

        this.myLineChart.update()
    }

    async doChart() {
        const node = this.chartRef.current;

        let dataFromQuaalude = await this.getDataFromQuaalude();

        console.log("Added the following data to chart: " + dataFromQuaalude);
        this.myLineChart = new Chart(node, {
            type: 'line',
            data: {
                labels: dataFromQuaalude.sequenceLabels,
                datasets: [{
                    label: this.state.value + ' Price',
                    data: dataFromQuaalude.dataSeries,
                    fill: false,
                    pointRadius: 0,
                    borderColor: '#4281a4',
                    borderWidth: 1
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
