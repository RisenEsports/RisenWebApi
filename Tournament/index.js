/**
 * This file and all other files in this project are not to be used without express permission from Risen Esports
 * or Travis Guyer. Permission may be granted in writing or electronically.
 *
 * Contact information for this project can be found below.
 *
 * Email:
 *      Primary: Risenbusiness@gmail.com
 *      Personal: tguyer516@gmail.com
 *
 * Router file for Statistics for the Risen Esports Web Api
 * @type {Router}
 * @author Travis Guyer / Risen Esports
 */
const Router = require('express').Router();

module.exports = function (datastoreController) {
    const TournamentController = require('./TournamentController')(datastoreController);

    // Endpoint for game callbacks. Stores a Risen match into the database.
    Router.get('/match-callback', TournamentController.matchCallback);

    // Endpoing for generating tournament codes
    Router.post('/generate-tcodes', TournamentController.generateTournyCodes);

    return Router;
};
