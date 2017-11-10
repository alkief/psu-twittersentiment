'use strict'
require('babel-core').transform('code')

// Load variables from '.env' in the project root
import dotenv from 'dotenv'
dotenv.config({silent: true})

import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import twitter from 'twitter'

// Load credentials for accessing twitter API and initialize a client
let twitClient = new twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

twitClient.get('search/tweets', composeSearch(), (error, tweets, response) => {
	if (error) console.log(error)
	console.log(tweets)
})

let app = express()

app.use(express.static(path.join(__dirname, 'server/static')))
app.use('/css', express.static(path.join(__dirname, 'server/static')))
app.use('/js', express.static(path.join(__dirname, 'client/js')))

app.use(bodyParser.json())

// Endpoint for retrieving a set of tweets 
app.get('/data/batch', (req, res) => {
	twitClient.get('search/tweets', composeSearch(), (error, tweets, response) => {
		if (error) console.log(error)
		console.log(tweets)
	})
})

function composeSearch () {
	return {
		q: 'psu',
		result_type: 'popular',
		count: '10',
		lang: 'en'
	}
}

let port = process.env.PORT || process.env.VCAP_APP_PORT || 8080

app.listen(port, () => {
  console.log('Server running on port: %d', port)
})