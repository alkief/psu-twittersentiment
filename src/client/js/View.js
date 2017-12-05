import * as Const from './Const'

let sortBy = -1

export default class View {
	constructor () {
		this.sort = {
			sentimentBtn: $('#btnSentimentSort'),
			angerBtn: $('#btnAngerSort'),
			disgustBtn: $('#btnDisgustSort'),
			joyBtn: $('#btnJoySort'),
			fearBtn: $('#btnFearSort'),
			sadnessBtn: $('#btnSadnessSort')
		}

		this.registerButtons()
		this.update()
	}

	registerButtons () {
		// Register listeners for sort buttons
		this.sort.sentimentBtn.click(this, this.changeSort)
		this.sort.angerBtn.click(this, this.changeSort)
		this.sort.disgustBtn.click(this, this.changeSort)
		this.sort.joyBtn.click(this, this.changeSort)
		this.sort.fearBtn.click(this, this.changeSort)
		this.sort.sadnessBtn.click(this, this.changeSort)

		this.sort.sentimentBtn.click() // Automatically select relevance
	}

	update () {
		let _this = this

		$.get('/api/sentiment' , sentimentPayload => {
			_this.sentimentData = JSON.parse(sentimentPayload)

			// Remove previous tweet information
			$('.left-pane table').find("tr:gt(0)").remove()
			$('.right-pane table').find("tr:gt(0)").remove()

			// Append the tweets to the right side of the screen
			_this.sentimentData.tweets.forEach(tweet => {
				$('.right-pane table').append('<tr><td>' + tweet + '</td></tr>')
			})

			_this.sortKeywords()

			// setTimeout(() => {
				// rerun this same get request
			// }, a long time)
		})
	}

	// JQuery click handler for the navbar sort controls
	changeSort (event) {
		let viewObject = event.data

		// Update navbar visuals
		$('.navbar-controls td').removeClass('selected')
		$(this).addClass('selected')

		// Change the sort control
		if ($(this).text().toUpperCase() === 'SENTIMENT') {
			sortBy = Const.SORTBY_SENTIMENT
		} else if ($(this).text().toUpperCase() === 'ANGER') {
			sortBy = Const.SORTBY_ANGER
		} else if ($(this).text().toUpperCase() === 'FEAR') {
			sortBy = Const.SORTBY_FEAR
		} else if ($(this).text().toUpperCase() === 'JOY') {
			sortBy = Const.SORTBY_JOY
		} else if ($(this).text().toUpperCase() === 'SADNESS') {
			sortBy = Const.SORTBY_SADNESS
		} else if ($(this).text().toUpperCase() === 'DISGUST') {
			sortBy = Const.SORTBY_DISGUST
		}

		// Reorder the left-pane tablerows to reflect the user's sort selection
		viewObject.sortKeywords()
	}

	// JQuery click handler for keyword selection
	focusKeyword (event) {
		let viewObject = event.data
		let filterTweetList // The list of tweets to display after filtering by keyword

		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected')
			filterTweetList = viewObject.sentimentData.tweets // Display all the tweets we have
		} else {
			$('.left-pane tr').removeClass('selected') // Remove previous selection highlight
			$(this).addClass('selected') // Highlight the clicked cell

			let keywords = $(this)[0].children[0].firstChild.data // The selected keyword text

			keywords = keywords.split(' ') // Split multiple words into array

			// Filter tweets that don't include any of the keyword text
			filterTweetList = viewObject.sentimentData.tweets.filter(tweet => {
				let match = false

				let formattedTweet = tweet.split(' ').map(word => { return word.toLowerCase() })
				keywords.forEach(keyword => {
					if (tweet.includes(keyword)) match = true
				})

				return match
			})
		}

		viewObject.clearTweets() // Remove previous list of tweets from display

		// Display the filtered set or remove filter and display all tweets
		filterTweetList.forEach(tweet => {
			$('.right-pane table').append('<tr><td>' + tweet + '</td></tr>')
		})
	}

	clearKeywords () {
		$('.left-pane table').find("tr:gt(0)").remove()
	}

	clearTweets () {
		$('.right-pane table').find('tr:gt(0)').remove()
	}

	displayTweets () {

	}

	displayKeywords () {
		// Append the keywords to the left side of the screen
		this.sentimentData.keywords.forEach(keyword => {
			var score;
			var color;
			switch(sortBy) {
				case 0:
					score = keyword.sentiment;
					color = "blue";
					break;
				case 1:
					color = "yellow";
					score = keyword.sadness;
					break;
				case 2:
					color = "orange";
					score = keyword.joy;
					break;
				case 3:
					color = "green";
					score = keyword.disgust;
					break;
				case 4:
					color = "red";
					score = keyword.anger;
					break;
				case 5:
					color = "white";
					score = keyword.fear;
					break;
			}
			var width;
			if (score < 0) {
				width = 60 * -score;
			}
			else {
				width = 60 * score;
			}


			$('.left-pane table').append('<tr><td class=\'keyword\'>' + keyword.text + '</td>' +
			'<td class=\'info\'>' + score + '</td>' + '<td>' +
			'<div style=background-color:' + color + ';width:' + width + '%><br></div></td>' +
			 '</tr>')
		})

		this.registerKeywordListeners()
	}

	sortKeywords () {
		if (!this.sentimentData || !this.sentimentData.keywords) return

		this.clearKeywords()

		if (sortBy === Const.SORTBY_SENTIMENT) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.sentiment - a.sentiment
			})
		} else if (sortBy === Const.SORTBY_ANGER) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.anger - a.anger
			})
		} else if (sortBy === Const.SORTBY_FEAR) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.fear - a.fear
			})
		} else if (sortBy === Const.SORTBY_JOY) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.joy - a.joy
			})
		} else if (sortBy === Const.SORTBY_SADNESS) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.sadness - a.sadness
			})
		} else if (sortBy === Const.SORTBY_DISGUST) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return b.disgust - a.disgust
			})
		}

		this.displayKeywords()
	}

	registerKeywordListeners () {
		// Add click listeners to the keyword table cells
		$('.left-pane table').find("tr:gt(0)").click(this, this.focusKeyword)
	}
}
