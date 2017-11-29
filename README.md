## PSU Twitter Sentiment Analyzer



In its current form, the application is able to communicate with the Twitter 'tweets/search' API endpoint. This is then fed to an instance of IBM Watson's Natural Language Understanding service to gain minimal insight into the tweets returned by searching Twitter.

By default, an initial set of searches are run with query parameters relating to Penn State (e.g. 'psu', 'penn state', etc.) The intention is to use insights obtained by analyzing tweets via the NLU service to mutate searches and explore pertinent topics in more depth. Ideally, the application will be able to produce labels for subject matter that is currently being discussed or mentioned, while maintaining a direct relation between the subject matter and the University. In addition to this, there should be sufficient turnover of discovered topics of interest, so that reported topics maintain are representative of changing, real-time trends.


Requirements before running:
* Create a `.env` file at the project root
* Add Twitter API credentials to the `.env` file  
  *These can be obtained by signing up for Twitter's API and creating a project*  
  * TWITTER_CONSUMER_KEY = `<your Twitter consumer key>`
  * TWITTER_CONSUMER_SECRET = `<your Twitter consumer secret>`
  * TWITTER_ACCESS_TOKEN_KEY = `<your Twitter access key>`
  * TWITTER_ACCESS_TOKEN_SECRET = `<your Twitter access secret`
* Add Watson Natural Language Understanding credentials to the `.env` file  
  *These can be obtained by creating a Watson NLU workspace*
  * WATSON_NLU_USERNAME = `<your Watson NLU workspace username>`
  * WATSON_NLU_PASSWORD = `<your Watson NLU workspace password>`


* Install npm
* `npm install -g gulp`
* `cd <base repo directory>`
* `npm install`


To run:
- `gulp`
- `npm start`
>>>>>>> twitter-proto
