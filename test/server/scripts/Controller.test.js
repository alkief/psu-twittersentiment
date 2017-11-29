import Controller from '../../../dist/server/scripts/Controller'
import * as Parsing from '../../../dist/server/scripts/Parsing'

describe.skip('Controller.js', () => {
	let controller = new Controller()

	describe('startup', () => {
		it('should store topic analysis results in cache', () => {

		})

		it('should initialize machine learning process for future search terms', () => {

		})

		it('should register future updates', () => {

		})
	})

	describe('processBatch', () => {
		it('should handle unformatted Twitter \'search/tweets\' responses', () => {
			let rawTweets = fs.readFileSync(path.resolve(__dirname, '../../data/rawTweets.json'))
			rawTweets = JSON.parse(rawTweets)

			let formattedTweets = Parsing.formatTweets(rawTweets)

			let processedBatch = controller.processBatch(formatTweets)
		})

		it('should return a Watson NLU response', () => {

		})

		it('should produce topic analysis within 5s', () => {
			
		})
	})
})