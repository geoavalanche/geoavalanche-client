var React = require('react');
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Modal = require('react-bootstrap').Modal;
var Media = require('react-bootstrap').Media;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var SocialButton = require('react-social-button');
var FacebookButton = require('react-social').FacebookButton;
var { SocialIcon, SocialIcons } = require('react-social-icons');
//var CustomSocialIcon = require('./components/styles/CustomSocialIcon.jsx');
//var Radium = require('radium');

var ModalInfo = React.createClass({
  render: function() {

    var paragStyle = {
      textAlign: "justify"
    }
    
    return (
          <div>
            <Grid>
              <Row>
                <h2>What is Avalanche Risk Insight?</h2>
                  <Col md={8}>
                  {/* Block content */}
                  <Media.List>
                    <Media.ListItem>
                      <Media.Body>
                        <Media.Heading>Description</Media.Heading>
                        <p style={paragStyle}></p>
                        <p style={paragStyle}>It&prime;s a mapping application that fosters the use 
                          of <b>location-based information</b> integrated with <b>crowdsourcing </b> 
                          and <b>earth observation</b> data for the avalanche risk at local scale.</p>
                        <p style={paragStyle}>The use is very simple: users can search for a mountain place 
                          (i.e. a peak or hill location) or enter an address which will be geocoded in 
                          the map and then draw a point or a route. After a while the result of avalanche
                          risk index will be displayed as a collection of polygonal shapes or single cicle.
                          The user can also submit the own preferred trail that has been recorded as 
                          GPS track during the ascents or retrieved from turistic website in a GPX format.</p> 
                        <p style={paragStyle}>Behind the scene an innovative algorithm is calculated by a 
                          series of geospatial processing which allows to perform <b>terrain avalanche risk </b>  
                          analysis, <b>land cover reclassification</b> and <b>time-series trends</b> of  
                          <b> snow pack</b> parameters from satellite imagery, together with statistical 
                          occurrence of incidents at scale of pixel extent.</p>
                        <p style={paragStyle}>Users can increase their <b>awareness</b> of avalanche conditions
                          and avoid to visiting <b>places</b> and <b>routes</b> at high avalanche risk. 
                          The tool helps them to plan their next excursion with safer conditions.</p>
                      </Media.Body>
                    </Media.ListItem>
                    <Media.ListItem>
                      <Media.Body>
                        <Media.Heading>GeoAvalanche Services</Media.Heading>
                        <p style={paragStyle}></p>
                        <p style={paragStyle}>All the geoprocesses used by this tool are served from the spatial 
                          data infrastructure (SDI) of GeoAvalanche through a set of standard OGC WPS web services.</p>
                        <p style={paragStyle}>GeoAvalanche WPS processes have been atomically designed to achieve
                          specific functionalities in order to be composable for performing more complex algorithm 
                          by orchestrating all atomic web services within a workflow.</p>
                        <p>That means they can be consumed as single services also from remote clients which 
                          potentially might need some of these particular functions even regardless of the snow 
                          avalanche use case. The available web services under the namespace <b>GeoAvalanche</b> use
                          a DEM and a Land Use coverage to perform the following processes:
                          <ul>
                            <li><b>Buffer</b>: Given an input feature collection the Buffer of the shape for
                                              each feature is calculated
                            </li>
                            <li><b>Slope</b>: Given an input feature the Slope of the Terrain is calculated
                                              for each resulting pixel derived from the cut of the digital elevation 
                                              model by the shape of the feature
                            </li>
                            <li><b>Aspect</b>: Given an input feature the Aspect of the Terrain is calculated
                                              for each resulting pixel derived from the cut of the digital elevation 
                                              model by the shape of the feature
                            </li>
                            <li><b>Curvature</b>: Given an input feature the Curvature of the Terrain is calculated
                                              for each resulting pixel derived from the cut of the digital elevation 
                                              model by the shape of the feature
                            </li>
                            <li><b>Crowd</b>: Given an input feature collection and a period of time the number 
                                              of occurred incidents from the GeoAvalanche crowdsourcing system  
                                              within the shape of each feature is calculated
                            </li>
                            <li><b>ATEI</b>: Given an input feature the Avalanche Terrain Exposure Index is calculated
                                              for each resulting pixel derived from the cut of the digital elevation 
                                              model by the shape of the feature
                            </li>
                            <li><b>ATEINorm</b>: Given an input feature collection the Avalanche Terrain Exposure 
                                              Majority Value Index is calculated for each feature by calling the
                                              <b> ATEI</b> Web Processing Service
                            </li>
                            <li><b>SnowPack</b>: Given an input feature collection the SnowMelt and SnowCover trend 
                                              is calculated for each feature from the cut of the time-series coverage,
                                              retrieved from a remote WPS, by the shape of the feature
                            </li>
                            <li><b>DangerIndex</b>: Given an input feature collection the resulting Danger Index 
                                              is calculated for each feature and appended as key-value by calling the
                                              <b> ATEINorm</b>, <b>SnowPack</b> and <b>Crowd</b> Web Processing Services
                            </li>
                          </ul>
                          <p style={paragStyle}></p>
                          The above services can be publicly discovered and tested from the 
                          <a href="http://geoavalanche.org/geoavalanche/web/wicket/bookmarkable/org.geoserver.wps.web.WPSRequestBuilder"> WPS 
                          Request Builder</a> of the <b>GeoAvalanche server</b>. If you want to integrate them into your 
                          own processing then please have a look at the Capabilities Document 
                          <a href="http://geoavalanche.org/geoavalanche/wps?request=GetCapabilities"> here</a> to figure out
                          the expected inputs and outputs of each WPS.
                        </p>
                      </Media.Body>
                    </Media.ListItem>
                    <Media.ListItem>
                      <Media.Body>
                        <Media.Heading>Data used</Media.Heading>
                        <p style={paragStyle}></p>
                        <p style={paragStyle}>It&prime;s a mapping application that fosters the use of location-based
                          information integrated with crowdsourcing and earth observation data
                          for the avalanche risk at local scale.</p>
                        <p style={paragStyle}>Behind the scene a geospatial processing is performed by an innovative 
                          algorithm which allows to calculate terrain avalanche risk analysis, land cover 
                          reclassification and time-series trends of snow pack parameters from 
                          satellite imagery, together with statistical occurrence of incidents at pixel scale.</p>
                      </Media.Body>
                    </Media.ListItem>
                  </Media.List>
                  </Col>
              </Row>
              <Row>
                <h2>How to use the tool</h2>
                <Col md={4}>
                {/* Block content */}
                <Media>
                    <Media.Body>
                      <Media.Heading>Geocode a mountain</Media.Heading>
                      <p></p>
                      <p>This application has been developed within the MyGEOSS project,
                        which has received funding from the European Union&prime;s Horizon
                        2020 research and innovation programme</p>
                    </Media.Body>
                  </Media>
                </Col>
                <Col md={4}>
                {/* Block content */}
                <Media>
                    <Media.Body>
                      <Media.Heading>Draw on the map</Media.Heading>
                      <p></p>
                      <p>This application has been developed within the MyGEOSS project,
                        which has received funding from the European Union&prime;s Horizon
                        2020 research and innovation programme</p>
                    </Media.Body>
                  </Media>
                </Col>
              </Row>
              <Row>
                <h2>Funding</h2>
                <Col md={8}>
                  {/* Block content */}
                  <Media>
                    <Media.Left align="middle">
                      <a href="http://digitalearthlab.jrc.ec.europa.eu/mygeoss/">
                        <img src="/mygeosslarge.png" height={150} alt="MYGEOSS" />
                      </a>
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>MyGEOSS Project</Media.Heading>
                      <p style={paragStyle}>This application has been developed within the 
                      <a href="http://digitalearthlab.jrc.ec.europa.eu/mygeoss/"> MyGEOSS project</a>,
                      which has received funding from the European Union&prime;s Horizon
                      2020 research and innovation programme</p>
                      <p style={paragStyle}>Avalanche Risk Insight is part of the
                      ecosystem of <a href="http://geoavalanche.org/">GeoAvalanche</a>, a
                      snow avalanche Spatial Data Infrastructure which is developed and
                      maintained by <a href="http://geobeyond.it/">Geobeyond</a></p>
                    </Media.Body>
                  </Media>
                </Col>
              </Row>
              <Row>
                <h2>Contacts</h2>
                <Col md={8}>
                  {/* Block content */}
                  <Media>
                    <Media.Left align="middle">
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>Social</Media.Heading>
                      <div className='well'>
                          <ButtonToolbar>
                            <Row>
                              <Col xs={5}>
                                <h4>Follow us on our channels</h4>
                              </Col>
                              {/*<SocialButton
                                social='twitter'
                                text='Follow us'
                                btnProps={{
                                  onClick: function(){alert('Callback called.');}
                                }}/>
                              <SocialButton
                                social='twitter'
                                btnProps={{
                                  disabled: true,
                                  onClick: function(){alert('Callback called.');}
                                }}/>
                              <SocialButton
                                social='twitter'
                                loading={true}
                                btnProps={{
                                  onClick: function(){alert('Callback called.');}
                                }}/>
                              <SocialButton
                                social='twitter'
                                loading={true}
                                btnProps={{
                                  disabled: true
                                }}/>*/}
                              {/* Social buttons */}
                              {/*<a href="https://twitter.com/geoavalanche" className="btn btn-social-icon btn-twitter" title="follow me on Twitter"><i className="fa fa-twitter"></i></a>*/}
                              {/*<Button type="button" className="btn btn-lg btn-fb"><i className="fa fa-facebook left"></i> Facebook</Button>*/}
                              {/*<MyCustomButton></MyCustomButton>*/}
                              <Col xs={1}>
                                <SocialIcon url="https://twitter.com/geoavalanche" />
                              </Col>
                              <Col xs={1}>
                                <SocialIcon url="https://facebook.com/geoavalanche" />
                                {/*<SocialIcons></SocialIcons>*/}
                              </Col>
                              <Col xs={1}>
                                <SocialIcon url="https://github.com/geoavalanche" />
                              </Col>
                            </Row>
                          </ButtonToolbar>
                      </div>
                      <div>
                        <Row>
                          <Col xs={3}>
                            <h4>Send an email to</h4>
                          </Col>
                          <Col xs={3}>
                            <a href="mailto:info@geobeyond.it?subject=GeoAvalanche&cc=admin@geoavalanche.org"><h4>Geobeyond</h4></a>
                          </Col>
                        </Row>
                      </div>
                    </Media.Body>
                  </Media>
                </Col>
              </Row>
            </Grid>
          </div>
    );
  }
});

module.exports = ModalInfo;