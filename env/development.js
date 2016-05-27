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
	    urlwfs: 'http://localhost:8282/geoavalanche/wfs?',
	    urlwps: 'http://localhost:8282/geoavalanche/ows?strict:true'
	}

};

module.exports = development;