# PSU Twitter Sentiment Analyzer

In its current form, the application is able to communicate with the Twitter
['tweets/search'](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)
API endpoint. This is then fed to an instance of [IBM Watson's Natural Language
Understanding](https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/)
service to gain insight into the tweets returned by searching Twitter. By default, an initial set
of searches are run with query parameters relating to Penn State
('psu', 'penn state', 'penn state university')
>The intention is to use insights obtained by analyzing tweets via the NLU service to mutate
searches and explore pertinent topics in more depth. Ideally, the application will be able to
produce labels for subject matter that is currently being discussed or mentioned, while
maintaining a direct relation between the subject matter and the University. In addition to this,
there should be sufficient turnover of discovered topics of interest, so that reported topics are
representative of changing, real-time trends.  
>*At this time, the application does not support this continuous form of searching, and will only
perform analysis on a preconfigured set of searches.*

## To run
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
- `npm start`

## API

The application exposes one endpoint at '/api/sentiment' which represents a request to invoke the
following process on the server:

- Run 3 searches through Twitter using the terms 'penn state', 'penn state university', and 'psu'
- Return a mixed set of popular and recent tweets for each search (roughly 200 each)
- Run the aggregate set of returned tweets through preprocessing functions to:
	- Remove links
	- Expand acronyms (lol, afaik)
	- Translate emoji characters to text
	- Remove a set of stop words (e.g. 'the', 'a', 'it')
	- Remove punctuations
	- Remove topic keywords ('penn', 'state', 'university', 'psu')
- The set of tweets is then forwarded to the Natural Language Understanding service provided by
IBM's Watson Developer Cloud
- The ['keywords'](https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#entities)
and ['entities'](https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/#keywords)
features provided by this service are then utilized to build a list
of probable topics that are currently being discussed
- After receiving the NLU analysis from Watson, a JSON object is sent in response to the API request.
This object contains:
	- The unaltered list of tweets received by searching Twitter
	- A set of keywords and entities filtered to those with a relevance greater than 50%
		- Each keyword / entity contains
			- A sentiment value (-1, 1)
			- A 0-1 score representing Watson's emotional analysis on fear, joy, disgust, anger, and sadness

[Pastebin link to an example JSON response from this endpoint](https://pastebin.com/n0RyQNEG)

## Web App

This project includes a single page web app built to use the provided API as follows:

- The page is loaded when a request is sent to the root URL of the server.
- The page will send a request to the API endpoint described above and display
the results such that the user is able to sort discovered keywords by sentiment or one of the 5
provided emotions.
- A bar along with the decimal score is displayed to the right of each keyword, representing the score
of whichever property is currently being used to sort the keywords.
- Upon loading the page, the full list of tweets received is displayed on the right.
- The user is able to click a keyword in order to filter the list of tweets to those which contain some or all of the
selected keyword.


The front end with keywords sorted by their 'disgust' score and with no tweets being filtered
![frontend-1](https://i.imgur.com/yfeUx5w.png "Front end example 1")

The front end with keywords sorted by their 'joy' score and with tweets filtered by the highest scoring keyword
![frontend-2](https://i.imgur.com/z1XzweZ.png "Front end example 2")

