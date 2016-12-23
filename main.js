// const React = require('react');
// const ReactDOM = require('react-dom');
// const ol = require('openlayers');
// const Button = require('react-bootstrap').Button;
// const Glyphicon = require('react-bootstrap').Glyphicon;
// import SearchAddress from './components/SearchAddress';
var React = require('react');
var ReactDOM = require('react-dom');
var ol = require('openlayers');
var Button = require('react-bootstrap').Button;
var Navbar = require('react-bootstrap').Navbar;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Modal = require('react-bootstrap').Modal;
var MapzenSearchAddress = require('./components/MapzenSearchAddress');
var GPXUpload = require('./components/GPXUpload');
var Mapskin = require('./components/styles/icons/mapskin.css');
var ModalInfo = require('./components/ModalInfo');
var simplify = require('simplify-js');
var LayerSwitcher = require('./node_modules/ol-layerswitcher/src/ol3-layerswitcher');
var Custom = require('./components/styles/custom.css');

var vectorSource;
var formatwfs_ = new ol.format.WFS();
var serializer_ = new XMLSerializer();
var draw;
var formatWKT = new ol.format.WKT();
var formatGeoJSON = new ol.format.GeoJSON();
var formatWFS = new ol.format.WFS();
var formatGPX = new ol.format.GPX();
var selectedFeature;
var featureid = 0;

