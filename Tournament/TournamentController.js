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
const risenPlayerController = require('../RisenPlayer/RisenPlayerController');

const tournamentController = function () {

    /**
     * Endpoint for tournament api match callbacks
     *
     * example callback:
     * {
     * "startTime": 1234567890000,
     * "winningTeam": [
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   }
     * ],
     * "losingTeam": [
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   },
     *   {
     *     "summonerName": "Summoner Name"
     *   }
     * ],
     * "shortCode": "NA1234a-1a23b456-a1b2-1abc-ab12-1234567890ab",
     * "metaData": "{\"title\":\"Game 42 - Finals\"}",
     * "gameId": 1234567890,
     * "gameName": "a123bc45-ab1c-1a23-ab12-12345a67b89c",
     * "gameType": "Practice",
     * "gameMap": 11,
     * "gameMode": "CLASSIC",
     * "region": "NA1"
     * }
     *
     * @param req
     * @param res
     * @param next
     */
    const matchCallback = function (req, res, next) {
        // Grab the callback from the request
        const { callback } = req.body;

        // Grab fields from the callback that we will need to parse match results
        let gameId = callback.get('gameId');
        let tournamentCode = callback.get('shortCode');
        let metaData = callback.get('metaData');
        let team1Name = metaData.get('team1');
        let team2Name = metaData.get('team2');
        let winningTeamMembers = callback.get('winningTeam');
        let losingTeamMembers = callback.get('losingTeam');
        let allPlayers = winningTeamMembers.append(losingTeamMembers);

        // Given the summoner names in the match callback, look them up in the risen database. If they don't have a Risen
        // Player Id, create a new Risen Player for them and assign them one.
        allPlayers.forEach((summonerObj) => {
            let summonerName = summonerObj.get('summonerName');
            let playerReq = {
                body: {
                    'summonerName': summonerName
                }
            };
            let risenId = risenPlayerController.getRisenPlayerIdBySummoner(playerReq);
            if (!risenId) {
                // If there was not a risen id, we need to create a new risen player for this summoner
                // TODO
            }
            
        });
    };

    /**
     * Generate tournament codes
     * @param req
     * @param res
     * @param next
     */
    const generateTournyCodes = function (req, res, next) {
        // Grab the tourny code information
        const { tournyCodeReq } = req.body;

        let numGamesInSeries = tournyCodeReq.get('numGamesInSeries');
        let seriesMetaData = tournyCodeReq.get('seriesMetaData');
        let team1Name = tournyCodeReq.get('team1Name');
        let team2Name = tournyCodeReq.get('team2Name');


    };

    module.exports = {
        generateTournyCodes,
        matchCallback
    };
};
// Export endpoint logic
module.exports = {
    tournamentController
};
