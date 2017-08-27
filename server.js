
'use strict'

const Hapi = require('hapi');
const Request = require('request');
const Vision = require('vision');
const Handlebars = require('handlebars');
const LodashFilter = require('lodash.filter');
const LodashTake = require('lodash.take');
const Clarifai = require('clarifai');
const async = require('async');
const Inert =  require('inert');
const Path = require('path');
require('dotenv').config();


const server = new Hapi.Server({
	connections: {
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    }
});

var host = process.env.DB_HOST;
var port = process.env.DB_PORT;

server.connection({
	host: host,
	port: port
});

//Gets index.html route

server.register([Vision, Inert], (err) => {
	server.views({
		engines:{
			html: Handlebars
		},
		relativeTo: __dirname,
		path: './view'
	});
});

server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
    	directory: {
        	path : __dirname,
        	listing:true,
    	},
    
    }
});



//Starts up server

server.start((err) => {
	if (err) {
		throw err;
	}
	console.log(`Server running at: ${server.info.uri}`);
});





server.route({
	method :'GET',
	path: '/',
	handler: function(request, reply) {
		
		reply.view('index');
			
	}
});