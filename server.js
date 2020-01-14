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
const express = require('express');
const app = express();

// Create a connection to our Datastore and create a new client
const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();
const datastoreController = require('./Datastore/DatastoreController')(datastore);

// Connect to the Riot API so we can generate codes and look up summoner info
const { kayn } = require('kayn');

require('./config/routes')(app, datastoreController);

// Starts the server
const server = app.listen(8080, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log(`Risen Web API listening at http://${host}:${port}`);
});
