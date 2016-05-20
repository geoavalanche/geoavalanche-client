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
    if (window.console) console.log("onChange() ", value);
    this.props.onSelectAddress(value.lat(), value.lng());
  },

  getOptions(input, selectCallback) {
    if (window.console) console.log("getOptions() ", input);
    if (input === "") {
      selectCallback(null, {
        options: [],
        complete: false
      });
      return;
    }
    GMaps.geocode({
      address: input,
      callback: function(results, status) {
        if (status !== 'OK') return;
        var options = results.map(function(entry){
          return {value: entry.geometry.location, label: entry.formatted_address};
        });
        selectCallback(null, {
          options: options,
          complete: false
        });
      }
    });
  },

  render() {
    return (
      <div className="section">
        <Select.Async
        //name="selected-state"
        //ref="stateSelect"
        placeholder="Localita' di tuo interesse ..."
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
