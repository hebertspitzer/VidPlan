const youtubeApi = require('../integrations/youtube.api');
const utilsTime = require('../utils/time.utils');

exports.generate = async (availableTime, interest) => {

    let retorno = [{
            diaSemana: 'monday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.mon
        },{
            diaSemana: 'tuesday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.tue
        },{
            diaSemana: 'wednesday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.wed
        },{
            diaSemana: 'thursday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.thu
        },{
            diaSemana: 'friday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.fri
        },{
            diaSemana: 'saturday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.sat
        },{
            diaSemana: 'sunday',
            videos: [],
            totalDuration: 0,
            availableTime: availableTime.sun
        }
    ]

    let typeVideo = 'medium';
    const videosFind = [];
    let pageToken = null;

    do {
        //tratar paginação
        const results = await youtubeApi.searchVideos(interest, typeVideo, pageToken);
        let videos = results.items;
        pageToken = results.nextPageToken;

        videosFind.push(...videos);

        const videosIds = videosFind.map(video => video.id.videoId);

        const videoDetails = await youtubeApi.getVideoDetails(videosIds);

        const videoCompleteDetails = videosFind.map(video => {

            const duration = videoDetails.find(detail => detail.id === video.id.videoId)?.duration;
            const durationInSeconds = utilsTime.isoDurationToSeconds(duration);
            return {
                id: video.id.videoId,
                title: video.snippet.title,
                description: video.snippet.description,
                channelTitle: video.snippet.channelTitle,
                duration: durationInSeconds
            };
        });

        const videosSortedByDuration = videoCompleteDetails.sort((a, b) => b.duration - a.duration);

        if (retorno.every(day => day.availableTime < 240)) {
            typeVideo = 'short';
        }

        videosSortedByDuration.forEach(video => {
            let day = retorno.find(day => day.availableTime >= video.duration);
            if (day){
                day.videos.push(video);
                day.totalDuration += video.duration;
                day.availableTime -= video.duration;
            } else {
                console.log(`Não há tempo disponível para o vídeo: ${video.title}, duração: ${video.duration} segundos`);
            }
            videosFind.splice(videosFind.indexOf(video), 1);
        });
        console.log('Tempo disponível restante por dia:', retorno.map(day => ({ diaSemana: day.diaSemana, availableTime: day.availableTime })));
    } while (retorno.some(day => day.availableTime > 100));

    return {
        retorno
    };

};