var datawps =
  '<?xml version="1.0" encoding="UTF-8"?>'+
    '<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">'+
     '<ows:Identifier>geoavalanche:DangerIndex</ows:Identifier>'+
     '<wps:DataInputs>'+
        '<wps:Input>'+
           '<ows:Identifier>FeatureCollection</ows:Identifier>'+
           '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">'+
              '<wps:Body>'+
                 '<wps:Execute version="1.0.0" service="WPS">'+
                    '<ows:Identifier>geoavalanche:SnowPack</ows:Identifier>'+
                    '<wps:DataInputs>'+
                       '<wps:Input>'+
                          '<ows:Identifier>FeatureCollection</ows:Identifier>'+
                          '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">'+
                             '<wps:Body>'+
                                '<wps:Execute version="1.0.0" service="WPS">'+
                                   '<ows:Identifier>geoavalanche:Crowd</ows:Identifier>'+
                                   '<wps:DataInputs>'+
                                     '<wps:Input>'+
                                        '<ows:Identifier>FeatureCollection</ows:Identifier>'+
                                        '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">'+
                                           '<wps:Body>'+
                                              '<wps:Execute version="1.0.0" service="WPS">'+
                                                 '<ows:Identifier>geoavalanche:ATEINorm</ows:Identifier>'+
                                                 '<wps:DataInputs>'+
                                                   '<wps:Input>'+
                                                     '<ows:Identifier>dem</ows:Identifier>'+
                                                     '<wps:Reference mimeType="image/tiff" xlink:href="http://geoserver/wcs" method="POST">'+
                                                       '<wps:Body>'+
                                                         '<wcs:GetCoverage service="WCS" version="1.1.1">'+
                                                           '<ows:Identifier>geoavalanche:eu_dem_v11_E40N20_3035</ows:Identifier>'+
                                                           '<wcs:DomainSubset>'+
                                                             '<ows:BoundingBox crs="http://www.opengis.net/gml/srs/epsg.xml#3035">'+
                                                               '<ows:LowerCorner>4000000.0 2000000.0</ows:LowerCorner>'+
                                                               '<ows:UpperCorner>5000000.0 3000000.0</ows:UpperCorner>'+
                                                             '</ows:BoundingBox>'+
                                                           '</wcs:DomainSubset>'+
                                                           '<wcs:Output format="image/tiff"/>'+
                                                         '</wcs:GetCoverage>'+
                                                       '</wps:Body>'+
                                                     '</wps:Reference>'+
                                                   '</wps:Input>'+
                                                   '<wps:Input>'+
                                                     '<ows:Identifier>clc</ows:Identifier>'+
                                                     '<wps:Reference mimeType="image/tiff" xlink:href="http://geoserver/wcs" method="POST">'+
                                                       '<wps:Body>'+
                                                         '<wcs:GetCoverage service="WCS" version="1.1.1">'+
                                                           '<ows:Identifier>geoavalanche:g100_clc12_V18_5_3035</ows:Identifier>'+
                                                           '<wcs:DomainSubset>'+
                                                             '<ows:BoundingBox crs="http://www.opengis.net/gml/srs/epsg.xml#3035">'+
                                                               '<ows:LowerCorner>-7305078.365730155 -5058707.879539164</ows:LowerCorner>'+
                                                               '<ows:UpperCorner>1.5947078365730155E7 1.569560389291389E7</ows:UpperCorner>'+
                                                             '</ows:BoundingBox>'+
                                                           '</wcs:DomainSubset>'+
                                                           '<wcs:Output format="image/tiff"/>'+
                                                         '</wcs:GetCoverage>'+
                                                       '</wps:Body>'+
                                                     '</wps:Reference>'+
                                                   '</wps:Input>'+
                                                    '<wps:Input>'+
                                                       '<ows:Identifier>FeatureCollection</ows:Identifier>'+
                                                       '<wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">'+
                                                          '<wps:Body>'+
                                                             '<wps:Execute version="1.0.0" service="WPS">'+
                                                                '<ows:Identifier>geoavalanche:Buffer</ows:Identifier>'+
                                                                '<wps:DataInputs>'+
                                                                   '<wps:Input>'+
                                                                      '<ows:Identifier>FeatureCollection</ows:Identifier>'+
                                                                      '<wps:Data>'+
                                                                         '<wps:ComplexData mimeType="application/json"><![CDATA[XXXX]]></wps:ComplexData>'+
                                                                      '</wps:Data>'+
                                                                   '</wps:Input>'+
                                                                   '<wps:Input>'+
                                                                      '<ows:Identifier>sourceCRS</ows:Identifier>'+
                                                                      '<wps:Data>'+
                                                                         '<wps:LiteralData>EPSG:3857</wps:LiteralData>'+
                                                                      '</wps:Data>'+
                                                                   '</wps:Input>'+
                                                                   '<wps:Input>'+
                                                                      '<ows:Identifier>targetCRS</ows:Identifier>'+
                                                                      '<wps:Data>'+
                                                                         '<wps:LiteralData>EPSG:4326</wps:LiteralData>'+
                                                                      '</wps:Data>'+
                                                                   '</wps:Input>'+
                                                                '</wps:DataInputs>'+
                                                                '<wps:ResponseForm>'+
                                                                   '<wps:RawDataOutput mimeType="application/wfs-collection-1.1">'+
                                                                      '<ows:Identifier>result</ows:Identifier>'+
                                                                   '</wps:RawDataOutput>'+
                                                                '</wps:ResponseForm>'+
                                                             '</wps:Execute>'+
                                                          '</wps:Body>'+
                                                       '</wps:Reference>'+
                                                    '</wps:Input>'+
                                                    '<wps:Input>'+
                                                       '<ows:Identifier>sourceCRS</ows:Identifier>'+
                                                       '<wps:Data>'+
                                                          '<wps:LiteralData>EPSG:4326</wps:LiteralData>'+
                                                       '</wps:Data>'+
                                                    '</wps:Input>'+
                                                 '</wps:DataInputs>'+
                                                 '<wps:ResponseForm>'+
                                                    '<wps:RawDataOutput mimeType="application/wfs-collection-1.1">'+
                                                       '<ows:Identifier>result</ows:Identifier>'+
                                                    '</wps:RawDataOutput>'+
                                                 '</wps:ResponseForm>'+
                                              '</wps:Execute>'+
                                            '</wps:Body>'+
                                         '</wps:Reference>'+
                                      '</wps:Input>'+
                                      '<wps:Input>'+
                                         '<ows:Identifier>sourceCRS</ows:Identifier>'+
                                         '<wps:Data>'+
                                            '<wps:LiteralData>EPSG:4326</wps:LiteralData>'+
                                         '</wps:Data>'+
                                      '</wps:Input>'+
                                   '</wps:DataInputs>'+
                                   '<wps:ResponseForm>'+
                                      '<wps:RawDataOutput mimeType="application/wfs-collection-1.1">'+
                                         '<ows:Identifier>result</ows:Identifier>'+
                                      '</wps:RawDataOutput>'+
                                   '</wps:ResponseForm>'+
                                '</wps:Execute>'+
                             '</wps:Body>'+
                          '</wps:Reference>'+
                       '</wps:Input>'+
                    '</wps:DataInputs>'+
                    '<wps:ResponseForm>'+
                       '<wps:RawDataOutput mimeType="application/wfs-collection-1.1">'+
                          '<ows:Identifier>result</ows:Identifier>'+
                       '</wps:RawDataOutput>'+
                    '</wps:ResponseForm>'+
                 '</wps:Execute>'+
              '</wps:Body>'+
           '</wps:Reference>'+
        '</wps:Input>'+
     '</wps:DataInputs>'+
     '<wps:ResponseForm>'+
        '<wps:RawDataOutput mimeType="application/wfs-collection-1.1">'+
           '<ows:Identifier>result</ows:Identifier>'+
        '</wps:RawDataOutput>'+
     '</wps:ResponseForm>'+
  '</wps:Execute>';

