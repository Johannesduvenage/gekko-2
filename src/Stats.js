import React, { Component } from 'react';
import './TSChart.css';
import { sanitizeSymbolInput } from './utils.js'

class Stats extends Component {
    constructor(props) {
        super(props);
        this.changeData = this.changeData.bind(this);
        this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {symbol: 'AAPL', statsTable: (<table></table>) };
    }

    render() {
        return (
            <div>
                <h1>Relevant Stats</h1> 
                <div className="table-responsive">
                    {this.state.statsTable}
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

    async buildStatsTable() {
        // 1. For each symbol in the state, get the relevant stats
        // 2. Build up the table of stats and return it.
        
        let symbols = sanitizeSymbolInput(this.state.symbol);
        let symbolsList = [];
        console.log(symbols);
        if (symbols.includes(',')) 
            symbolsList = symbols.split(',').map( s => s.trim() );
        else
            symbolsList.push(symbols);
        
        console.log(symbolsList);
        let statsList = [];
        let currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        let percentFormatter = new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2
        });

        try {

            for (let symbol of symbolsList) {
                let statsResponse = await fetch(`http://localhost:3001/stats/${symbol}`);
                let statsJson = await statsResponse.json();

                let entry = statsJson.entry;
                let row = [
                    <tr key={symbol} className='table-secondary'><td colSpan='4'><strong>{statsJson.entry.companyName}</strong></td></tr>,
                    <tr key='{symbol}2'>
                        <td><strong>Market Cap: </strong></td>
                        <td>{currencyFormatter.format(entry.marketcap / 1e6)} M</td>
                        <td><strong>Dividend Yield: </strong></td>
                        <td>{percentFormatter.format(entry.dividendYield/100)}</td>
                    </tr>,
                    <tr key='{symbol}3'>
                        <td><strong>52-Week High:</strong></td>
                        <td>{currencyFormatter.format(entry.week52high)}</td>
                        <td><strong>52-Week Low: </strong></td>
                        <td>{currencyFormatter.format(entry.week52low )}</td>
                    </tr>,
                    <tr key='{symbol}4'>
                        <td><strong>Revenue:</strong></td>
                        <td>{currencyFormatter.format(entry.revenue / 1e6)} M</td>
                        <td><strong>Earnings: </strong></td>
                        <td>{currencyFormatter.format(entry.grossProfit / 1e6)} M</td>
                    </tr>,
                    <tr key='{symbol}5'>
                        <td><strong>Cash:</strong></td>
                        <td>{currencyFormatter.format(entry.cash / 1e6)} M</td>
                        <td><strong>Debt: </strong></td>
                        <td>{currencyFormatter.format(entry.debt / 1e6)} M</td>
                    </tr>,
                    <tr key='{symbol}6'>
                        <td><strong>Price-to-Sales:</strong></td>
                        <td>{currencyFormatter.format(entry.priceToSales)}</td>
                        <td><strong>Price-to-Book: </strong></td>
                        <td>{currencyFormatter.format(entry.priceToBook)}</td>
                    </tr>,
                    <tr key='{symbol}7'>
                        <td><strong>Beta: </strong></td>
                        <td>{entry.beta}</td>
                        <td><strong>Short Ratio:</strong></td>
                        <td>{entry.shortRatio}</td>
                    </tr>,
                ];
                statsList.push(row);
                
            }
        } catch (err) {
            statsList = [];
            statsList.push(
                <tr key='statsError'>
                    <td colSpan='8'>Symbols Not Found</td>
                </tr>
            );
        }

        this.setState({ 
            statsTable: (
                <table className="table table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th colSpan='8'>Key Stats and Indicators</th> 
                        </tr>
                    </thead>
                    <tbody>{statsList}</tbody>
                </table>
            )   
        });
    }

    componentDidMount () {
        this.buildStatsTable(); 
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
        console.log('Updating Stats Table');
        this.buildStatsTable();
    }
}

export default Stats;