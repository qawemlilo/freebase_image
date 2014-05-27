var freebase = require('freebase');
var freebase_service = freebase.service;
var config = require('./config');

freebase_service.initialize(
	config
,
function(e){
	if (!e)
		console.log('Freebase service initialized and listening on port: ' + config.port);
	else
		console.log('Freebase service failed to initialize: ' + e);
});