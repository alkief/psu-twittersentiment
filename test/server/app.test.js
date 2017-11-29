import app from '../../dist/server/app'
import { server } from '../../dist/server/app'

describe('app.js', () => {

	it('should listen on process.env.PORT', () => {
		let net = require('net')

		let portTaken = false

		// Define a server to see if port is used
		const testServer = net.createServer()
			.once('error', (err) => {
				if (err.code != 'EADDRINUSE') console.log(err)
			})
			.once('listening', () => {
				portTaken = true
				testServer.close()
			})
			.listen(process.env.PORT)

		assert(portTaken === false)
	})

	describe('GET /data/batch', () => {
		it('should respond', (done) => {
			chai.request(app)
				.get('/data/batch')
				.end((err, res) => {
					assert(res !== null)
					done()
				})
		})
	})

})