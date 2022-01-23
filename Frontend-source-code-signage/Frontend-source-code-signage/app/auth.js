import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({component: ComposedComponent, ...rest}) => {

  class Authentication extends Component {

    // redirect if not authenticated; otherwise, return the component imputted into <PrivateRoute />
    handleRender(props) {
      console.log('--**Check if User is authenticated**--',this.props.isAuthenticated);
      if (!(this.props.isAuthenticated)) {
        return <Redirect to={{
          pathname: '/workspace/signin',
          state: {
            from: props.location,
            message: 'You need to sign in'
          }
        }}/>
      } else {
        return <ComposedComponent {...props}/>
      }
    }

    render() {
      console.log("--private route--");
      return (
        <Route {...rest} render={this.handleRender.bind(this)}/>
      )
    }
  }

  function mapStateToProps(state) {
    console.log('---auth containers, state -> prps--',state);
    return {
      isAuthenticated: state.user&&state.user.status === 'authenticated' ? true : false

    };
  }
  const AuthenticationContainer = connect(mapStateToProps)(Authentication)
  return <AuthenticationContainer/>
}
