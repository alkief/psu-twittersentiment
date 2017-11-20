import TwitterMessenger from '../../../dist/server/scripts/TwitterMessenger'
import twitter from 'twitter'

describe('TwitterMessenger.js', () => {

	let twitterMessenger = new TwitterMessenger()

	describe('constructor', () => {

		it('should instantiate a Twitter client member variable', () => {
			expect(twitterMessenger.client).to.be.an.instanceof(twitter)

			expect(twitterMessenger.client.options.consumer_key).to.not.be.equal('undefined')
			expect(twitterMessenger.client.options.consumer_secret).to.not.be.equal('undefined')
			expect(twitterMessenger.client.options.access_token_key).to.not.be.equal('undefined')
			expect(twitterMessenger.client.options.access_token_secret).to.not.be.equal('undefined')
		})

	})

	describe('searchSet', () => {

		it('should return an array of JSON objects representing tweets', async () => {
			const params = [
				{
					q: 'penn state university',
					result_type: 'popular',
					count: '5',
					lang: 'en'
				},
				{
					q: 'psu',
					result_type: 'recent',
					count: '5',
					lang: 'en'
				}
			]

			const results = await twitterMessenger.searchSet(params)

			expect(Array.isArray(results)).to.be.equal(true)
			results.forEach(status => {
				expect(status).to.be.a('string')
			})
		})

	})

	describe('search', () => {

		const params = {
			q: 'penn state university',
			result_type: 'popular',
			count: '1',
			lang: 'en'
		}

		it('should handle a single JSON object as an argument', async () => {
				const results = await twitterMessenger.search(params)

				results.forEach(status => {
					expect(status).to.be.a('string')
				})
		})
	})
	
})