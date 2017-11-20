'use strict'
require('babel-core').transform('code')
import "babel-polyfill"

// Load variables from '.env' in the project root
import dotenv from 'dotenv'
dotenv.config({silent: true})

import express from 'express' // Lightweight framework for handling requests, routing
import path from 'path' // Resolves relative pathing issues
import bodyParser from 'body-parser' // Utility for parsing request bodies
import fs from 'fs' // Allows file system I/O

import Controller from './scripts/Controller' // The main application controller


// Instantiate the application controller
// NOTE test / developmental methods are called in submodule constructors from the 
// 		creation of this object
let controller = new Controller()


// Define the express app
const app = express()

// Look at this directory for '/' paths e.g. localhost:8080/index.html
app.use(express.static(path.join(__dirname, '../client/static'))) 
// Look at this directory for '/css' paths
app.use('/css', express.static(path.join(__dirname, '../client/static'))) 
// Look at this directory for '/js' paths
app.use('/js', express.static(path.join(__dirname, '../client/js'))) 

app.use(bodyParser.json()) // Parse request payloads as JSON


// Respond with JSON representing server-side analysis of the most recent set of tweets
app.get('/data/batch', (req, res) => {
	res.send('response')
	res.set("Connection", "close")
})

let port = process.env.PORT || process.env.VCAP_APP_PORT || 8080

// Don't listen automatically if we're testing
if (process.env.NODE_ENV !== 'test') {
	// Listen on the given port
	app.server = app.listen(port, () => {
		console.log('app listening on port ' + port)
	})
}

export default app