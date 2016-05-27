var testing = {
	
	server: {
		port: process.env.NODE_PORT || 3001, 
	},
	geoavalanche: {
		auth: 'admin:geoserver',
		featureNS: 'geoavalanche',
	    featureType: 'geoavalanche_features',
	    geometryName: 'the_geom',
	    srsName: 'EPSG:3857',
	    urlwfs: 'http://192.168.99.100:8080/geoavalanche/wfs?',
	    urlwps: 'http://192.168.99.100:8080/geoavalanche/ows?strict:true'
	}

};

module.exports = testing;