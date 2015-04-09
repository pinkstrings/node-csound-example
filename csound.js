var express = require('express'),
		router = express.Router(),
		path = require('path'),
		exec = require('child_process').exec;


// note that it's listening to router POST because I sent an AJAX POST request from jQuery
router.post('/', function(req, res, next){

	var saveAsWav = true,
			hideDisplays = true;

	console.log('Csound route initialized');

	// all params from the request will be passed in via req.body
	console.log(req.body);

	// this will be where we add all the commands, as an array for convenience
	var cmd = ['csound'];

	// check if we should save or playback
	if ( parseInt(req.body.saveToFile) ){ // saveToFile is passed to server as string

		// add -W option if saving as wav file
		if (saveAsWav){ cmd.push('-W'); }

		// setup filename and path
		var outputFilename = 'output_filename.' + ( saveAsWav ? 'wav' : 'aif' );
		outputFilename = path.join( __dirname, outputFilename );

		cmd.push( '-o', outputFilename );

	} else { // just play it back
		cmd.push( '-odac' );
	}

	if (hideDisplays) { cmd.push('-d'); }

	// add the csd filename to cmd array
	cmd.push( path.join(__dirname, req.body.csd ) );

	// concat the commands into one string
	cmd = cmd.join(' ');

	var child = exec(cmd, function (error, stdout, stderr) {

		// any output will be passed to node console
		console.log('stdout: ', stdout);
		console.log('stderr: ', stderr);
		if (error !== null) {
			// you could send an error back to the browser here
			// but you have to make sure to put the res.send() down below into an "else"
			// so only one response will be sent.
			// ex: (status code 409 = Conflict)
			// res.status(409);
			// res.send({ msg: error.message });
			console.log('exec error: ' + error);
		}

		// send a JSON response to the browser, must be done or client will wait forever
		res.send({ all: 'done', ran: cmd });
	});

});

module.exports = router;