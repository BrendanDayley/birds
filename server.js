'use strict';

//require libraries
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoJS = require('mongojs');

//DataBase
var db = mongoJS('birds', ['sightings']);

//
var app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

//connect to database


//crud stuff

app.post('/api/sighting', function(req, res){
	db.sightings.insert(req.body, function(err, result){
		if(err){
			return res.status(500).json(err);
		}else{
			return res.json(result);
		}
	});
});

app.get('/api/sighting', function(req, res){
	console.log(req.query);
	db.sightings.find(req.query, function(err, bird) {
		if(err){
			return res.status(500).json(err);
		}
		return res.json(bird);
	});
});

app.put('/api/sighting', function(req, res){
	db.sightings.update(req.query, req.body, function(err, result){
		if(err) res.status(418);
		else res.json(result);
	});
})

app.delete('/api/sighting', function(req, res){
	db.sightings.remove(req.query, function(err, result){
		if(!err){
			console.log(result);
			res.json(result);
		} else {
			res.status(418);
		}
	});
})


//variables

var port = 8080;

app.listen(port, function () {
			console.log('I will follow you: ' +
				port);
		});