var env = process.env.NODE_ENV;
console.log('Environment variable NODE_ENV has been set to ' + env);
var gas = process.env.APP_GASERV_HOST;
console.log('Environment variable APP_GASERV_HOST has been set to ' + gas);

var config = null;
if (env === "production") {
  config = require('./env/production.js');
}
else if (env === "development") {
  config = require('./env/development.js');
}
else if (env === "testing") {
  config = require('./env/testing.js');
}
else if (env === "staging") {
  config = require('./env/staging.js');
}
else config = require('./static.json');

//console.log(config.geoavalanche);

var vectorStyleFunction = function(feature) {
  var properties = feature.getProperties();
  var style = new ol.style.Style({
    fill: new ol.style.Fill({
      color: [128,128,128, 0.5]
    })
  });
  if (properties.dangerindex === '0') {
    style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [102, 194, 165, 0.5]   //'custom green'
      })
    });
  }
  if (properties.dangerindex === '1') {
    style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [102, 194, 165, 0.5]   //'custom green'
      })
    });
  }
  if (properties.dangerindex === '2') {
    style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [252, 141, 98, 0.5]   //'custom red'
      })
    });
  }
  if (properties.dangerindex === '3') {
    style = new ol.style.Style({
      fill: new ol.style.Fill({
        color: [141, 160, 203, 0.5]   //'custom blue'
      })
    });
  }
  return [style];
};

vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON({
        defaultDataProjection: config.geoavalanche.srsName,
        geometryName: config.geoavalanche.geometryName
    })
});

var vector = new ol.layer.Vector({
    title: 'Result',
    source: vectorSource,
    style: vectorStyleFunction
});

var theCaptionControl = function(opt_options) {
    console.log("theCaptionControl()");

    var options = opt_options || {};

    var theInfo = document.createElement('div');
    theInfo.innerHTML = '<p style="background-color:#8da0cb;color:white">Very Danger</p><p style="background-color:#fc8d62;color:white">Danger</p><p style="background-color:#66c2a5;color:white">Good</p><p style="background-color:gray;color:white">no data</p>';
    theInfo.style.float = 'right';
    theInfo.style.display = 'none';

    var theButton = document.createElement('button');
    theButton.innerHTML = 'i';
    theButton.style.float = 'right';
    theButton.style.display = 'block';

    var this_ = this;
    var handleTheCaption = function() {
      console.log("handleTheCaption()", theInfo.style.display);
      if (theInfo.style.display == 'block' || theInfo.style.display=='')
      {
          theInfo.style.display = 'none';
      }
      else
      {
          theInfo.style.display = 'block';
      }
    };

    theButton.addEventListener('click', handleTheCaption, false);
    theButton.addEventListener('touchstart', handleTheCaption, false);

    var theControl = document.createElement('div');
    theControl.className = 'the-caption ol-control';
    theControl.appendChild(theButton);
    theControl.appendChild(theInfo);

    ol.control.Control.call(this, {
      element: theControl,
      target: options.target
    });

};
ol.inherits(theCaptionControl, ol.control.Control);

var openSnowmapLayer = new ol.layer.Tile({
  title: 'OpenSnowMap',
  type: 'base',
  visible: true,
  source: new ol.source.OSM({
    attributions: [
      new ol.Attribution({
                html: '&copy; ' +
                    '<a href="http://www.opensnowmap.org/">Opensnow.org</a> '
      }),
      ol.source.OSM.ATTRIBUTION
    ],
    crossOrigin: null,
    url: 'https://www.procrastinatio.org/cgi-bin/proxy.cgi?url=http://www.opensnowmap.org/opensnowmap-overlay/{z}/{x}/{y}.png'
  })
});

