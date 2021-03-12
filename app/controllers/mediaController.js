const mediaMapper = require('../models/mediaMapper');
const Media = require('../models/media');

const mediaController = {
getAllMedia: async (request, response) => {
    const medias = await mediaMapper.findAllMedia();
    response.json(medias);
},

getOneMedia: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    try {
        const media = await mediaMapper.findOneMedia(id);
        // console.log(media);
    res.json(media);
    } catch (error) {
        res.json({"error":"pas de média avec l'id " + id});
    }
    
},












};
module.exports = mediaController;