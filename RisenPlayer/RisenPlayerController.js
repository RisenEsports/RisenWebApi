/**
 * This file and all other files in this project are not to be used without express permission from Risen Esports
 * or Travis Guyer. Permission may be granted in writing or electronically.
 *
 * Contact information for this project can be found below.
 *
 * Email:
 *      Primary: Risenbusiness@gmail.com
 *      Personal: tguyer516@gmail.com
 */

const risenPlayerController = function (datastoreController) {
    /**
     * Endpoint to get a Risen Player ID using their summoner name. A player may have several league of legends accounts
     * or summoner names; as long as they are tied to the same Risen Player ID, this will return the correct ID.
     *
     * @param req
     * @param res
     * @param next
     */
    const getRisenPlayerIdBySummoner = function (req, res, next) {
        // There should be a summoner name present in the request body
        const {summonerName} = req.body;
        let risenPlayerId = datastoreController.playerStore.getPlayerIdBySummoner(summonerName);
        res.send(risenPlayerId);
    };

    /**
     * Create a new Risen Player
     * @param req
     * @param res
     * @param next
     */
    const createRisenPlayer = function (req, res, next) {
        const {summonerName} = req.body;
        let createdPlayer = datastoreController.playerStore.createPlayer({
            'summonerName': summonerName
        });
        res.send(createdPlayer);
    };

    /**
     * Endpoint to return information about the Risen Player API.
     *
     * @param req
     * @param res
     * @param next
     */
    const apiInfo = function (req, res, next) {
        const version = 'v1';
        res.send(`API Version: ${version}`);
    };

    module.exports = {
        getRisenPlayerIdBySummoner,
        createRisenPlayer,
        apiInfo
    };
};

// Export endpoint logic
module.exports = {
    risenPlayerController
};
