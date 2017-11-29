import WatsonMessenger from './WatsonMessenger' 
import TwitterMessenger from './TwitterMessenger'
import { preprocessTweets } from './Parsing'
import * as Const from './Const'
import _ from 'lodash'

// TODO caching module (mongoDB?, Redis?)


// The main module for controlling application communication and data flow
// TODO better class name
export default class Controller {
	constructor () {
		let _this = this
		
		this.watsonMessenger = new WatsonMessenger() // Interface for calls to Watson services
		this.twitterMessenger = new TwitterMessenger() // Interface for calls to Twitter API

		this.sortMode = Const.SORTYBY_RELEVANCE

		// Run startup queries after 1 second
		setTimeout(_this.startup.bind(_this), 1000)
	}

	// Sends startup queries to Twitter and forwards responses to Watson
	async startup () {
		let _this = this

		// Get the results for the startup searches defined in Const
		// let searchResults = await this.twitterMessenger.searchSet(Const.initialSearchParameterSet)

		// let nluResponse = await this.processBatch(searchResults)

		// Show the NLU response we get back
		// console.log('\nnluResponse in startup\n', JSON.stringify(nluResponse, null, 2))
	}

	/**
	* Trigger NLU processing and cache update using a list of formatted 
	* 		Twitter statuses received from search API
	* @param {String[]} tweetData - The list of statuses received from searching twitter
	* @return TODO structure data into an ordered list based on topic, sentiment, emotion, date created
	*/
	async processBatch (tweetList, scheduleFutureUpdate) {
		let _this = this

		let preprocessedTweets = preprocessTweets(tweetList)

		// Shows the output of preprocessing output from searches
		// console.log('preprocessedTweets in processBatch\n', preprocessedTweets)

		// Reduce the 2d array of strings to one space-delimited string of all words used
		let textBody = preprocessedTweets.reduce((bodyAccumulator, curTweet) => {
			let tweetString = curTweet.reduce((tweetAccumulator, word) => {
				return tweetAccumulator.toString() + word + ' '
			}, '')

			return bodyAccumulator.toString() + tweetString + ' '
		}, '')

		let nluResponse

		// Get the NLU analysis for the given text body
		try {
			nluResponse = await this.watsonMessenger.nluAnalyzeText(textBody)
		} catch (e) {
			console.log('Error when calling NLU analysis: ', e)
		}

		// console.log('nluResponse in processBatch', nluResponse)
		return nluResponse
	}
}