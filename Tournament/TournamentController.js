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

        // Grab fields from the match callback that relate to the actual match. Mainly, these are needed for
        // making a call to Riot's API to get the actual match results.
        let gameId = callback.get('gameId');
        let tournamentCode = callback.get('shortCode');
        let apiReportedMatchResults = {};  // TODO: Use a call to Riot's API to get the actual match results

        // The match metadata is some json that we can tie to a tournament match. Presumably we will send things like
        // team names, player names, the event, etc. Right now I imagine it will look something like this, but by the
        // time you're reading this comment it's probably changed:
        //  {
        //      'risenData': {
        //          Dates and stuff. When the code was generated, by whom, etc
        //      },
        //      'event': {
        //          idk man, I haven't figured out what fields we need for events
        //      },
        //      'team1': {
        //          'teamName': '',
        //          'members': []
        //      }.
        //      'team2': {
        //          'teamName': '',
        //          'members': []
        //      }
        // }
        let metaData = callback.get('metaData');

        // The actual participants and the expected participants are very likely to differ. As unfortunate as it is,
        // it's the truth. The silver lining is that the difference between them to implies some interesting
        // information (if not in the expected list, but in the actual list, that person is probably a substitute).
        // That's good information; REALLY good. We can definitely use it to improve the API.
        let winningTeamMembers = callback.get('winningTeam');
        let losingTeamMembers = callback.get('losingTeam');
        let allActualMatchParticipants = winningTeamMembers.append(losingTeamMembers);
        // I know this isn't the cleanest way but I'm feeling SPICY
        let allExpectedMatchParticipants = metaData.get('team1').get('members').append(
            metaData.get('team2').get('members')
        );

        // Given the summoner names in the metadata, look them up in the risen database. If they don't have a Risen
        // Player Id, create a new Risen Player for them and assign them one.
        allActualMatchParticipants.forEach((summonerObj) => {
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
            } else {
                /*
                 * For some reason, I hate else blocks. Code just looks so much cleaner if the else isn't there. You
                 * know it, I know it, we all know it. But I get the itch that it might be useful for *something* later,
                 * so I'm putting it here in hopes that I see it one day and go "oh man, I can do <something> there!"
                 */
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