var openTopomapLayer = new ol.layer.Tile({
    title: 'OpenTopoMap',
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
        attributions: [
          new ol.Attribution({
                    html: '&copy; ' +
                        '<a href="http://www.opentopomap.org/">opentopomap.org</a> '
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
    })
});

var stamenTerrainLayer = new ol.layer.Tile({
    title: 'Stamen Terrain',
    type: 'base',
    visible: true,
    source: new ol.source.XYZ({
        attributions: [
          new ol.Attribution({
                    html: '&copy; ' +
                        '<a href="http://maps.stamen.com/">maps.stamen.com</a> '
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: '//tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
    })
});

//group of basemaps
var basemaps_group = new ol.layer.Group({
  title: 'Basemaps',
  layers: [
    openSnowmapLayer,
    stamenTerrainLayer,
    openTopomapLayer
  ]
});

var map = new ol.Map({
  target: 'map',
  layers: [
    //openTopomapLayer,
    basemaps_group,
    vector
  ],
  view: new ol.View({
    center: [1386513, 5149715],
    zoom: 6
  }),
  controls: ol.control.defaults({
      attributionOptions: ({
          collapsible: false
      })
  }).extend([
      //new ol.control.ZoomSlider(),
      //new ol.control.MousePosition({ coordinateFormat: ol.coordinate.createStringXY(4), projection: 'EPSG:4326' }),
      new ol.control.ScaleLine(),
      new theCaptionControl()
  ])
});

//definition of LayerSwitcher object
var layerSwitcher = new LayerSwitcher({
  tipLabel: 'layer switcher'
});
//var layerSwitcher = ol.control.LayerSwitcher;
//add layerSwitcher control to the map
map.addControl(layerSwitcher);
//Show the control as soon as page is loaded
layerSwitcher.showPanel();

var selectedStyleFunction = function(feature, resolution) {
  var properties = feature.getProperties();
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: [0, 255, 0, 0.5]   //'green'
    })
  });
  if (properties.dangerindex === '1') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'yellow',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [255, 0, 0, 0.5]   //'red'
      })
    });
  }
  if (properties.dangerindex === '2') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'yellow',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [0, 0, 0, 0.5]   //'black'
      })
    });
  }
  return [style];
};
var select_ = new ol.interaction.Select({
    style: selectedStyleFunction
});
var modify_ = new ol.interaction.Modify({
    features: select_.getFeatures()
});

var onAddSelect = function(evt) {
    if (window.console) console.log('TheApp.onAddSelect()');
    selectedFeature = evt.feature;
};
select_.getFeatures().on('add', onAddSelect, this);

var onRemoveSelect = function(evt) {
    if (window.console) console.log('TheApp.onRemoveSelect()');
};
select_.getFeatures().on('remove', onRemoveSelect, this);

var onDrawEnd = function(evt) {
    if (window.console) console.log("TheApp.onDrawEnd()");
    document.getElementById('map').style.cursor = 'wait';
    map.removeInteraction(draw);
    map.addInteraction(select_);
    //map.addInteraction(modify_);

    var feature = evt.feature;
    feature.setId('feature'+featureid++);
    if (window.console) {
      console.log(formatWKT.writeFeature(feature));
      console.log(formatGeoJSON.writeFeature(feature));
    }

    var theFeature = JSON.parse(formatGeoJSON.writeFeature(feature));
    if (theFeature.properties === null) {
      delete theFeature.properties;
    }
    var theColl = {type: "FeatureCollection", features: [theFeature]};
    if (window.console) console.log(JSON.stringify(theColl));

    var datawps_ = datawps.replace("XXXX", JSON.stringify(theColl));

    if (window.console) console.log('POST', config.geoavalanche.urlwps);
    $.ajax({
      type: "POST",
      url: config.geoavalanche.urlwps,
      data: datawps_,
      contentType: 'text/xml',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.geoavalanche.auth));
      },
      success: function(data) {
        document.getElementById('map').style.cursor = 'default';
        if (window.console) console.log('success()');
        var newfeatures = formatWFS.readFeatures(data, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
        if (window.console) console.log(newfeatures);
        vectorSource.removeFeature(feature);
        vectorSource.refresh();
        vectorSource.addFeatures(newfeatures);
        //saveFeatures(newfeatures);
        map.getView().fit(vector.getSource().getExtent(), map.getSize());
      },
      error: function(xhr, desc, err) {
        document.getElementById('map').style.cursor = 'default';
        if (window.console) console.log('error()', xhr, desc, err);
      },
      context: this
    });

    if (window.console) console.log("TheApp.onDrawEnd() ... done");
};

