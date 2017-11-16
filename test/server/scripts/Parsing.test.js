import * as Parsing from '../../../dist/server/scripts/Parsing'

describe('Parsing.js', () => {
	describe('extractLink', () => {
		it('should remove any number of http or https links from a body of text', () => {
			
		})

		it('should accept an array of strings or a space delimited string', () => {

		})
	})

	describe('formatTwitterSearchResponse', () => {
		it('should delete extra fields from the default Twitter \'search/tweets\'response object', () => {

		})
	})

	describe('trimStatusProperties', () => {
		it('should trim the properties of a set of statuses from the Twitter \'search/tweets\' response', () => {

		})
	})

	describe('preprocessTweets', () => {
		it('should correct internet grammar in a body of text', () => {

		})
		it('should translate emoticons in a body of text', () => {
			
		})
		it('should expand acronyms in a body of text', () => {
			
		})
		it('should remove stop words in a body of text', () => {
			
		})
		it('should stem all individual words to their root', () => {
			
		})
	})

	describe('correctInternetGrammar', () => {

	})

	describe('translateEmoticons', () => {

	})

	describe('expandAcronyms', () => {

	})

	describe('removeStopWords', () => {

	})

	describe('stem', () => {

	})
})