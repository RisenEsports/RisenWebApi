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
const playerStore = function (datastore) {

    const dataStoreFields = {
        NAME_ID: 'Name/ID',
        PLAYER_KEY: 'Player',
        SUMMONER_KEY: 'Summoner',
        SUMMONER_NAME: 'summonerName'
    };

    /**
     * Get a Risen player record from the datastore given a Risen Player ID
     */
    const getPlayerById = function (playerId) {
        const query = datastore.createQuery(dataStoreFields.PLAYER_KEY)
            .filter(dataStoreFields.NAME_ID, '=', playerId);
        return datastore.runQuery(query);
    };

    /**
     * Get a risen player id by a summoner name
     */
    const getPlayerIdBySummoner = function (summonerName) {
        const query = datastore.createQuery(dataStoreFields.SUMMONER_KEY)
            .filter(dataStoreFields.SUMMONER_NAME, '=', summonerName);
        let result = datastore.runQuery(query);
        if (result.size() > 1) {
            result['message'] = 'There were multiple Risen IDs for this summoner ID. Check to make sure this player' +
                ' does not have multiple Risen IDs.';
        }
        return result;
    };

    /**
     * Create a Risen player record in the datastore
     */
    const createPlayer = function (playerInfo) {
        let firstGameDate = new Date();
        let mostRecentGameDate = firstGameDate;
        let status = 'green';
        let summonerName = playerInfo.get('summonerName');

        let newRisenPlayer = datastore.save({
            'key': datastore.key(dataStoreFields.PLAYER_KEY),
            'first-game-date': firstGameDate,
            'most-recent-game': mostRecentGameDate,
            'status': status
        });

        // Now the new player has been created but we need to add a summoner name or we just won't know who it
        // was anyways!
        let risenPlayerId = newRisenPlayer.get(dataStoreFields.NAME_ID);
        addSummonerNameToPlayer(risenPlayerId, summonerName);

        return {'createdPlayer': newRisenPlayer, 'summonerName': summonerName};
    };

    /**
     * Add a summoner name to a risen player id
     */
    const addSummonerNameToPlayer = function (playerId, summonerName) {
        datastore.save({
            'key': datastore.key(dataStoreFields.SUMMONER_KEY),
            'playerId': playerId,
            'summonerName': summonerName
        });
    };

    module.exports = {
        getPlayerById,
        createPlayer,
        addSummonerNameToPlayer,
        getPlayerIdBySummoner
    };
};

module.exports = {
    playerStore
};