var saveFeatures = function(features) {
    var node =formatwfs_.writeTransaction(features, null, null, {
      gmlOptions: {srsName: config.geoavalanche.srsName},
      featureNS: config.geoavalanche.featureNS,
      featureType: config.geoavalanche.featureType
    });
    if (window.console) console.log('POST', config.geoavalanche.urlwfs, node);
    $.ajax({
      type: "POST",
      url: config.geoavalanche.urlwfs,
      data: serializer_.serializeToString(node),
      contentType: 'text/xml',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.geoavalanche.auth));
      },
      success: function(data) {
        if (window.console) console.log('success()', data);
      },
      error: function(e) {
        if (window.console) console.log('error()', e);
      },
      context: this
    });
};

var onSelectAddress = function(lat, lng){
  if (window.console) console.log("TheApp.onSelectAddress()", "latitude", lat, "longitude", lng);
  map.addInteraction(select_);
  //map.addInteraction(modify_);

  var coord = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');
  if (window.console) console.log("TheApp.onSelectAddress()", "coordinate", coord);
  var thePoint = new ol.geom.Point(coord);
  var feature = new ol.Feature();
  feature.setId('feature'+featureid++);
  feature.setGeometryName(config.geoavalanche.geometryName);
  feature.setGeometry(thePoint);

  if (window.console) {
    console.log(formatWKT.writeFeature(feature));
    console.log(formatWKT.writeGeometry(feature.getGeometry()));
    console.log(formatGeoJSON.writeFeature(feature));
    console.log(formatGeoJSON.writeGeometry(feature.getGeometry()));
  }

  var theFeature = JSON.parse(formatGeoJSON.writeFeature(feature));
  if (theFeature.properties === null) {
    delete theFeature.properties;
  }

  var theColl = {type: "FeatureCollection", features: [theFeature]};
  if (window.console) console.log(JSON.stringify(theColl));
    var datawps_ = datawps.replace("XXXX", JSON.stringify(theColl));

    if (window.console) console.log('POST', config.geoavalanche.urlwps);
    document.getElementById('map').style.cursor = 'wait';
    $.ajax({
      type: "POST",
      url: config.geoavalanche.urlwps,
      data: datawps_,
      contentType: 'text/xml',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:geoserver'));
      },
      success: function(data) {
        document.getElementById('map').style.cursor = 'default';
        if (window.console) console.log('success()');
        var newfeatures = formatWFS.readFeatures(data, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
        if (window.console) console.log(newfeatures);
        vectorSource.addFeatures(newfeatures);
        //saveFeatures(newfeatures);
        map.getView().fit(vector.getSource().getExtent(), map.getSize());
      },
      error: function(xhr, desc, err) {
        document.getElementById('map').style.cursor = 'default';
        if (window.console) console.log('error()', xhr, desc, err);
      },
      context: this
    });

    if (window.console) console.log("TheApp.onSelectAddress() ... done");
};

var onSelectFile = function(filecontent){
  if (window.console) console.log("TheApp.onSelectFile()", "projection", formatGPX.readProjection(filecontent));
  document.getElementById('map').style.cursor = 'wait';
  map.addInteraction(select_);

  var newfeatures = formatGPX.readFeatures(filecontent, {featureProjection:'EPSG:3857'});
  if (window.console) console.log(newfeatures);

  var theColl = JSON.parse(formatGeoJSON.writeFeatures(newfeatures));

  var fullpoints = theColl.features[0].geometry.coordinates[0].map(function(rec){
    return {x:rec[0], y:rec[1]};
  });
  var shortpoints = simplify(fullpoints,200);
  var shortpoints2 = shortpoints.map(function(rec){
    return [rec.x, rec.y];
  });
  theColl.features[0].geometry.coordinates[0]=shortpoints2;

  var datawps_ = datawps.replace("XXXX", JSON.stringify(theColl));

  if (window.console) console.log('POST', config.geoavalanche.urlwps);
  $.ajax({
    type: "POST",
    url: config.geoavalanche.urlwps,
    data: datawps_,
    contentType: 'text/xml',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(config.geoavalanche.auth));
    },
    success: function(data) {
      document.getElementById('map').style.cursor = 'default';
      if (window.console) console.log('success()');
      var newfeatures = formatWFS.readFeatures(data, {dataProjection:'EPSG:4326', featureProjection:'EPSG:3857'});
      if (window.console) console.log(newfeatures);

      vectorSource.addFeatures(newfeatures);
      //saveFeatures(newfeatures);
      map.getView().fit(vector.getSource().getExtent(), map.getSize());
    },
    error: function(xhr, desc, err) {
      document.getElementById('map').style.cursor = 'default';
      if (window.console) console.log('error()', xhr, desc, err);
    },
    context: this
  });

  if (window.console) console.log("TheApp.onSelectFile() ... done");
}

