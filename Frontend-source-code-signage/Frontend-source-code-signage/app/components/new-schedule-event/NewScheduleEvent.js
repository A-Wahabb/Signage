import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import { validatePlayerFields, validatePlayerFieldsSuccess, validatePlayerFieldsFailure } from '../../actions/posts';
import { confirmAlert } from 'react-confirm-alert';
import 'react-rrule-generator/build/styles.css';
import RRuleGenerator from 'react-rrule-generator';//recurring rule
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';
import DLDateTime from '../renderDateTime';
import moment from 'moment';

class NewScheduleEvent extends Component {

  constructor (props) {
    super(props);
    this.state={
      webpageLink:'',
      streamLink:'',
      errors:null,
      rrule: 'FREQ=HOURLY;INTERVAL=1',
      isCopied: false,
      language: 'en',
      contentType:'PLAYLIST',
      contentName: 'Select...',
      contentId:"",
      isRecurring: false,
      startDateTime: this.props.newScheduleEventDetails.start,
      endDateTime: this.props.newScheduleEventDetails.end
    };
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.isEditView=this.props.newScheduleEventDetails.id?true:false;
  }

  componentWillMount(){
    //this.props.resetMe();
  }
  componentDidMount(){
    if(this.isEditView){
      let removeDstart="FREQ=HOURLY;INTERVAL=1";
      if(this.props.newScheduleEventDetails.isRecurring){
      let removeDstart=this.props.newScheduleEventDetails.rrule;
      removeDstart = removeDstart.split(';').filter(prop => prop.indexOf('DTSTART') == -1).join(';');
      console.log('edit remove start', removeDstart);
      }

      this.setState({
        contentName: this.props.newScheduleEventDetails.contentName,
        contentType: this.props.newScheduleEventDetails.contentType,
        contentId: this.props.newScheduleEventDetails.contentId,
        isRecurring: this.props.newScheduleEventDetails.isRecurring?true:false,
        rrule:removeDstart,
        webpageLink: this.props.newScheduleEventDetails.contentType=='WEBPAGE'?this.props.newScheduleEventDetails.contentName:'',
        streamLink: this.props.newScheduleEventDetails.contentType=='STREAM'?this.props.newScheduleEventDetails.contentName:''
      })
    }
    this.validateData(this.state);
  }

  componentDidUpdate(prevProps, prevState){
      
      if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
        this.validateData(this.state);
      }
      
  }

validateData(stateData){
  let err ="";
  console.log('final even',stateData);
  if((stateData.contentType == 'PLAYLIST' || stateData.contentType == 'TEMPLATE')  && !stateData.contentId){
        err= "Please select or add a playlist/template";
  }else if(stateData.contentType == 'WEBPAGE' && (!stateData.webpageLink || !stateData.webpageLink.startsWith('http'))){
        
        err= "Please input valid webpage address";
          
      }
    else if(stateData.contentType == 'WEBPAGE' && (!stateData.webpageLink || !stateData.webpageLink.startsWith('http'))){
        
        err= "Please input valid webpage address";
          
      }
      else if(stateData.contentType == 'STREAM' && (!stateData.streamLink)){
        
        err= "Please input valid stream address";
          
      }
      else if(moment(stateData.startDateTime).isAfter(stateData.endDateTime)){
        
        err= "Start Date should be before end date";
          
      }
      else{
        err = null;
      }

    this.setState({
            errors: err
          });

}

setContent(content){
  this.setState({
      contentName : this.state.contentType=='PLAYLIST'?content.playlistName:content.appName,
      contentId: content._id
  });
}

updateEndDate(date){
  console.log(date);
  this.setState({
    endDateTime : date
  });
}

updateStartDate(date){
    this.setState({
    startDateTime : date
  });
}

