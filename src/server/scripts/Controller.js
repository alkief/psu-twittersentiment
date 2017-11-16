import WatsonMessenger from './WatsonMessenger' 
import TwitterMessenger from './TwitterMessenger'
import * as Const from './Const'

// TODO caching module (mongoDB?, Redis?)


// The main module for controlling application communication and data flow
// TODO better class name
export default class Controller {
	constructor () {
		let _this = this
		
		this.watsonMessenger = new WatsonMessenger() // Interface for calls to Watson services
		this.twitterMessenger = new TwitterMessenger() // Interface for calls to Twitter API

		// Run startup queries after 1 second
		setTimeout(_this.startup.bind(_this), 1000)
	}

	// Sends startup queries to Twitter and forwards responses to Watson
	startup () {
		let _this = this

		// Get the results for the startup searches defined in Const
		this.twitterMessenger.searchSet(Const.initialSearchParameterSet)
			// Forward tweet data to processing logic
			.then(searchResults => {
				_this.processBatch(searchResults)
			})
			.catch(reason => {
				console.log('Controller failed at startup: ')
				console.log(reason)
			})
	}

	/**
	* Trigger NLU processing and cache update using a list of formatted 
	* 		Twitter statuses received from search API
	* @param {Object[]} tweetData - The list of statuses received
	* @return TODO structure data into an ordered list based on topic, sentiment, emotion, date created
	*/
	processBatch (tweetData) {
		let _this = this

		return new Promise ((resolve, reject) => {

			console.log('LOGGING TWEET DATA: \n\n')
			console.log(JSON.stringify(tweetData, null, 2))

			// Condense the list of tweet strings into one newline-separated string
			let tweetsTextList = tweetData.reduce((accumulator, curTweet) => {
				return accumulator.toString() + curTweet.text + '\n'
			}, '')

			// Forward text from all statuses to Watson
			_this.watsonMessenger.nluAnalyzeText(tweetsTextList)
				// Log the response from Watson (for now)
				.then(nluResponse => {
					console.log('LOGGING NLU RESPONSE: \n\n')
					console.log(JSON.stringify(nluResponse, null, 2))
				})
				.catch(reason => {
					console.log('Controller failed in processBatch: ')
					console.log(reason)
				})
		})
	}
}