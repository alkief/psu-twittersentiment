const NaturalLanguageUnderstandingV1  = require('watson-developer-cloud/natural-language-understanding/v1.js'); // The NLU API


export default class WatsonMessenger {
	constructor () {
		// Define a NLU API client
		// Credentials can be loaded from the project .env file
		this.nlu_client = new NaturalLanguageUnderstandingV1({
			username: process.env.WATSON_NLU_USERNAME,
			password: process.env.WATSON_NLU_PASSWORD,
			version_date: '2017-11-07'
		})
	}

	/**
	* Use the Watson Natural Language Understanding service with defined feature parameters on the given text
	* For NLU Client request parameters: https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/?node#methods
	* @param {String} text - The body of text to analyze. 
	* @return Promise which resolves the JSON response from Watson NLU
	*/
	// NOTE text variable can be an individual tweet's contents or an aggregated set of tweets 
	nluAnalyzeText (text) {
		let params = {
			'text': text,
			'features': {
				'entities': {
					'emotion': true,
					'sentiment': true,
					'limit': 1
				},
				'keywords': {
					'sentiment': true,
					'emotion': true,
					'limit': 3
				},
				'concepts': {
					'limit': 2
				},
				'sentiment': {
					'targets': ['psu', 'penn state', 'penn state university']
				}
			}
		}

		return new Promise((resolve, reject) => {
			this.nlu_client.analyze(params, (error, response) => {
				if (error) console.log(error)
				else {
					// TODO parse the NLU response into useful components

					resolve(response)
				}
			})
		})
	}
}