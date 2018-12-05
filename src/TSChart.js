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
        this.state = {symbol: 'AAPL'};
        this.colorScheme = 'fe938c-e6b89c-ead2ac-9cafb7-4281a4'.split('-');
    }

    render() {
        return (
            <div>
                <h1>My Portfolio</h1> 
                <div>
                    <canvas ref={this.chartRef}></canvas>
                </div>
                <div>
                    <input type="text" value={this.state.symbol} onChange={this.handleChangeSymbol} onKeyPress={this.enterPressed}></input>
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
        this.setState({symbol: event.target.value});
        console.log("Symbol changed to " + event.target.value);
    }

    /**
     * Alternate handler for changeData() event.
     */
    enterPressed(event) {
        if (event.key === 'Enter') {
            console.log("Enter Pressed");
            this.changeData();
        }
    }

    // TODO: A lot of repetitive code from here on down from when proving out - need to refactor.

    async getSymbolDataFromQuaalude() {
        console.log("Getting Data From Quaalude..");
        let dataFromQuaalude = await fetch("http://localhost:3001/tsdata/"+ this.state.symbol);
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

    async getMultiSymbolDataFromQuaalude() {
        console.log('Getting Multidata from Quaalude..');

        let sym = this.state.symbol.replace(/ /g,'')
        let dataFromQuaalude = await fetch ('http://localhost:3001/multitsdata?symbols=' + sym);
        let parsedResponse = await dataFromQuaalude.json();
        console.log(parsedResponse)

        parsedResponse.sequenceLabels = parsedResponse['X Axis Labels'];
        parsedResponse.dataSeriesList = parsedResponse['Y Axis Data'];
        parsedResponse.symbolList = parsedResponse['Symbols'];
        return parsedResponse;
    }

    async changeData(event) {

        if (this.state.symbol.includes(',')) {

            // BUG: Trailing comma's screw this up
            let dataFromQuaalude = await this.getMultiSymbolDataFromQuaalude();
            console.log(dataFromQuaalude.sequenceLabels);
            console.log('Updating chart with multi data. Num Rows: ' + dataFromQuaalude.sequenceLabels.length);
            
            // rebuild the entire data object for multi-responses.
            this.myLineChart.data.labels = dataFromQuaalude.sequenceLabels;
            this.myLineChart.data.datasets = [];
            
            let i = 0;
            for (let dataSeries of dataFromQuaalude.dataSeriesList) {
                this.myLineChart.data.datasets.push ({
                    label: dataFromQuaalude.symbolList[i++] + ' Price',
                    data: dataSeries,
                    fill: false,
                    pointRadius: 0,
                    borderColor: '#' + this.colorScheme[i % this.colorScheme.length],
                    borderWidth: 1
                });
            }

            this.myLineChart.update();

        } else {

            let dataFromQuaalude = await this.getSymbolDataFromQuaalude();

            console.log("Updating chart with data. Num rows: " + dataFromQuaalude.sequenceLabels.length)
            this.myLineChart.data.labels = dataFromQuaalude.sequenceLabels;
            this.myLineChart.data.datasets = [];

            this.myLineChart.data.datasets.push ({
                label: this.state.symbol + ' Price',
                data: dataFromQuaalude.dataSeries,
                fill: false,
                pointRadius: 0,
                borderColor: '#4281a4',
                borderWidth: 1
            });

            this.myLineChart.update()
        }
    }

    async doChart() {
        const node = this.chartRef.current;

        let dataFromQuaalude = await this.getSymbolDataFromQuaalude();

        console.log("Added the following data to chart: " + dataFromQuaalude);
        this.myLineChart = new Chart(node, {
            type: 'line',
            data: {
                labels: dataFromQuaalude.sequenceLabels,
                datasets: [{
                    label: this.state.symbol + ' Price',
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
