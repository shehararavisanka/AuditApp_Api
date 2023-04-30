// create a rolling file logger based on date/time that fires process events

const opts = {
	errorEventName:'error',
        logDirectory:'/logs', // NOTE: folder must exist and be writable...
        fileNamePattern:'<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );