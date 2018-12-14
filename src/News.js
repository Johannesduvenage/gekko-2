import React, { Component } from 'react';
import './TSChart.css';
import { sanitizeSymbolInput } from './utils.js'

class News extends Component {
    constructor(props) {
        super(props);
        this.changeData = this.changeData.bind(this);
        this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
        this.enterPressed = this.enterPressed.bind(this);
        this.state = {symbol: 'AAPL', newsTable: (<table></table>) };
    }

    render() {
        return (
            <div>
                <h1>Relevant News</h1> 
                <div className="table-responsive">
                    {this.state.newsTable}
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

    async buildNewsTable() {
        // 1. For each symbol in the state, get the relevant news articles
        // 2. Build up the table of articles and return it.
        
        let symbols = sanitizeSymbolInput(this.state.symbol);
        let symbolsList = [];
        console.log(symbols);
        if (symbols.includes(',')) 
            symbolsList = symbols.split(',').map( s => s.trim() );
        else
            symbolsList.push(symbols);
        
        console.log(symbolsList);
        let newsList = [];

        try {

            for (let symbol of symbolsList) {
                let newsResponse = await fetch(`http://localhost:3001/news/${symbol}`);
                let newsJson = await newsResponse.json();
                let headerRow = (
                    <tr key={symbol} className='table-secondary'>
                        <td colSpan='3'><strong>{symbol}</strong></td>
                    </tr>
                );
                newsList.push(headerRow);

                for (let entry of newsJson.entries) {
                    let row = 
                        <tr key={entry.url}>
                            <td>{entry.source}</td>
                            <td>{entry.headline}</td>
                            <td><a target="_blank" rel="noopener noreferrer" href={entry.url}>Read</a></td>
                        </tr>;
                    newsList.push(row);
                }
            }
        } catch (err) {
            newsList = [];
            newsList.push(
                <tr key='newsError'>
                    <td colSpan='3'>Symbols not found.</td>
                </tr>
            );
        }

        this.setState({ 
            newsTable: (
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Source</th>
                            <th>Headline</th>
                            <th>Read More</th>
                        </tr>
                    </thead>
                    <tbody>{newsList}</tbody>
                </table>
            )   
        });
    }

    componentDidMount () {
        this.buildNewsTable(); 
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
        console.log('Updating News Table');
        this.buildNewsTable();
    }
}

export default  News;