validateAndSaveScheduleContent(){
  this.validateData(this.state);
  if(!this.state.errors){
     let start= moment(this.state.startDateTime).utc().format('YYYY-MM-DD HH:mm:ss');
     let end = moment(this.state.endDateTime).utc().format('YYYY-MM-DD HH:mm:ss');
     

    let scheduleContent= {
      start: start,
      end: end,
      scheduleId: this.props.newScheduleEventDetails.slotId,
      title : (this.state.contentId && this.state.contentName) || this.state.webpageLink || this.state.streamLink,
      bgColor: '#4dbdb3',
      contentType: this.state.contentType,
      isRecurring: this.state.isRecurring,
      contentId: this.state.contentId || this.state.webpageLink || this.state.streamLink
    };
    if(this.isEditView){
      scheduleContent._id = this.props.newScheduleEventDetails.id.split('-')[0];
    }
     //rrule: 'FREQ=WEEKLY;DTSTART=20200901T013000Z;UNTIL=20201101T033000Z;BYDAY=TU,FR',
   
    
    let rrule = this.state.rrule;
    //rrule += ";DTSTART="+start;
    //rrule += ";UNTIL="+moment.utc(this.state.endDateTime);// end time for schedule. if not set, it will keep looping
    if(this.state.isRecurring){
      scheduleContent.rrule = rrule;
     
    }
     console.log('final saving event', scheduleContent);
    if(this.isEditView){
      this.props.updateScheduleContent(scheduleContent);
    }else{
    this.props.saveScheduleContent(scheduleContent);
    }
    this.props.closeModalPopup();
  }

}

updateInput(e){
  console.log(e.target.name);
    this.setState({
      webpageLink : e.target.value,
      contentName: e.target.value,
      contentId: e.target.value
    });
}

updateStream(e){
    this.setState({
      streamLink : e.target.value
    });
}

setContentType(contentType){
      if(this.state.contentType !== contentType){
      this.setState({
        contentType: contentType,
        contentId: null,
        contentName: "Select..",
        webpageLink:'',
        streamLink:''
      });
      }
    }

toggleRecurring(){
  this.setState({
    isRecurring: !this.state.isRecurring
  });
}

handleChange (newRRule) {
    console.log('New rule', newRRule);
    this.setState({ rrule: newRRule, isCopied: false });
  };

getPlaylist(playlistArr){
 return(<div style={{marginLeft:'20px',display:'inline-block',borderBottom:'none'}}>
        <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
          <Dropdown.Toggle title={this.state.contentName} />
          <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {
              playlistArr.map(playlist => (
                <MenuItem onClick={()=>this.setContent(playlist)}>
              <span>{playlist.playlistName}</span>
            </MenuItem>))
          }
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
      </div>);
}

getTemplates(listArr){
    return(<div style={{marginLeft:'20px',display:'inline-block',borderBottom:'none'}} >
      
        <span className='menu-arrow glyphicon '>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.state.contentName} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            {listArr.filter(template => !template.isTemplate).map(template => (<MenuItem onClick={()=>this.setContent(template)}>
              <span>{template.appName}</span>
            </MenuItem>))
          }
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
      </div>);
}


