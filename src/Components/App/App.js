import React from "react";
import './App.css'
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults : [],
            playlistName: 'New playlist',
            playlistTracks: []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(searchResults => {
            this.setState({searchResults: searchResults})
        });
    }

    addTrack(track) {
        const currentPlaylist = this.state.playlistTracks ;
        const isInPlaylist = currentPlaylist.find(
            trackInPlaylist => trackInPlaylist.id === track.id);
        if (isInPlaylist) {
            return;
        } 
        currentPlaylist.push(track);
        this.setState({ playlistTracks: currentPlaylist });
    }

    removeTrack(track) {
        let currentPlaylist = this.state.playlistTracks
        currentPlaylist = currentPlaylist.filter(trackInPlaylist => 
            trackInPlaylist.id !== track.id);

        this.setState({ playlistTracks: currentPlaylist });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name});
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
            () => {
                this.setState({
                    playlistName: 'New Playlist',
                    playlistTracks: []
                })
            }
        )
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} 
                                       onAdd={this.addTrack} 
                                       />
                        <Playlist playlistName={this.state.playlistName} 
                                  onNameChange={this.updatePlaylistName}
                                  playlistTracks={this.state.playlistTracks}
                                  onRemove={this.removeTrack}
                                  onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;