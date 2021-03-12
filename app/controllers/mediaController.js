const mediaMapper = require('../models/mediaMapper');
const Media = require('../models/media');

const mediaController = {
    getAllMedia: async (request, response) => {
        const medias = await mediaMapper.findAllMedia();
        response.json(medias);
    },












};
module.exports = mediaController;