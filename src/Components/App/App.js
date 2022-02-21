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
                {
                    name: 'playlistTrack 1',
                    artist: 'playlistArtist 1',
                    album: 'playlistAlbum 1',
                    id: '1'
                },
                {
                    name: 'playlistTrack 2',
                    artist: 'playlistArtist 2',
                    album: 'playlistAlbum 2',
                    id: '2'
                },
                {
                    name: 'playlistTrack 3',
                    artist: 'playlistArtist 3',
                    album: 'playlistAlbum 3',
                    id: '3'
                },
            ]
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    search(searchTerm) {
        console.log(`in App.js search(): ${searchTerm}`);
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
        return trackURIs;
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