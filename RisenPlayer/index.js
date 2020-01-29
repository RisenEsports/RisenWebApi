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
    const RisenPlayerController = require('./RisenPlayerController').risenPlayerController(datastoreController);

    // Endpoint for getting a player id through a summoner name
    Router.get('/risen-player-id-by-summoner-name',
        RisenPlayerController.getRisenPlayerIdBySummoner
    );

    // Endpoint to create a new risen player
    Router.post('/create-risen-player',
        RisenPlayerController.createRisenPlayer
    );

    // Endpoint for testing if this API is up and running correctly
    Router.get('/info',
        RisenPlayerController.apiInfo
    );

    return Router;
};
