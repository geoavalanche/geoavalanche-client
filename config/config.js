var env = process.env.NODE_ENV || 'development';

var config = function (env) { 
	var conf = {};

	switch (env) {
		case 'production':
			conf = require('../env/' + env);
			break;

		case 'development':
			conf = require('../env/' + env);
			break;

		case 'testing':
			conf = require('../env/' + env);
			break;

		case 'staging':
			conf = require('../env/' + env);
			break;

		default:
			console.error('Unrecognized NODE_ENV: >>'+env+'<<');
			process.exit(1);
	}
	return conf;
};

module.exports = config;