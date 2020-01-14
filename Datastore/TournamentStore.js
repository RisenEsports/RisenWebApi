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
const tournamentStore = function (datastore) {

    const dataStoreFields = {
        NAME_ID: 'Name/ID',
        CREATED_DATE: 'created-date',
        TOURNAMENT_KEY: 'Tournament'
    };

    /**
     * Get a Risen player record from the datastore given a Risen Player ID
     */
    const insertCode = function (codeInfo) {
        let numGames = codeInfo.get('numGamesInSeries');
        let team1Name = codeInfo.get('team1Name');
        let team1Key = codeInfo.get('team1key');
        let team2Name = codeInfo.get('team2Name');
        let team2key = codeInfo.get('team2key');
        let tournamentCode = codeInfo.get('tournament-code');
        let leagueName = codeInfo.get('league-name');
        let leagueKey = codeInfo.get('league-key');

        const tournamentKey = datastore.key(dataStoreFields.TOURNAMENT_KEY);
        return datastore.save({
            'key': tournamentKey,
            'league-name': leagueName,
            'league-key': leagueKey,
            'code-created-date': new Date(),
            'num-games-in-series': numGames,
            'series-completed-date': new Date(1999, 12, 31, 11, 59, 59, 999),
            'team1key': team1Key,
            'team1name': team1Name,
            'team2key': team2key,
            'team2name': team2Name,
            'tournament-code': tournamentCode
        });
    };
};

module.exports = {
    tournamentStore
};
