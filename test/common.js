global.chai = require('chai')
global.chaiHttp = require('chai-http')

global.assert = chai.assert
global.expect = chai.expect
global.chaiAsPromised = require("chai-as-promised")
global.path = require('path')
global.fs = require('fs')


import dotenv from 'dotenv'
dotenv.config({silent: true})

chai.should()
chai.use(chaiHttp)
chai.use(chaiAsPromised)
chai.config.includeStack = true

process.env.NODE_ENV = 'test'

// For any modules that need to be imported among different tests:
// global.moduleName = require('../src/../module')
