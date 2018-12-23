import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import './TSChart.css';
import { sanitizeSymbolInput } from './utils.js'

// Color scheme: https://coolors.co/fe938c-e6b89c-ead2ac-9cafb7-4281a4

class TSChart extends Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.changeData = this.changeData.bind(this);
        this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
        this.handleScaleChange = this.handleScaleChange.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {symbol: 'AAPL'};
        this.colorScheme = 'fe938c-e6b89c-ead2ac-9cafb7-4281a4'.split('-');
        this.latestResponse = {};
    }

    render() {
        const { isAuthenticated} = this.props
        return (
            <div>
                <h1>My Portfolio</h1> 
                <div>
                    <button onClick={this.handleScaleChange}>1w</button>
                    <button onClick={this.handleScaleChange}>1m</button>
                    <button onClick={this.handleScaleChange}>3m</button>
                    <button onClick={this.handleScaleChange}>6m</button>
                    <button onClick={this.handleScaleChange}>1y</button>
                    <button onClick={this.handleScaleChange}>3y</button>
                    <button onClick={this.handleScaleChange}>5y</button>
                </div>
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

    handleScaleChange(event) {
        switch (event.target.innerHTML) {
            case '1w':
                this.doResizeScale(5);
                break;
            case '1m':
                this.doResizeScale(5 * 4);
                break;
            case '3m':
                this.doResizeScale(5 * 4 * 3);
                break;
            case '6m':
                this.doResizeScale(5 * 4 * 3 * 2);
                break;
            case '1y':
                this.doResizeScale(5 * 4 * 3 * 2 * 2);
                break;
            case '3y':
                this.doResizeScale(5 * 4 * 3 * 2 * 2 * 3);
                break;
            case '5y':
                this.doResizeScale(5 * 4 * 3 * 2 * 2 * 5);
                break;
            default:
                this.doResizeScale(5 * 4 * 3 * 2 * 2 * 5);
                break;
        }
    }

    doResizeScale(numPoints) {
        
        // There appear to be some issues with resizing the x axis in chartjs or else
        // I just can't figure out what i'm doing wrong - so rebuild the entire
        // chart from resized data sets.
        let lengthOfData = this.latestResponse.sequenceLabels.length;
        let max = Math.max(lengthOfData - 1, 0);
        let min = Math.max(lengthOfData - numPoints, 0);

        let mockQuaaludeResponse = {};
        mockQuaaludeResponse.dataSeriesList = this.latestResponse.dataSeriesList.map( (x) => x.slice(min, max));
        mockQuaaludeResponse.sequenceLabels = this.latestResponse.sequenceLabels.slice(min, max);
        mockQuaaludeResponse.symbolList = this.latestResponse.symbolList.slice();

        this.updateChartControl(mockQuaaludeResponse);
    }

    // TODO: A lot of repetitive code from here on down from when proving out - need to refactor.

    async getSymbolDataFromQuaalude() {
        console.log("Getting Data From Quaalude..");
        let dataFromQuaalude = await fetch("http://localhost:3001/tsdata/"+ sanitizeSymbolInput(this.state.symbol));
        let parsedResponse = await dataFromQuaalude.json();
        console.log("Data received: " + parsedResponse);
        
        let sequenceLabels = [];
        let dataSeries = []
        for (let k in parsedResponse) {
            sequenceLabels.push(k);
            dataSeries.push(parsedResponse[k]);
        }

        parsedResponse.sequenceLabels = sequenceLabels;
        parsedResponse.dataSeriesList = [];
        parsedResponse.dataSeriesList.push(dataSeries);
        parsedResponse.symbolList = []
        parsedResponse.symbolList.push(sanitizeSymbolInput(this.state.symbol).replace(/ /g,''));
        this.latestResponse = parsedResponse;
        return parsedResponse;
    }

    async getMultiSymbolDataFromQuaalude() {
        console.log('Getting Multidata from Quaalude..');

        let sym = sanitizeSymbolInput(this.state.symbol).replace(/ /g,'')
        let dataFromQuaalude = await fetch ('http://localhost:3001/multitsdata?symbols=' + sym);
        let parsedResponse = await dataFromQuaalude.json();
        console.log(parsedResponse)

        parsedResponse.sequenceLabels = parsedResponse['X Axis Labels'];
        parsedResponse.dataSeriesList = parsedResponse['Y Axis Data'];
        parsedResponse.symbolList = parsedResponse['Symbols'];
        this.latestResponse = parsedResponse;
        return parsedResponse;
    }

    async changeData(event) {

        let dataFromQuaalude;
        if (this.state.symbol.includes(',')) {

            // BUG: Trailing comma's screw this up
            dataFromQuaalude = await this.getMultiSymbolDataFromQuaalude();
            if (dataFromQuaalude['error'])
                return;
            console.log('Updating chart with multi data. Num Rows: ' + dataFromQuaalude.sequenceLabels.length);
        } else {
            dataFromQuaalude = await this.getSymbolDataFromQuaalude();
            console.log("Updating chart with data. Num rows: " + dataFromQuaalude.sequenceLabels.length)
        }

        this.updateChartControl(dataFromQuaalude);
    }

    updateChartControl(dataFromQuaalude) {
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
                    data: dataFromQuaalude.dataSeriesList[0],
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
                        },
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
TSChart.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }
export default TSChart
