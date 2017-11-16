'use strict'

// const stemmer = require('stemmer')
import stopWordList from './Const'

// This file contains utilities for parsing JSON and text bodies

// Takes links out of a given string
// NOTE: Assumes one link per tweet currently
export function extractLink (text) {
	text = text.toLowerCase()
	
	if (text.includes('http')) {
		let linkStart = text.indexOf('http') // Return index of 'h' in 'http'
		let linkEnd = text.indexOf(' ', linkStart) // Find the next space after link start
		if (linkEnd === -1) linkEnd = text.length // Or find the end of the text

		let text = text.splice(linkStart, (linkEnd - linkStart)) // Extract the link using indices

		return text
	}
}

// Used on the initial JSON response from Twitter's search API
// Removes fields that are not needed by any application features
export function formatTwitterSearchResponse (response) {
	let statuses = response.statuses

	statuses.map(status => {
		// Remove (lots) of extraneous fields
		delete status.id_str
		delete status.truncated
		delete status.metadata
		delete status.source
		delete status.in_reply_to_status_id
		delete status.in_reply_to_status_id_str
		delete status.in_reply_to_user_id
		delete status.in_reply_to_user_id_str
		delete status.in_reply_to_screen_name
		delete status.geo
		delete status.coordinates
		delete status.place
		delete status.contributors
		delete status.is_quote_status
		delete status.favorited
		delete status.retweeted
		delete status.possibly_sensitive

		delete status.user.id_str
		delete status.user.url
		delete status.user.entities
		delete status.user.protected
		delete status.user.created_at
		delete status.user.ufc_offset
		delete status.user.time_zone
		delete status.user.geo_enabled
		delete status.user.verified
		delete status.user.statuses_count
		delete status.user.lang
		delete status.user.contributors_enabled
		delete status.user.is_translator
		delete status.user.is_translation_enabled
		delete status.user.profile_background_color
		delete status.user.profile_background_image_url
		delete status.user.profile_background_image_url_https
		delete status.user.profile_banner_url
		delete status.user.profile_link_color
		delete status.user.profile_sidebar_border_color
		delete status.user.profile_sidebar_fill_color
		delete status.user.profile_text_color
		delete status.user.profile_use_background_image
		delete status.user.profile_background_tile
		delete status.user.profile_image_url
		delete status.user.profile_image_url_https
		delete status.user.has_extended_profile
		delete status.user.default_profile
		delete status.user.default_profile_image
		delete status.user.following
		delete status.user.follow_request_sent
		delete status.user.notifications
		delete status.user.translator_type

		return status
	})

	return statuses
}

// Organize a set of tweet JSON objects into a processed corpus of text ready to be fed to Watson
//TODO pull text from all relevant tweet fields, run through processing functions
//TODO decide structure of preprocessed data
export function preprocessTweets (tweetData) {

}

// Spellcheck on targeted 'problem' words and things like '<3'
function correctInternetGrammar (text) {
	return text
}

// Change emoticon characters into representative words
function translateEmoticons (text) {
	return text
}

// Expand any commonly used acronyms (afaik, lol, etc)
function expandAcronyms (text) {
	return text
}

// Remove words that have no meaning or context associated with them inherently
// Ex: 'a', 'of', 'the', etc.
function removeStopWords (text) {
	// Remove a word if it's contained in the stop word list defined in Const
	text = text.filter(word => {
		if (!stopWordList.includes(word)) return word
	})

	return text
}

// Convert words such as 'talking' to their root word 'talk'
// Uses 'stemmer' package
function stem (text) {
	return text
}