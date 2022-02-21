import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    search() {
        console.log(`in SearchBar.js search(): ${this.state.searchTerm}`);
        this.props.onSearch(this.state.searchTerm);
    }
    handleTermChange(e) {
        const searchInput = e.target.value;
        console.log(`in SearchBar.js handle: ${searchInput}`);
        this.setState({ searchTerm: searchInput});
    }
    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                       onChange={this.handleTermChange}/>
                <button className="SearchButton"
                        onClick={this.search}>
                            SEARCH</button>
                </div>
        );
    }
}

export default SearchBar;