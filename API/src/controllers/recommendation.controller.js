const recommendationService = require('../services/recommendation.service');

exports.generate = async (req, res) => {

    try {
        const { availableTime, interest } = req.body;

        const recommendations = await recommendationService.generate(
            availableTime,
            interest
        );

        return res.status(200).json(recommendations);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: 'Erro ao gerar recomendações'
        });

    }

};