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

/**
 * Endpoint to get a Risen Player ID using their summoner name. A player may have several league of legends accounts
 * or summoner names; as long as they are tied to the same Risen Player ID, this will return the correct ID.
 *
 * @param req
 * @param res
 * @param next
 */
const getApiConfigInfo = function (req, res, next) {
    // There should be a summoner name present in the request body
    const version = 'v1';
    res.send(`Risen Web API Version ${version}`);
};

// Export endpoint logic
module.exports = {
    getApiConfigInfo
};
