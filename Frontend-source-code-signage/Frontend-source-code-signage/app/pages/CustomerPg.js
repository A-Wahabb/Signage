import React, { Component } from 'react';
import {ProviderCode} from './../constants/Config';
//import CustomerContainer from '../containers/CustomerContainer-teams.js';
//import CustomerContainer from '../containers/CustomerContainer-nen.js';
// if(ProviderCode == 'AVK24'){
// 	import CustomerContainer from '../containers/CustomerContainer-av.js';
// }
// if(ProviderCode == 'XT24'){
// 	import CustomerContainer from '../containers/CustomerContainer-teams.js';
// }
// if(ProviderCode == 'NEN24'){
// 	import CustomerContainer from '../containers/CustomerContainer-nen.js';
// }
// if(ProviderCode == 'HAN24'){
// 	import CustomerContainer from '../containers/CustomerContainer-hanane.js';
// }
import CustomerContainer from '../containers/CustomerContainer-beb.js';
export default class CustomerPg extends Component {
  render() {
    return (

        <CustomerContainer />

    );
  }
}
