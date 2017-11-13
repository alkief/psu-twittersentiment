import twitter from 'twitter' // Client for talking to the Twitter API 
import { initialSearchParameterSet } from './Const' // The initial list of searches to send to Twitter
import { formatTwitterSearchResponse } from './Parsing'

// Exposes methods for creating and sending queries to the Twitter API
export default class TwitterMessenger {
	constructor () {
		// Load credentials for accessing Twitter API and initialize a client
		// Credentials can be loaded from the project .env file
		this.client = new twitter({
			consumer_key: process.env.CONSUMER_KEY,
			consumer_secret: process.env.CONSUMER_SECRET,
			access_token_key: process.env.ACCESS_TOKEN_KEY,
			access_token_secret: process.env.ACCESS_TOKEN_SECRET			
		})
	}

	// Send a set of queries using parameters defined in Const
	// Returns the results of all default searches
	defaultSearch () {
		return new Promise ((resolve, reject) => {
			this.searchSet(initialSearchParameterSet)
				.then(searchResults => {
					resolve(searchResults)
				})
				.catch(reason => {
					console.log('Default search failed: ')
					console.log(reason)
				})
		})
	}
	
	/**
	* Use an array of search parameter configurations to query the Twitter API
	* @param {Object} parameterSet - List of parameter configurations. See TwitterMessenger.search() 
	* @return An array of formatted JSON objects representing Tweets which match the searches 
	*/
	searchSet (parameterSet) {
		return new Promise ((resolve, reject) => {
			// Get a Promise for the results of each query in the initial set
			let searchPromises = parameterSet.map(params => {
				return this.search(params)
			})

			// When all the searches complete, resolve the aggregated results
			Promise.all(searchPromises)
				.then(responseList => {
					let aggregatedResults = []

					// Extract results from each returned list into aggregated list
					responseList.forEach(response => {
						response.forEach(status => {
							aggregatedResults.push(status)
						})
					})

					resolve(aggregatedResults)
				})
				.catch(reason => {
					console.log('Could not successfully search Twitter API with query set')
					console.log(reason)
				})
		})
	}


	/**
	* Hit the Twitter search API with the given parameters
	* For params: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html#parameters
	* Each parameter component is a property of a 'params' JSON object
	* @param {Object} params - Composed of properties matching the 'search/tweets' API
	* @return A formatted list of tweets that match the search configuration
	* TODO add a 'count' parameter for adjustment based on search priority / importance
	*/
	search (params) {
		return new Promise ((resolve, reject) => {
			// Search with given parameter configuration
			this.client.get('search/tweets', params, (error, tweets, response) => {
				if (error) reject(error)
				else {
					// Trim extra properties and unneeded information from JSON
					tweets = formatTwitterSearchResponse(tweets)

					resolve(tweets)
				}
			})
		})
	}
}