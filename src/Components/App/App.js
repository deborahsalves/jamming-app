import React from "react";
import './App.css'
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults : [
                {
                    name: 'Track 1',
                    artist: 'Artist 1',
                    album: 'Album 1',
                    id: '1'
                },
                {
                    name: 'Track 2',
                    artist: 'Artist 2',
                    album: 'Album 2',
                    id: '2'
                },
                {
                    name: 'Track 3',
                    artist: 'Artist 3',
                    album: 'Album 3',
                    id: '3'
                },
            ],
            playlistName: 'hard-coded',
            playlistTracks: [
                {name: 'track1'},
                'track3'
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults}/>
                        <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;