import React from 'react';
import { Component } from 'react';

class AppPg extends Component {
  render() {
    console.log('---app page--',this.props);
    return (<div>
        {this.props.children}
        </div>
    );
  }
}

 export default AppPg;
