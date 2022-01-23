import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    console.log('-- Home will mount--', this.props);
    console.log(this.props);



}

componentWillUnmount() {
  //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
  //always reset that global state back to null when you REMOUNT
   //this.props.resetMe();
}
  render() {
    const { user, loading, error} = this.props.user;

    if(loading) {
      return <div className="container"><h1>Dashboard</h1><h3>Loading...</h3></div>
    } else if(error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Dashboard</h1>

      </div>
    );
  }
}


export default Home;
