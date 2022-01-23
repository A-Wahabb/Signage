import React, { Component, PropTypes } from 'react';
import Scheduler from './scheduler-list/SchedulerListContainer.js';
import Search from './search/SearchContainer.js';
import moment from 'moment';
import {SchedulerData, ViewTypes,DATE_FORMAT, DemoData} from 'react-big-scheduler'
import ModalLocal from './modal-local';
import NewScheduleContainer from './new-schedule/NewScheduleContainer.js';
import NewScheduleEventContainer from './new-schedule-event/NewScheduleEventContainer.js';
import { PrimaryColor } from './../constants/Config';
import 'react-rrule-generator/build/styles.css';


class Schedules extends Component {
 
constructor() {
    super();

    this.state = {
            visible: false,
            modalOpen: false,
            selectedScheduleId: null,
            selectAll: false
        }
    this.isSelectView = false;
    this.isNewScheduler=false;
    this.isNewSchedulerEvent=false;
    this.newScheduleEventDetails=null;
    this.selectedSchedules =[];
    this.closeModal = this.closeModal.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.showNewScheduleEvent= this.showNewScheduleEvent.bind(this);
    this.scheduleList ={resources:[],events:[]};
    this.schedulesSelection= this.schedulesSelection.bind(this);
    this.showDeleteSelection= this.showDeleteSelection.bind(this);
    this.manageChecks = this.manageChecks.bind(this);
  }

