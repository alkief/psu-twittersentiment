import * as Const from './Const'

export default class View {
	constructor () {
		this.sort = {
			relevanceBtn: $('#btnRelevanceSort'),
			angerBtn: $('#btnAngerSort'),
			disgustBtn: $('#btnDisgustSort'),
			joyBtn: $('#btnJoySort'),
			fearBtn: $('#btnFearSort'),
			sadnessBtn: $('#btnSadnessSort')
		}

		this.registerButtons()
		console.log('running the get request')
		this.update()

	}

	registerButtons () {
		// Register listeners for sort buttons
		this.sort.relevanceBtn.click(this.changeSort)
		this.sort.angerBtn.click(this.changeSort)
		this.sort.disgustBtn.click(this.changeSort)
		this.sort.joyBtn.click(this.changeSort)
		this.sort.fearBtn.click(this.changeSort)
		this.sort.sadnessBtn.click(this.changeSort)

		this.sort.relevanceBtn.click() // Automatically select relevance
	}

	update () {
		let _this = this

		$.get('/api/sentiment' , sentimentPayload => {
			_this.sentimentData = JSON.parse(sentimentPayload)
			// Remove previous tweet information
			$('.left-pane table').find("tr:gt(0)").remove()
			$('.right-pane table').find("tr:gt(0)").remove()

			// TODO create a function to display keywords with sorting
			// Append the keywords to the left side of the screen
			_this.sentimentData.keywords.forEach(keyword => {
				$('.left-pane table').append('<tr><td>' + keyword.text + '</td></tr>')
			})

			// Append the tweets to the right side of the screen
			_this.sentimentData.tweets.forEach(tweet => {
				$('.right-pane table').append('<tr><td>' + tweet + '</td></tr>')
			})


			// Add click listeners to the keyword table cells
			$('.left-pane table').find("tr:gt(0)").click(_this, _this.focusKeyword).bind(_this)

			// setTimeout(() => {
				// rerun this same get request
			// }, a long time)
		})
	}

	// JQuery click handler for the navbar sort controls
	changeSort () {
		// Update navbar visuals
		$('.navbar-controls td').removeClass('selected')
		$(this).addClass('selected')

		// Reorder the left-pane tablerows to reflect the user's sort selection
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
			displayTweetList = viewObject.sentimentData.tweets.filter(tweet => tweet.includes($(this).text()))
		}

		// Remove previously displayed tweets
		$('.right-pane table').find('tr:gt(0)').remove()

		displayTweetList = new Set(displayTweetList) // Remove duplicates

		// Display the filtered set or remove filter and display all tweets
		displayTweetList.forEach(tweet => {
			$('.right-pane table').append('<tr><td>' + tweet + '</td></tr>')
		})
	}
}
