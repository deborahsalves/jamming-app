const CLIENT_ID = '9043d88db706474b9b1c298b147679d8';
const REDIRECT_URI = 'http://localhost:3000/';

let userAccessToken;
const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }
        const theUrl = window.location.href;
        const tokenRegex = /access_token=([^&]*)/;
        const userToken = theUrl.match(tokenRegex);
        const expireRegex = /expires_in=([^&]*)/;
        const tokenExpiration = theUrl.match(expireRegex);
        if (userToken && tokenExpiration) {
            userAccessToken = userToken;
            const expiresIn = Number(tokenExpiration[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');    
            return userAccessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessUrl;
        }
    },

    search(searchTerm) {
        const userAccessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
                      { headers: {
                          Authorization: `Bearer ${userAccessToken}`
                      }}).then(response => {
                          return response.json();
                      }).then(jsonRespose => {
                          if (!jsonRespose.tracks) {
                              return [];
                          }
                          return jsonRespose.tracks.items.map(track => ({
                              id: track.id,
                              name: track.name,
                              artist: track.artists[0].name,
                              album: track.album.name,
                              uri: track.uri
                          })) 
                      })

    },

    savePlaylist(playlistName, arrayOfTrackUris) {
        if (!playlistName || !arrayOfTrackUris.length) {
            return;
        }
        const userAccessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${userAccessToken}`
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers }
                    ).then(response => response.json()
                    ).then(jsonRespose => {
                        userId = jsonRespose.id;
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({
                                name: playlistName
                            }).then(response => response.json()
                            ).then(jsonRespose => {
                                const playlistId = jsonRespose.id;
                                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                                    headers: headers,
                                    method: 'POST',
                                    body: JSON.stringify({ 
                                        uris: arrayOfTrackUris
                                    })
                                })
                            })
                        })
                    })

    }
};

export default Spotify;