  componentWillMount() {
   this.isSelectView =this.props.common.selectedConsole == 'SCHEDULES'? false:true;
   
  }
  componentDidMount(){
    let _self = this;
     setTimeout(function(){
    let datelable = document.getElementsByClassName('header2-text-label');
     if(datelable && datelable[0] && _self.props.user){
      console.log(datelable[0]);
     datelable[0].style.color=_self.props.user.config.settings.color_primary;
     }
     let selectedTb = document.getElementsByClassName('ant-radio-button-wrapper-checked');
     if(selectedTb && selectedTb[0] && _self.props.user){
      selectedTb[0].style.color = _self.props.user.config.settings.color_primary;
     }
   },500);
  }


closeModal(){

  this.setState({
      modalOpen: false
    });
  this.isNewScheduler=false;
  this.isNewScheduleEvent=false;
  this.newScheduleEventDetails=null;
  this.isDeletingSchedules = false;
}

showNewScheduleEvent(scheduleEventDetails){
    console.log(scheduleEventDetails);
    this.isNewScheduleEvent=true;
    if(scheduleEventDetails.id){
    let selectedEvent=  this.scheduleList.events.filter(event => event.id==scheduleEventDetails.id.split('-')[0]);
    selectedEvent= selectedEvent.length>0 ?selectedEvent[0]:{start:'20200401 02:00:00',end:'20200401 02:30:00'};
    scheduleEventDetails = selectedEvent;
    let selectedSechedule = this.scheduleList.resources.filter(schedule => {if(schedule.id == scheduleEventDetails.resourceId){
      return schedule;
    }});
    scheduleEventDetails.slotName = selectedSechedule[0].name;
    console.log(selectedSechedule);

    }
    this.newScheduleEventDetails = scheduleEventDetails;
    this.setState({
      modalOpen: true
    });

}


showNewSchedule(){
    this.isNewScheduler=true;
    this.setState({
      modalOpen: true
    });

}

showDeleteSelection(){
    this.isDeletingSchedules=true;
    this.setState({
      modalOpen: true
    });

}

renderNewEvent(){
  if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
}

renderCreateNew(){
    return (
    <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
      className="btn-primary-link" onClick={()=>this.showNewSchedule()} >
      <span  className="glyphicon glyphicon-plus inline-icon"></span>CREATE NEW SCHEDULE
      </button>
    );
    }

manageChecks(e,scheduleId){
 
      if( e && e.target.tagName.toLowerCase()=='span'){
             e.preventDefault();
        e.target.className=e.target.className=='uncheck-box'?'checked-box':'uncheck-box';
      
      }
      this.selectedSchedules.indexOf(scheduleId) != -1? this.selectedSchedules.splice(1,this.selectedSchedules.indexOf(scheduleId)):this.selectedSchedules.push(scheduleId);
        console.log(this.selectedSchedules);
        return true;
}

schedulesSelection(){
  let schedules =this.props.schedules.schedules.list?this.props.schedules.schedules.list.schedules:[];
  console.log('schuels', this.props.schedules);
  return(
            <div className='poplist'>
            <h3>{'SELECT SCHEDULES'}</h3>
         
           <ul className='small-select-list'>
              {schedules.map(schedule => 
              {
            
            return <li onClick={(e)=>this.manageChecks(e,schedule._id)}>
               <span className={this.selectedSchedules.indexOf(schedule._id) != -1?'checked-box':'uncheck-box'}>
               </span>
               <h4>{schedule.scheduleName}</h4>
            </li>
            
            })
             }
      
        </ul>
        <button
              to="#"
               style={{margin:'0px',marginRight:'10px',padding:'0px',}}
              className="btn-primary-link canel"
              onClick={(evt) => this.closeModal()}>
              {'CANCEL'}
            </button>
        <button
              to="#"
               style={{margin:'0px',marginRight:'10px',padding:'0px',color:PrimaryColor}}
              className="btn-primary-link"
              onClick={(evt) => (this.props.deleteSchedules(this.selectedSchedules),this.closeModal())}>
              {'DELETE SELECTED'}
            </button>
        
        </div>);
}

getModalContent(){

      if(this.isDeletingSchedules){
        return <div>{this.schedulesSelection()}</div>
      }
    
      else if(this.isNewScheduler){
        
        return (
            <div >
              <NewScheduleContainer 
                  closeModalPopup={this.closeModal}

              />
            </div>);
        }

      else if(this.isNewScheduleEvent){

        return (
            <div style={{display:'inline-block',height:'100%'}}>
                <NewScheduleEventContainer 
                  closeModalPopup={this.closeModal}
                  playlists={this.props.playlists}
                  appsList = {this.props.appsList}
                  newScheduleEventDetails={this.newScheduleEventDetails}
                />
            </div>);

      }
      else{
        return ("Content Not loaded properly, refresh page once!!");
      }

    }

getModalClass(){
    if(this.isNewScheduleEvent){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
    }
    else{
      return 'modal-local modal-default ';
    }
  }

setSelection(evt,schedule){
    this.setState({
      selectedScheduleId: schedule.id
    });
    if(schedule.id){
      let player = this.props.selectedPlayer;
      player.appId = schedule.id;
      player.orientation= "LANDSCAPE";
      player.contentType= 'SCHEDULE';
      this.props.publishToSreens([player]);
      this.props.closeModalPopup();
    }
}

renderSchedulesSelect(schedulesList){

  return (<div>
    {schedulesList.map(schedule =>(<div className={'col-sm-12 col-lg-4 col-md-6'} style={{padding:'10px',margin:'10px',background:'#96d0ca'}}>
        <span style={{fontSize:'1.5em',marginRight:'5px'}} className={'glyphicon glyphicon glyphicon-time'}></span>
        <span>{schedule.name}</span>
        <span className={this.state.selectedScheduleId == schedule.id?'checked-box selected-check':'uncheck-box select-check'} onClick={(e)=> (this.setSelection(e,schedule))}>
      </span>
      </div>)
      )
    }
    {schedulesList.length == 0 && <h3>No Schedules found, Please add one in menu -> schedule option</h3>}
    </div>
    )
}

render() {
  const {schedules} = this.props.schedules;
  this.scheduleList ={};
   
  this.scheduleList.resources=[];
  schedules.list.schedules.map(schedule => this.scheduleList.resources.push(
        {
           id: schedule._id,
           name: schedule.scheduleName
        }
  ));
  this.scheduleList.events=[];
  
  schedules.list.content.map( contentEvent =>  {
    let date = new Date(contentEvent.start+ ' UTC');
      let date2 = new Date(contentEvent.end+ ' UTC');
      let eventObj= {};
           eventObj.id= contentEvent._id;
           eventObj.title= contentEvent.contentName;
           eventObj.start= moment(date).format('YYYY-MM-DD HH[:]mm[:]ss');
           eventObj.end= moment(date2).format('YYYY-MM-DD HH[:]mm[:]ss');
           eventObj.resourceId= contentEvent.scheduleId;
           eventObj.slotId = contentEvent.scheduleId;
           eventObj.contentName= contentEvent.contentName;
           eventObj.contentType= contentEvent.contentType;
           eventObj.contentId= contentEvent.contentId;
           eventObj.isRecurring = contentEvent.isRecurring;
        if(contentEvent.isRecurring)
          {
            let local = moment(contentEvent.start).format('YYYYMMDD[T]HHmmss[Z]');
                eventObj.rrule = contentEvent.rrule;
                console.log('rrule before', eventObj.rrule);
                let rruleArr = eventObj.rrule.split(';');
                let rruleStr= rruleArr.filter(rule => (rule.indexOf('DTSTART') == -1)).join(';');
                eventObj.rrule =  rruleStr+';DTSTART='+ local;
                console.log('rrule finla', eventObj.rrule);
          }
     return this.scheduleList.events.push(eventObj);
   }
     );
  
  return (
   <div >
      { this.isSelectView ? 
        <h2 className="header-title" style={{marginLeft:'10px'}}>Select Schedule</h2>
        :
        <div className="title-container">
          <h2 className="header-title">Schedules</h2>
          <Search 
              changeConsole = {this.props.changeConsole} 
              onSearchChange = {this.onSearchChange}
            />
          <div className="search-bar">
            {true ?
            this.renderCreateNew():<span></span>}
          </div>
        </div>
      }


    <div className={this.isSelectView?"inner-container modal-big-scroll":"inner-container"}>
        
        {!this.isSelectView && <div><Scheduler 
            SchedulerData= {SchedulerData}
            ViewTypes= {ViewTypes}
            DemoData= {this.scheduleList}
            DATE_FORMAT= {DATE_FORMAT}
            showNewScheduleEvent= {this.showNewScheduleEvent}
            />
            <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px'}}
            className="btn-primary-link" 
            onClick={e => this.showDeleteSelection()}>
              DELETE
            </button>
            </div>
          }
           
        {this.isSelectView && this.renderSchedulesSelect(this.scheduleList.resources)}
    </div>

       <ModalLocal  className={this.getModalClass()} isOpen={this.state.modalOpen} >
         {this.state.modalOpen?this.getModalContent():''}
         <span  style={{position:'fixed',top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" 
         onClick={(e) => this.closeModal(e)} >
         </span>
      </ModalLocal>

    </div>
  )
}
}


export default Schedules
