'use strict'

import { stopWordList, acronymList, emojiList } from './Const'

// This file contains utilities for parsing JSON and text bodies


/**
* Used on the initial JSON response from Twitter's search API
* Removes fields that are not needed by any application features
* @param {Object[]} statuses - The JSON response from Twitter's search API
* @return {String[]} - The text value of the corresponding tweet
*/
export function formatTweets (statuses) {
	let statusTexts = []

	statuses.forEach((status, i) => {
		statusTexts.push(status.text)
	})

	return statusTexts
}

/**
* Organize a set of tweet JSON objects into a processed corpus of text ready to be fed to Watson
* @param {string[]} tweetList - A list of strings representing
* @return - A list containing an array representing the normalized tokens (words) in the text
*		 of each tweet
*/
// TODO consider string version of special characters (eg. '&amp;')
export function preprocessTweets (tweetList) {
	//console.log(tweetList)

	// Split into a 2d array corresponding to tweet and word in each tweet
	let tokenizedTweets = tokenize(tweetList)

	// Each tweet is an array of strings representing words in the tweet
	tokenizedTweets = tokenizedTweets.map(tweet => {
		// console.log('tweet before preprocessing', tweet)
		tweet = removeLinks(tweet)
		// console.log('tweet after removeLink', tweet)

		tweet = translateEmojis(tweet)
		// console.log('tweet after translateEmojis', tweet)

		//tweet = expandAcronyms(tweet)
		// console.log('tweet after expandAcronyms', tweet)

		//tweet = removeStopWords(tweet)
		// console.log('tweet after removeStopWords', tweet)

		tweet = removePunctuation(tweet)
		// console.log('tweet after removePunctuation', tweet)

		return tweet.join(' ')
	})

	return tokenizedTweets
}

/**
* Takes links out of a given string
* @param { string || string[] } text - A space separated string of words or an array of strings
* @return { string[] } - An array of strings containing no values representing links
*/
export function removeLinks (text) {
	// Convert space-separated strings to array
	if (typeof(text) === 'string') {
		text = text.split(' ')
	}

	if (Array.isArray(text)) {
		// Remove any tokens that include 'http' or 'www'
		text = text.filter(token => { return !token.includes('http') && !token.includes('www') })
	} else {
		throw new TypeError('Parameter of removeLink is not string or array')
	}

	return text
}

/**
*	Convert a list of tweets into a list of arrays containing the words in each tweet
*	@param {String[]} tweets - the list of tweets to tokenize
* @return {String[][]} - A list of the tokenized version of each tweet
*/
export function tokenize (tweets) {
	let tokenizedTweets = tweets.map(tweet => {
		tweet = tweet.toLowerCase()
		return tweet.split(' ')
	})

	return tokenizedTweets
}

/**
* Change emoticon characters into representative words
*	@param {String[]} tweet - The tokens which may contain emojis
* @return {String[]} An array containing a string with emojis replaced by text
*/
export function translateEmojis (tweet) {
	let translatedText = []

	// Split the tweet into words
	tweet.forEach(word => {
		let emojiFound = false // Controls whether to push an emoji-less word to the translated list
		let lastSplitIndex = 0 // Used for splitting words and emojis

		// Iterate over the characters in each word
		for (let i = 0; i < word.length; i++) {
			// Convert character to hex charcode
			let charCode = word.codePointAt(i).toString(16) 
			// Find a key/value in the defined emoji list matching the charcode
			let emojiKeyVal = emojiList.find(element => {
				if (element.key === charCode) return element
			}	)

			// If we found a matching charcode
			if (typeof(emojiKeyVal) != 'undefined') {
				emojiFound = true

				// Remove the emoji character from the current word
				if (i === 0) { // Emoji is first character
					word = word.slice(i+2, word.length) // Set word to everything after index 0
					i-- // Don't skip any characters after deletion
				} else {
					// Push the string of character preceding the emoji to the translated list
					translatedText.push(word.slice(0, i))

					// Set everything after the found emoji to the current word
					if (i != word.length - 1) {
						word = word.slice(i+1, word.length)
						i = 0
					}
				}

				// Push the text meaning of the found emoji to the translated list
				emojiKeyVal.value.split(' ').forEach(emojiToken => {
					translatedText.push(emojiToken)
				})
			}
		}

		// If the word contained no emoji, consider the word to be translated
		if (!emojiFound) translatedText.push(word)
	})

	// Remove any empty strings
	translatedText = translatedText.filter(word => { return word.length >= 1 })

	return translatedText
}	


/**
* Expand any commonly used acronyms (afaik, lol, etc)
* @param {String[]} text - The tweet with unexpanded acronyms
* @return {String[]} The same list of strings with expanded acronyms
*/
export function expandAcronyms (tweet) {
	let expandedText = []

	tweet.forEach(word => {
		let acronymFound = false

		let acronymKeyVal = acronymList.find(element => {
			if (element.key === word) return element
		})

		if (typeof(acronymKeyVal) != 'undefined') {

			acronymFound = true

			acronymKeyVal.value.split(' ').forEach(acronymToken => {
				expandedText.push(acronymToken)
			})
		}

		if (!acronymFound) {
			expandedText.push(word)
		}
	})

	return expandedText
}

/**
* Remove words that have no meaning or context associated with them inherently
* Ex: 'a', 'of', 'the', etc.
* @param {String[]} tweet - The tweet containing stop words
* @return - The same tweet without stop words
*/
export function removeStopWords (tweet) {
	// Remove a word if it's contained in the stop word list defined in Const
	tweet = tweet.filter(word => {
		if (!stopWordList.includes(word)) {
			return word
		}
	})

	return tweet
}

/**
* Removes punctuation from a given tokenized tweet
* @param {String[]} tweet - The tweet containing punctuation
* @return The same tweet without punctuation
*/
export function removePunctuation (tweet) {
	tweet = tweet.map(word => {
		// Replace any characters within the regexp '[]' with an empty string
		word = word.replace(/[….,\/#!$%\^&\*;:{}=\-_`~()]/g, "")

		// Replace any substring of 2+ consecutive spaces with only 1 space
		word = word.replace(/\s{2,}/," ") 
		return word
	})

	// Remove any empty strings
	tweet = tweet.filter(word => { return word.length >= 1 })

	return tweet
}

// Convert words such as 'talking' to their root word 'talk'
// Uses 'stemmer' package
// Inconsistent, currently unused
export function stem (tweet) {
	// tweet = tweet.map(word => {
	// 	return stemmer(word)
	// })

	return tweet
}

// Utility for correcting possible spelling errors
		// NOTE unimplemented, will use an npm module if anything
export function spellcheck (text) {
	return text
}