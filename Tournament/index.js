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
    const TournamentController = require('./TournamentController').tournamentController(datastoreController);

    // Endpoint for game callbacks. Stores a Risen match into the database.
    //TODO not entirely sure what to put in here
    Router.get('/match-callback', function(req, res, next) {
      Router.send(TournamentController.matchCallback(req));

    });

    // Endpoing for generating tournament codes
    //TODO
    Router.post('/generate-tcodes', function(req, res, next) {
      TournamentController.generateTournyCodes();
    });
    return Router;
};
