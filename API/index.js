require('dotenv').config();

const API_KEY = process.env.YOUTUBE_API_KEY;
const axios = require('axios');
const { google } = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY
});

async function buscarVideosFetch(interesse) {

    const url = new URL(
        'https://www.googleapis.com/youtube/v3/search'
    );

    url.searchParams.append('part', 'snippet');
    url.searchParams.append('q', interesse);
    url.searchParams.append('type', 'video');
    url.searchParams.append('maxResults', '15');
    url.searchParams.append('key', API_KEY);

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        console.log(data.items);

    } catch (error) {

        console.error('Erro na requisição:', error);

    }
}

async function buscarVideosAxios(interesse) {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
                params: {
                    part: 'snippet',
                    q: interesse,
                    type: 'video',
                    maxResults: 15,
                    key: process.env.YOUTUBE_API_KEY
                }
            }
        )

        console.log(response.data.items);

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

async function buscarVideosGoogleapis(interesse) {
    
    try {
        const response = await youtube.search.list({
            part: ['snippet'],
            q: interesse,
            type: ['video'],
            maxResults: 15
        });
        console.log(response.data.items);

    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

buscarVideosGoogleapis("maquiagem");