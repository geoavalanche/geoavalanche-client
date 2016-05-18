const React = require('react');
const ReactDOM = require('react-dom');
const ol = require('openlayers');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;

var geometryName_ = 'the_geom';
var srsName_ = 'EPSG:3857';
var vectorSource;
var formatwfs_ = new ol.format.WFS();
var featureType_ = 'azienda1_fences';
var featureNS_ = 'azienda1';
var urlwfs_ = 'http://localhost:8282/geoserver/wfs?';
var serializer_ = new XMLSerializer();
var draw;
var urlwps_ = 'http://localhost:8282/geoserver/ows?strict=true';
var formatWKT = new ol.format.WKT();
var formatGeoJSON = new ol.format.GeoJSON();
var selectedFeature;

var vectorStyleFunction = function(feature) {
  var properties = feature.getProperties();
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'green'
    })
  });
  if (properties.DANGERINDEX === '1') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 1
      }),
      fill: new ol.style.Fill({
        color: 'red'
      })
    });
	}
  if (properties.DANGERINDEX === '2') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 1
      }),
      fill: new ol.style.Fill({
        color: 'black'
      })
    });
  }
  return [style];
};

vectorSource = new ol.source.Vector({
    format: new ol.format.GeoJSON({
        defaultDataProjection: srsName_,
        geometryName: geometryName_
    })
});

var vector = new ol.layer.Vector({
    title: 'xxx',
    source: vectorSource,
    style: vectorStyleFunction
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'osm'})
    }),
    vector
  ],
  view: new ol.View({
    center: [1386513, 5149715],
    zoom: 6
  })
});

var selectedStyleFunction = function(feature, resolution) {
  var properties = feature.getProperties();
  var style = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'green',
      width: 3
    })
  });
  if (properties.DANGERINDEX === '1') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'red',
        width: 3
      })
    });
  }
  if (properties.DANGERINDEX === '2') {
    style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 3
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
    if (window.console) console.log('onAddSelect()');
    selectedFeature = evt.feature;
}
select_.getFeatures().on('add', onAddSelect, this);

var onRemoveSelect = function(evt) {
    if (window.console) console.log('onRemoveSelect()');
}
select_.getFeatures().on('remove', onRemoveSelect, this);

var onDrawEnd = function(evt) {
    if (window.console) console.log("TheApp.onDrawEnd()");
    map.removeInteraction(draw);
    map.addInteraction(select_);
    //map.addInteraction(modify_);


    var feature = evt.feature;
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

    var datawps_ =
      '<?xml version="1.0" encoding="UTF-8"?>'+
      '<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">'+
        '<ows:Identifier>geoavalanche:DangerIndex</ows:Identifier>'+
        '<wps:DataInputs>'+
          '<wps:Input>'+
            '<ows:Identifier>FeatureCollection</ows:Identifier>'+
            '<wps:Data>'+
              '<wps:ComplexData mimeType="application/json"><![CDATA['+JSON.stringify(theColl)+']]></wps:ComplexData>'+
            '</wps:Data>'+
          '</wps:Input>'+
          '<wps:Input>'+
            '<ows:Identifier>distance</ows:Identifier>'+
            '<wps:Data>'+
              '<wps:LiteralData>1000</wps:LiteralData>'+
            '</wps:Data>'+
          '</wps:Input>'+
          '<wps:Input>'+
            '<ows:Identifier>quadrantSegments</ows:Identifier>'+
            '<wps:Data>'+
              '<wps:LiteralData>10</wps:LiteralData>'+
            '</wps:Data>'+
          '</wps:Input>'+
          '<wps:Input>'+
            '<ows:Identifier>capStyle</ows:Identifier>'+
            '<wps:Data>'+
              '<wps:LiteralData>Round</wps:LiteralData>'+
            '</wps:Data>'+
          '</wps:Input>'+
        '</wps:DataInputs>'+
        '<wps:ResponseForm>'+
          '<wps:RawDataOutput mimeType="application/json">'+
            '<ows:Identifier>result</ows:Identifier>'+
          '</wps:RawDataOutput>'+
        '</wps:ResponseForm>'+
      '</wps:Execute>';

    if (window.console) console.log('POST '+urlwps_+', data='+datawps_);
    $.ajax({
      type: "POST",
      url: urlwps_,
      data: datawps_,
      contentType: 'text/xml',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:geoserver'));
      },
      success: function(data) {
        if (window.console) console.log('success()');
        if (window.console) console.log(data);
        var newfeatures = formatGeoJSON.readFeatures(data);
        if (window.console) console.log(newfeatures);
        vectorSource.addFeatures(newfeatures);
        vectorSource.removeFeature(feature);
        map.getView().fit(vector.getSource().getExtent(), map.getSize());
      },
      error: function(xhr, desc, err) {
        if (window.console) console.log('error()');
        if (window.console) console.log(xhr);
        if (window.console) console.log(desc);
        if (window.console) console.log(err);
      },
      context: this
    });

    if (window.console) console.log("TheApp.onDrawEnd() ... done");
}

var saveFeature = function(feature) {
    var node =formatwfs_.writeTransaction([feature], null, null, {
      gmlOptions: {srsName: srsName_},
      featureNS: featureNS_,
      featureType: featureType_
    });
    if (window.console) console.log('POST '+urlwfs_+', data='+serializer_.serializeToString(node));
    $.ajax({
      type: "POST",
      url: urlwfs_,
      data: serializer_.serializeToString(node),
      contentType: 'text/xml',
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:geoserver'));
      },
      success: function(data) {
        if (window.console) console.log('success()');
      },
      error: function(e) {
        var errorMsg = e? (e.status + ' ' + e.statusText) : "";
        if (window.console) console.log('error() '+errorMsg);
      },
      context: this
    });
}

var TheApp = React.createClass({
  getInitialState: function() {
    return {};
  },
  fitExtent: function(e) {
    e.preventDefault();
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
      geometryName: geometryName_,
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
      geometryName: geometryName_,
      type: 'Point'
    });
    map.addInteraction(draw);
    map.removeInteraction(select_);
    map.removeInteraction(modify_);
    draw.on('drawend', onDrawEnd, this);
    if (window.console) console.log("TheApp.drawPoint() ... done");
  },

  render: function() {
    if (window.console) console.log("TheApp.render()");
    return (
      <form>
      <Button onClick={this.fitExtent}><Glyphicon glyph="fullscreen" /></Button>
      <Button onClick={this.deleteFeature}><Glyphicon glyph="trash" /></Button>
      <Button onClick={this.drawLineString}>Disegna il tuo percorso</Button>
      <Button onClick={this.drawPoint}>Seleziona un punto sulla mappa</Button>
      </form>
    );
  }
});


ReactDOM.render(<TheApp />, document.getElementById('content'));
