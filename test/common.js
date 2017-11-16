global.chai = require('chai')
global.assert = chai.assert
global.expect = chai.expect
global.path = require('path')

import dotenv from 'dotenv'
dotenv.config({silent: true})

chai.should()
chai.config.includeStack = true

process.env.NODE_ENV = 'test'

// For any modules that need to be imported among different tests:
// global.moduleName = require('../src/../module')
