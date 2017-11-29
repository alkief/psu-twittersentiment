import * as Parsing from '../../../dist/server/scripts/Parsing'
import * as Const from '../../../dist/server/scripts/Const'

import fs from 'fs'

describe('Parsing.js', () => {

	describe('removeLinks', () => {

		it('should handle text with any number of links', () => {
			const text = "https://www.google.com is a great website but i like www.yahoo.com more (not)"

			let tokens = Parsing.removeLinks(text)

			expect(tokens).to.be.an('array')

			tokens.forEach(token => {
				expect(token).to.be.a('string')
				expect(token).to.not.include('http')
				expect(token).to.not.include('www')
			})
		})

	})

	describe('formatTweets', () => {

		it('should handle an array of Twitter status JSON objects', () => {
			let rawTweets = fs.readFileSync(path.resolve(__dirname, '../../data/rawTweets.json'), 'utf8')
			rawTweets = JSON.parse(rawTweets)
		
			let statuses = Parsing.formatTweets(rawTweets)

			assert(Array.isArray(statuses) === true)

			statuses.forEach(status => {
				expect(status).to.be.a('string')
			})
		})

	})

	// Function takes a list of status texts and runs all utilities for simplifying tweets
	describe('preprocessTweets', () => {

		it('should return a list of arrays containing formatted strings', () => {
			let texts = [
				'hello, this is a test text',
				'and thIs is another test text'
			]

			let textsAfter = Parsing.preprocessTweets(texts)

			assert(Array.isArray(textsAfter) === true)

			textsAfter.forEach(text => {
				assert(Array.isArray(text) === true)

				text.forEach(word => {
					assert(typeof(word) === 'string')
				})
			})
		})

		it('should format text to lowercase', () => {
			let texts = [
				'CaMeLtExT'
			]

			let textsAfter = Parsing.preprocessTweets(texts)

			// Check the first token of the first string in texts
			expect(textsAfter[0]).to.deep.equal(['cameltext'])
		})		

	})

	describe('tokenize', () => {

		it('should return an array of strings', () => {
			let texts = ['this is an example of an untokenized tweet',
									 'this is another example']

			let tokenizedTweets = Parsing.tokenize(texts)

			assert(Array.isArray(tokenizedTweets) === true)

			tokenizedTweets.forEach(tweet => {
				assert(Array.isArray(tweet) === true)
				tweet.forEach(word => {
					assert(typeof(word) === 'string')
				})
			})
		})

		it('should return strings with no capitals', () => {
			let texts = ['ThIs Is An ExAmPlE oF a TwEeT wItH cApItAlS']
			let tokenizedTweets = Parsing.tokenize(texts)

			// Access index 0 since only one tweet was given
			expect(tokenizedTweets[0]).to.deep.equal(['this', 'is', 'an', 'example', 'of', 'a', 'tweet', 'with', 'capitals'])
		})

	})

	describe('translateEmojis', () => {

		it('should translate emoticons into textual representations', () => {
			let regularCase = ['hello', '😁']
			let translatedRegularCase = Parsing.translateEmojis(regularCase)

			expect(translatedRegularCase)
				.to.deep.equal(['hello', 'beaming', 'face', 'with', 'smiling', 'eyes'])
		})

		it('should handle a word with an emoji at the end', () => {
			let wordEmoji = ['last', 'word', 'is', 'connected', 'to', 'a', 'face😎']
			let translatedWordEmoji = Parsing.translateEmojis(wordEmoji)

			expect(translatedWordEmoji)
				.to.deep.equal(['last', 'word', 'is', 'connected', 'to', 'a', 'face', 'smiling', 'face', 'with', 'sunglasses'])
		})

		it('should handle an emoji connected to the front of a word', () => {
			let emojiWord = ['word', 'connected', 'to', 'emoji😑']
			let translatedEmojiWord = Parsing.translateEmojis(emojiWord)

			expect(translatedEmojiWord)
				.to.deep.equal(['word', 'connected', 'to', 'emoji', 'expressionless', 'face'])
		})

		it('should handle two words connected by an emoji', () => {
			let wordEmojiWord = ['words', 'connected', 'by', 'emoji', 'word🙄emoji']
			let translatedWordEmojiWord = Parsing.translateEmojis(wordEmojiWord)

			expect(translatedWordEmojiWord)
				.to.deep.equal(['words', 'connected', 'by', 'emoji', 'word', 'face', 'with', 'rolling', 'eyes'])
		})

		it('should handle a word with emojis on both sides', () => {
			let emojiWordEmoji = ['word', 'with', 'emoji', 'on', 'both', 'sides', '😯fastidious😫']
			let translatedEmojiWordEmoji = Parsing.translateEmojis(emojiWordEmoji)

			expect(translatedEmojiWordEmoji)
				.to.deep.equal(['word', 'with', 'emoji', 'on', 'both', 'sides', 'hushed', 'face', 'fastidious', 'tired', 'face'])
		})

	})

	describe('expandAcronyms', () => {

		it('should expand acronyms', () => {
			let acronymCase = ['lol', 'what', 'are', 'you', 'doing']
			let expandedCase = Parsing.expandAcronyms(acronymCase)

			expect(expandedCase).to.deep.equal(['laugh', 'out', 'loud', 'what', 'are', 'you', 'doing'])
		})

	})

	describe('removeStopWords', () => {

		it('should remove stop words', () => {
			let stopWordCase = ['all', 'of', 'the', 'stop', 'words', 'in', 'this', 'sentence', 'should', 'be', 'removed']
			let caseAfter = Parsing.removeStopWords(stopWordCase)

			caseAfter.forEach(word => {
				assert(Const.stopWordList.includes(word) === false)
			})
		})

	})

	describe('removePunctuation', () => {

		it('should remove all punctuations', () => {
			let puncuationCase = ['this.', 'exam.ple', 'c#ontain,s', '!pun(ctua~tions']
			let textsAfter = Parsing.removePunctuation(puncuationCase)

			expect(textsAfter).to.deep.equal(['this', 'example', 'contains', 'punctuations'])
		})

	})
})