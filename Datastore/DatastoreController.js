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


const dataStoreController = function (datastore) {
  const playerStore = require('./PlayerStore').playerStore(datastore);
  const tournamentStore = require('./TournamentStore').tournamentStore(datastore);



    module.exports = {
        playerStore,
        tournamentStore
    };
};

module.exports = {
    dataStoreController
};
