import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import { reduxForm, Field,formValueSelector, SubmissionError } from 'redux-form';
import renderField from './renderField';
import {Loading,Title,Error} from './commonDumbs';
import { validatePlayerFields, validatePlayerFieldsSuccess, validatePlayerFieldsFailure } from '../actions/posts';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER,LOCAL_SERVER} from '../constants/Config';

//Client side validation
function validate(values) {
  console.log("Called input validation..",values);
  const errors = {};
  if (!values.playerName || values.playerName.trim() === '') {
    errors.playerName = 'Enter a player name';
  }
  if (!values.screenNumber || String(values.screenNumber).trim() === '') {
    errors.screenNumber = 'Get it from your Screen';
  }
  //console.error("error validation..",errors);
  return errors;
}


class PlayerUpdate extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  constructor (props) {
    super(props);
  }

  componentWillMount() {
  //  this.props.resetMe();
  //  let paramPlayerId=this.props.params.playerId;
    //this.props.fetchPlayerDetail(paramPlayerId);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.newPlayer.player && !this.props.activePlayer.player){
      //browserHistory.push('/workspace/dashboard');
      this.context.router.history.push("/workspace/dashboard");
      return;
    }
    let player=nextProps.newPlayer && nextProps.newPlayer.player ;
    let isPlayerPending= player && player._id && (player.status=="PENDING")?true:false;
    //after Saved in DB
    if(isPlayerPending) { this.props.resetMe();
  }
  }

  gotoAppSelection(evt){
    evt.preventDefault();
    this.context.router.history.push("/workspace/players/"+this.props.params.playerId+"/apps");
  }

  updateContent(evt){
    evt.preventDefault();
    this.props.updateNewPlayer(evt.target.name,evt.target.value,this.props.activePlayer.player);
  }


  render() {
    const {handleSubmit, submitting,  activePlayer, validateAndSavePlayer} = this.props;
    let playerDetail =null;
    let appThumbnail = (activePlayer.player && activePlayer.player.thumb)?BASE_SERVER+(activePlayer.player.thumb.split('~~').length==2?activePlayer.player.thumb.split('~~')[1]:activePlayer.player.thumb):  LOCAL_SERVER+"/assets/signage-empty.png";
    let error= activePlayer.error|| (activePlayer.player&&activePlayer.player.error) ;
    if(activePlayer.player){
      playerDetail=<div className="col-sm-12 col-md-8 col-lg-6">
      <form onSubmit={ handleSubmit((values)=>validateAndSavePlayer(values,this.props)) }>
      <Field
      name="playerName"
      type="text"
      parent={this}
      component={ renderField }
      label="Player Name *" />

      <Field
      name="screenNumber"
      type="text"
      component={ renderField }
      parent={this}
      label="Screen Number" />

      <Link
      to="#"
      className="btn btn-primary-trans btn-single "
      onClick={(evt)=>this.gotoAppSelection(evt)}>
      Make your content
      </Link>

      <img className="big-img"   src={appThumbnail}
      alt="242x200"/>
      <div className="btn-footer">
      <button
      type="submit"
      className="btn btn-primary"
      disabled={ submitting }> Save
      </button>
      <Link
      to="/workspace/dashboard"
      className="btn btn-danger-trans"> Cancel
      </Link>
      </div>
      </form>
      </div>;
    }
    return (
      <div className='container'>
      <Title title={"Update Player"}/>
      <Loading isLoading={activePlayer.loading}/>
      <Error error={error}/>
      {playerDetail}
      </div>
    )
  }
}


export default reduxForm({
  form: 'PlayerUpdate', // a unique identifier for this form
  validate,
  Field// <--- validation function given to redux-form
  //asyncValidate
})(PlayerUpdate)
