var React = require('react');
const ReactDOM = require('react-dom');
const Button = require('react-bootstrap').Button;
const Glyphicon = require('react-bootstrap').Glyphicon;
var Select = require('react-select');


var SearchAddress = React.createClass({

  getInitialState() {
    return { };
  },

  onChange(value) {
    if (window.console) console.log("SearchAddress.onChange() ", this.state.options[value]);
    this.setState({value: value});
    this.props.onSelectAddress(this.state.options[value].lat, this.state.options[value].lng);
  },

  getOptions(input, selectCallback) {
    if (window.console) console.log("SearchAddress.getOptions() ", input);
    if (input === "") {
      selectCallback(null, {
        options: [],
        complete: false
      });
      return;
    }

    var this_ = this;
    GMaps.geocode({
      address: input,
      callback: function(results, status) {
        if (status !== 'OK') return;
        var options = results.map(function(entry, index){
          return {value:index, label:entry.formatted_address, lat:entry.geometry.location.lat(), lng:entry.geometry.location.lng()};
        });
        this_.setState({options: options});
        selectCallback(null, {
          options: options,
          complete: false
        });
      }
    });
  },

  render() {
    if (window.console) console.log("SearchAddress.render() ");
    return (
      <div className="section">
        <Select.Async
        //name="selected-state"
        //ref="stateSelect"
        placeholder="Inserisci la localita' di tuo interesse ..."
        value={this.state.value}
        //autofocus
        //options={options}
        loadOptions={this.getOptions}
        simpleValue
        clearable={true}
        disabled={false}
        //value={this.state.selectValue}
        onChange={this.onChange}
        searchable={true} />
      </div>
    );
  }
});

module.exports = SearchAddress;
