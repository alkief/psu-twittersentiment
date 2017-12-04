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
		let displayTweetList // The list of tweets to display

		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected')
			displayTweetList = viewObject.sentimentData.tweets // Display all the tweets we have
		} else {
			$('.left-pane tr').removeClass('selected') // Remove previous selection highlight
			$(this).addClass('selected') // Highlight the clicked cell

			// Display a list filtered by the clicked keyword
			displayTweetList = viewObject.sentimentData.tweets.filter(tweet => {
				tweet.toLowerCase().includes($(this).text())
			})
		}

		viewObject.clearTweets()
		displayTweetList = new Set(displayTweetList) // Remove duplicates

		// Display the filtered set or remove filter and display all tweets
		displayTweetList.forEach(tweet => {
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
			$('.left-pane table').append('<tr><td>' + keyword.text + '</td></tr>')
		})
	}

	sortKeywords () {
		if (!this.sentimentData || !this.sentimentData.keywords) return

		this.clearKeywords()
		if (sortBy === Const.SORTBY_RELEVANCE) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.sentiment - b.sentiment
			})
		} else if (sortBy === Const.SORTBY_ANGER) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.anger - b.anger
			})
		} else if (sortBy === Const.SORTBY_FEAR) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.fear - b.fear
			})
		} else if (sortBy === Const.SORTBY_JOY) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.joy - b.joy
			})
		} else if (sortBy === Const.SORTBY_SADNESS) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.sadness - b.sadness
			})
		} else if (sortBy === Const.SORTBY_DISGUST) {
			this.sentimentData.keywords = this.sentimentData.keywords.sort((a, b) => {
				return a.disgust - b.disgust
			})
		}

		this.sentimentData.keywords.forEach(keyword => {
			$('.left-pane table').append('<tr><td>' + keyword.text + '</td></tr>')
		})

		this.registerKeywordListeners()
	}

	registerKeywordListeners () {
		// Add click listeners to the keyword table cells
		$('.left-pane table').find("tr:gt(0)").click(this, this.focusKeyword)
	}
}