var Logo = React.createClass({
  render: function() {
    return (
          <a href="/">
            <img src="/geoavalanche.png" height="70" width="150" alt="GeoAvalanche" />
          </a>
    );
  }
});

var MyGeoss = React.createClass({
  render: function() {
    return (
          <a href="/">
            <img src="/mygeoss.png" height="70" width="30" alt="MYGEOSS" />
          </a>
    );
  }
});

{/*var MyCustomButton = React.createClass({
  render: function() {
    var link = "https://github.com/olahol/react-social/", facebookAppId = "yourFacebookAppId", message = "React Social!";

    return (
          <FacebookButton title="Share via Facebook" message={message} appId={facebookAppId} url={link} element="a" className="btn btn-social-icon btn-facebook">
              <i className="fa fa-facebook-square"/>
          </FacebookButton>   
    );
  }
});*/}

{/*var CustomSocialButtons = React.createClass({
  render: function() {
    var urls = [
      'http://jaketrent.com',
      'http://twitter.com/jaketrent',
      'http://linkedin.com/in/jaketrent',
      'http://www.pinterest.com/jaketrent/artsy-fartsy/'
    ];

    return (
      <SocialIcons urls={urls} />
    );
    
  }
});*/}

var TheApp = React.createClass({
  getInitialState: function() {
    return {showInfo: false};
  },
  fitExtent: function(e) {
    e.preventDefault();
    if ((vector.getSource().getExtent()[0] === Infinity) &&
        (vector.getSource().getExtent()[1] === Infinity) &&
        (vector.getSource().getExtent()[2] === -Infinity) &&
        (vector.getSource().getExtent()[3] === -Infinity)
        ) return;
    map.getView().fit(vector.getSource().getExtent(), map.getSize());
  },
  deleteFeature: function(e) {
    e.preventDefault();
    select_.getFeatures().forEach(function(entry) {
      if (window.console) console.log('removeFeature()');
      vectorSource.removeFeature(entry);
    }, this);
    select_.getFeatures().clear();
  },
  drawLineString: function(e) {
    e.preventDefault();
    if (window.console) console.log("TheApp.drawLineString()");
    map.removeInteraction(draw);
    draw = new ol.interaction.Draw({
      source: vectorSource,
      geometryName: config.geoavalanche.geometryName,
      type: 'LineString'
    });
    map.addInteraction(draw);
    map.removeInteraction(select_);
    map.removeInteraction(modify_);
    draw.on('drawend', onDrawEnd, this);
    if (window.console) console.log("TheApp.drawLineString() ... done");
  },

  drawPoint: function(e) {
    e.preventDefault();
    if (window.console) console.log("TheApp.drawPoint()");
    map.removeInteraction(draw);
    draw = new ol.interaction.Draw({
      source: vectorSource,
      geometryName: config.geoavalanche.geometryName,
      type: 'Point'
    });
    map.addInteraction(draw);
    map.removeInteraction(select_);
    map.removeInteraction(modify_);
    draw.on('drawend', onDrawEnd, this);
    if (window.console) console.log("TheApp.drawPoint() ... done");
  },
  
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  handleResize: function(e) {
    //map.updateSize()
    //console.log("map.getSize()->",map.getSize(),window.innerWidth,window.innerHeight);
  },

  showInfo() {
    this.setState({showInfo: true});
  },

  hideInfo() {
    this.setState({showInfo: false});
  },
  
  render: function() {
    if (window.console) console.log("TheApp.render()");
    return (
      <div>
      <form>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo></Logo>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <h3>AVALANCHE RISK INSIGHT</h3>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Button onClick={this.fitExtent}><Glyphicon glyph="fullscreen" /></Button>
      <Button onClick={this.deleteFeature}><Glyphicon glyph="trash" /></Button>
      <Button onClick={this.drawLineString}>Draw your route</Button>
      <Button onClick={this.drawPoint}>Draw a point on the map</Button>
    
        <Modal
          {...this.props}
          show={this.state.showInfo}
          onHide={this.hideInfo}
          dialogClassName="custom-modal"
          bsSize="large"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <ModalInfo/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideInfo}>Close</Button>
          </Modal.Footer>
        </Modal>
        
      <GPXUpload onSelectFile={onSelectFile} />
      <Button onClick={this.showInfo}>Info</Button>
      <MapzenSearchAddress url={config.mapzen.url} onSelectAddress={onSelectAddress} />
      </form>
      </div>
    );
  }
});


ReactDOM.render(<TheApp />, document.getElementById('content'));
