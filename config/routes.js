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

module.exports = function (app, datastoreController) {

    // Home Routes
    app.use('/', require('../index')(app));

    // Player Routes
    app.use('/player', require('../RisenPlayer/index')(datastoreController));

    // Tournament Routes
    app.use('/tournament', require('../Tournament/index')(datastoreController));

    /**
     * Error handling
     */
    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).json({
            success: false,
            message: err.message,
        });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).json({
            success: false,
        });
    });
};
