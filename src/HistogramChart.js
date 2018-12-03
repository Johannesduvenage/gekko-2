import React, { Component } from 'react';
import Chart from 'chart.js';
import './HistogramChart.css';


class HistogramChart extends Component {

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
                <h2>Histogram of Returns</h2> 
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

    async changeData(event) {
        console.log('Updating Histogram Chart');
        let dataFromQuaalude = await this.getReturnDataFromQuaalude();
        this.myLineChart.data.labels = dataFromQuaalude.sequenceLabels.map((e) => Math.round(e) + ' %');
        this.myLineChart.data.datasets.forEach( (e) => {
            e.label = this.state.symbol + ' Returns';
            e.data = dataFromQuaalude.dataSeries;
        });
        this.myLineChart.update();
    }

    // TODO: A lot of repetitive code from here on down from when proving out - need to refactor.

    async getReturnDataFromQuaalude() {
        console.log("Getting Return Data From Quaalude..");
        let dataFromQuaalude = await fetch("http://localhost:3001/returndata/"+ this.state.symbol);
        let parsedResponse = await dataFromQuaalude.json();
        console.log("Data received: " + parsedResponse);
        
        parsedResponse.sequenceLabels = parsedResponse[1];
        parsedResponse.dataSeries = parsedResponse[0];
        return parsedResponse;
    }

    async doChart() {
        const node = this.chartRef.current;

        let dataFromQuaalude = await this.getReturnDataFromQuaalude();

        console.log("Added the following data to returns chart: " + dataFromQuaalude);
        console.log(dataFromQuaalude);

        this.myLineChart = new Chart(node, {
            type: 'bar',
            data: {
                labels: dataFromQuaalude.sequenceLabels.map((e) => Math.round(e) + ' %'),
                datasets: [{
                    label: this.state.symbol + ' Returns',
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

export default HistogramChart
