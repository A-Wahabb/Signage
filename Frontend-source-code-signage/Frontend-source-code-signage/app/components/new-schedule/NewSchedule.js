import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER, PrimaryColor} from '../../constants/Config';

class NewSchedule extends Component {

  constructor (props) {
    super(props);
    this.state={
      scheduleName:'',
      errors:null
    }
  }

  componentWillMount(){
    this.props.resetMe();
  }

   componentDidUpdate(prevProps){
      
    if(prevProps.newSchedule.loading && !this.props.newSchedule.loading){
        this.props.closeModalPopup();
      }

  }

  validateAndSaveSchedule(){
  if(this.isInputsValid()){
    console.log('save');
    let newSchedulerObj= {
      scheduleName: this.state.scheduleName,
     
    };
    this.props.saveSchedule(newSchedulerObj);
  }
}

//Client side validation
isInputsValid() {
  let errors={};
  
  if (!this.state.scheduleName || this.state.scheduleName.trim() === '') {
    errors.scheduleName = '* Enter a schedule name';
  }
  errors = Object.getOwnPropertyNames(errors).length == 0 ? null: errors
  this.setState({
    errors: errors
  });
  return !errors?true:false;
}

updateInput(e){
  console.log(e.target.name);
    if(e.target.name =='scheduleName'){
    this.setState({
      scheduleName : e.target.value,
      errors: null
    });
  }
}

render() {

  var  scheduleDetail=
  (<div className="col-sm-12 col-md-12 col-lg-12">
      <label style={{marginBottom:'0px',color:'#6f6f6f'}} htmlFor='playerName'>Schedule Name *</label>
      <input
        name="scheduleName"
        type="text"
        placeholder = "Enter schedule name"
        defaultValue= {this.state.scheduleName}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.scheduleName?"effect-16 has-error":"effect-16"}
        />
    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.scheduleName?this.state.errors.scheduleName:""}</span>
    
    <div className="btn-footer">
      <button
      onClick={ e => this.props.closeModalPopup() }
      className="btn-primary-link"
      style={{paddingRight:'10px'}}
      > CANCEL
      </button>
      <button
      onClick={ e => this.validateAndSaveSchedule() }
      className="btn btn-primary "
      disabled={!this.state.scheduleName || this.state.errors}> SAVE
      </button>
    </div>
 
  </div>);

  return (<div>
      <div className='col-lg-12 col-md-12 col-sm-12'>
      <Title title={'NEW SCHEDULE'}/>
      {scheduleDetail}
      </div>
      </div>)
  }
}


export default NewSchedule;
