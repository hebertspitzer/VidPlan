const { google } = require('googleapis');


const API_KEY = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
    version: 'v3',
    auth: API_KEY
});

exports.searchVideos = async (searchTerm, videoDuration, pageToken) => {

    const response = await youtube.search.list({
        part: ['snippet'],
        q: searchTerm,
        type: ['video'],
        maxResults: 50,
        videoDuration: videoDuration,
        order: 'relevance',
        pageToken: pageToken
    });

    return response.data;

};

exports.getVideoDetails = async (videoIds) => {

    const response = await youtube.videos.list({
        part: ['snippet', 'contentDetails'],
        id: videoIds
    });

    return response.data.items.map(video => ({
        id: video.id,
        title: video.snippet.title,
        duration: video.contentDetails.duration
    }));

};