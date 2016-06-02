var React = require('react');
var Dropzone = require('react-dropzone');

var GPXUpload = React.createClass({
    getInitialState() {
      return {
        files:[]
      };
    },

    onDrop: function (files) {
      if (window.console) console.log("GPXUpload.onDrop()", files);
      this.setState({
        files: files
      });
      files.forEach(function(entry, index) {
        console.log(entry);
        var this_ = this;
        var reader  = new FileReader();
        reader.addEventListener("loadend", function () {
          this_.props.onSelectFile(reader.result);
        }, false);
        
        reader.readAsText(entry);
      }, this);
    },

    render: function () {
      if (window.console) console.log("GPXUpload.render()", this.state.files);
      var style = {
        width: 200,
        //height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      var activeStyle = {
        borderStyle: 'solid',
        backgroundColor: '#eee'
      };
      var rejectStyle = {
        borderStyle: 'solid',
        backgroundColor: '#ffdddd'
      };
      return (
        <Dropzone
          ref="dropzone"
          onDrop={this.onDrop}
          disableClick={false}
          multiple={false}
          style={style}
          activeStyle={activeStyle}
          rejectStyle={rejectStyle}
        >
          <span>.GPX</span>
        </Dropzone>
      );
    }
});

module.exports = GPXUpload;