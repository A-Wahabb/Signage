import React, { Component } from 'react';
import TimePicker from 'react-time-picker';

export default class renderTimePicker extends Component {

  constructor(props){
    super(props);
  }

  state = {
    time: '10:00',
  }

  onChange = time => this.setState({ time })

  render() {
    const {
      input, label ,type,defaultValue,
      meta: { touched, error, invalid, warning }
    } = this.props;
    return (
      <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <TimePicker
          onChange={this.onChange}
          value={defaultValue}
        />
                    <label>{label}</label>
            <span className="focus-border"></span>
      </div>
    );
  }
}