render() {
  console.log(this.props);
  console.log(this.state.startDateTime);
  var  scheduleItemDetail=
  (<div className="col-sm-12 col-md-12 col-lg-12" style={{fontSize:'1.3em',height:'calc(100% - 120px)',display:'inline-block',overflow:'hidden scroll'}}>
      <div style={{display:'inline-block',width:'100%',marginBottom:'10px'}}>
      <label style={{marginBottom:'0px',color:'#6f6f6f'}} >*</label>
      <div style={{marginLeft:'10px',display:'inline-block',borderBottom:'none'}}  >
        <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.state.contentType} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={(e)=>{this.setContentType('PLAYLIST')}}>
              <span>PLAYLIST</span>
            </MenuItem>
          <MenuItem onClick={(e)=>{this.setContentType('TEMPLATE')}}>
              <span>TEMPLATE</span>
            </MenuItem>
          <MenuItem  onClick={(e)=>{this.setContentType('WEBPAGE')}}>
              <span>WEB PAGE</span>
            </MenuItem>
          <MenuItem  onClick={(e)=>{this.setContentType('STREAM')}}>
              <span>STREAM</span>
            </MenuItem>
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
      </div>

       {this.state.contentType.toLowerCase()== 'playlist' && this.getPlaylist(this.props.playlists)}
       {this.state.contentType.toLowerCase()== 'template' && this.getTemplates(this.props.appsList)}
       {this.state.contentType.toLowerCase()== 'webpage' && 
          <input
            name="webpageLink"
            type="text"
            placeholder = "Enter webpage link"
            defaultValue= {this.state.webpageLink}
            onChange={e=>this.updateInput(e)}
            className={this.state.errors&&this.state.errors.webpageLink?"effect-16 has-error":"effect-16"}
            />
        }
        {this.state.contentType.toLowerCase()== 'stream' && 
          <input
            name="streamLink"
            type="text"
            placeholder = "Enter streaming link"
            defaultValue= {this.state.streamLink}
            onChange={e=>this.updateStream(e)}
            className={"effect-16"}
            />
        }
    </div>
    
    <div style={{margin:'10px 0px',display:'inline-block', width:'100%'}}>
    <div className={'col-lg-6 col-sm-12 col-md-6'} style={{paddingLeft:'0px'}}><span style={{fontWeight:'bold'}}>Start Time <span style={{fontWeight:'normal',fontSize:'0.6em',color:'#009688'}}>( yyyy mmm dd, hh:ss )</span></span>
        <DLDateTime dateTime={this.state.startDateTime} updateDate={this.updateStartDate}/>
      </div>
     <div className={'col-lg-6 col-sm-12 col-md-6'} style={{paddingLeft:'0px'}}><span style={{fontWeight:'bold'}}>End Time</span>
        <DLDateTime dateTime={this.state.endDateTime} updateDate={this.updateEndDate}/>
      </div>
    </div>

    <div className="check-small-container" style={{color:'#6f6f6f',margin:'10px 0px'}}   onClick={()=> this.toggleRecurring()}>
      <span style={{marginLeft:'0px'}} className={this.state.isRecurring?'checked-box':'uncheck-box'}>
       </span>
       <span style={{marginLeft:'5px',color: '#6d6d6d'}} className='lbl-check' > Repeat
       </span>
    </div>

    {this.state.isRecurring && <div style={{marginTop:'10px'}}>
    <RRuleGenerator
        onChange={(rrule) => this.handleChange(rrule)}
        value={this.state.rrule}
        config={{
          repeat: ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly'],
          yearly: 'on',//second option is 'on the'
          monthly: 'on',//second option is 'on the'
          weekStartsOnSunday: true,
          hideError: true,
          hideEnd: true
        }}

    /></div> }

    
 
  </div>);


  
  return (<div style={{height:'100%', display:'inline-block'}}>
      <div className='col-lg-12 col-md-12 col-sm-12 schedule-details' style={{height:'100%'}} >
          <Title title={'SCHEDULER - ADD CONTENT FOR - '+this.props.newScheduleEventDetails.slotName}/>
          {scheduleItemDetail}
      </div>
      <div className="btn-footer" style={{position: 'absolute',bottom: '0px',right: '20px'}}>
      <span style={{color:'red',marginRight:'20px'}}>{this.state.errors && this.state.errors} </span>
      <button
          onClick={ e => this.validateAndSaveScheduleContent() }
          className="btn btn-primary "
          disabled={this.state.errors}> SAVE
      </button>
    </div>
      </div>);
}
}


export default NewScheduleEvent;

/*if want to show start / end date with recurring event add below with config
//  hideStart:false,
//hideEnd: false
//          end: ['Never', 'On date'],*/
