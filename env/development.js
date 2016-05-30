var development = {
	
	server: {
		port: process.env.NODE_PORT || 3000, 
	},
	geoavalanche: {
		auth: 'admin:geoserver',
		featureNS: 'geoavalanche',
	    featureType: 'geoavalanche_features',
	    geometryName: 'the_geom',
	    srsName: 'EPSG:3857',
	    urlwfs: 'http://' + (process.env.APP_GASERV_HOST || 'localhost') + ':8282/geoserver/wfs?',
	    urlwps: 'http://' + (process.env.APP_GASERV_HOST || 'localhost') + ':8282/geoserver/ows?strict:true'
	}

};

module.exports = development;