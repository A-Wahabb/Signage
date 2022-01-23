import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs'
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import ModalLocal from './modal-local';
import ReactTooltip from 'react-tooltip';
//import _ from 'lodash';
class CustomerAv extends Component {

  constructor(){
    super();
    this.state = {isNewTrans:false,actionTransId:null,isNewProp:false,actionPropId:null,isNewAgent:false,isNewEvent:false,actionEventId:null,actionAgentId:null};
    this.dealsStatus =['ACTIVE','PENDING','SOLD'];
    this.office_id=null;
    this.allDeals=[];
    this.allProps=[];
    this.setNewProp = this.setNewProp.bind(this);
    this.dealUpdate = this.dealUpdate.bind(this);
    this.checkFeatureChanged = this.checkFeatureChanged.bind(this);
    this.confirm = this.confirm.bind(this);
    this.checkAoMChanged = this.checkAoMChanged.bind(this);
    this.renderSelectOptions = this.renderSelectOptions.bind(this);
  }
  componentWillMount() {
    console.log('-- Users will mount--', this.props);
    var userId = this.props.user.user._id;
    this.props.resetMe();
    if (userId){
      this.props.fetchOfficeId(this.props.user.user.address.toLowerCase());
      this.props.fetchAgents();
      this.props.fetchCities();

      //this.props.fetchDeals(this.props.user.user.address);

    }
  }

  fetchProperties(){
    if(this.props.trans.city && this.props.trans.city.details&& (this.props.trans.city.details !== prevProps.trans.city.details)){
  
}
  }

componentDidUpdate(prevProps, prevState){
console.log('did update called');
if(!prevProps.trans.office.details && this.props.trans.office.details && this.props.trans.office.details.office_name){
  console.log('fetching deals');
  
  this.office_id =this.props.trans.office.details.office_id;
  console.log(this.office_id);
    this.props.fetchDeals(this.props.trans.office.details.office_id);
    this.props.fetchPros(this.props.trans.office.details.city_id);
    this.props.fetchEvents(this.props.trans.office.details.office_id);
 
}


}

confirm= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        // Title dialog
        message: 'Do you want to delete template -'+param.appName+'?',               // Message dialog
        childrenElement: () => <div></div>,       // Custom UI or Component
        confirmLabel: 'Remove',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => this.props.removingApp(param),    // Action after Confirm
        onCancel: () => console.log("Cancelled delete")     // Action after Cancel
      })
    };

dealUpdate(e,updateObj){
console.log('status udpate',this.dealsStatus[e.target.selectedIndex] +'-'+ e.target.name);
let editDealObj = this.allDeals.filter(deal=> deal.deal_id == e.target.name);

let finalUpdate=updateObj?updateObj:{deal_id:e.target.name, deal_status:this.dealsStatus[e.target.selectedIndex],agent_id:editDealObj[0].agent_id,prop_id:editDealObj[0].prop_id};

this.props.updateDeal(finalUpdate,this.props.trans.office.details.office_id);
}

checkFeatureChanged(e,rowDataId){
  console.log(rowDataId);
  let editPropObj= this.props.trans.deals.list.filter(deal => deal.prop_id==rowDataId);
  editPropObj=editPropObj[0];
  editPropObj.is_featured_listing= editPropObj.is_featured_listing?0:1;
  editPropObj.city_id= editPropObj.city_id instanceof Array?editPropObj.city_id[0]:editPropObj.city_id;
  console.log(editPropObj.city_id);

  editPropObj.original_price=Number(editPropObj.original_price).toFixed(4)
  editPropObj.current_price= Number(editPropObj.current_price).toFixed(4);
  editPropObj.bedrooms= Number(editPropObj.bedrooms).toFixed(1);
  editPropObj.baths= Number(editPropObj.baths).toFixed(1);
  editPropObj.sqr_feet= parseInt(editPropObj.sqr_feet);
  editPropObj.buyers_age_commision=1.20;

  this.props.updateProperty(editPropObj,this.props.trans.office.details.office_id);
}

checkAoMChanged(e,rowDataId){
  console.log(rowDataId);
  
 let editAgentObj= this.props.trans.agents.list.filter(agent => agent.agent_id==rowDataId);
  editAgentObj=editAgentObj[0];
  editAgentObj.is_agent_of_the_month= editAgentObj.is_agent_of_the_month?0:1;

 // let isAoM= document.getElementById('check-aom').value=='false'?0:1;
  
console.log(editAgentObj);
  this.props.updateAgent(editAgentObj);
}
      
renderSelectOptions = (text,val) => (
        <option value={val}>{text}</option>
      )
    
getSelectComponent(selectedItem, rowDataId){
console.log(selectedItem);
return  <select name={rowDataId} defaultValue={selectedItem} className='has-content' onChange={e=>this.dealUpdate(e)}>
          {this.dealsStatus.map((option)=>this.renderSelectOptions(option))}
        </select>
     
}


getCheckComponent(selectedItem, rowDataId){
        
        return  <input type="checkbox" value={selectedItem} name={rowDataId} checked={selectedItem} onChange={e=>this.checkFeatureChanged(e,rowDataId)}/> ;
   
}
getCheckAgentMonth(selectedItem, rowDataId){
        //console.log(selectedItem);
        return  <input type="checkbox" id='check-aom' name={rowDataId} checked={selectedItem} onChange={e=>this.checkAoMChanged(e,rowDataId)}/> ;
   
}

setEventDefaultThumb(evt,office_id){
    evt.target.src= BASE_SERVER+'/preview/customers/av/events/no-event-thumb.jpg';
  
  }

setDefaultThumb(evt){
    evt.target.src= BASE_SERVER+'/preview/customers/av/agents/no-agent-thumb.jpg';
  
  }

setPropDefaultThumb(evt){
    evt.target.src= BASE_SERVER+'/preview/customers/av/properties/home-default.jpg';
  
  }

renderPropSnap(imgName){
let imgpath= BASE_SERVER+'/preview/customers/av/properties/'+imgName;
return <img src={imgpath} onError={evt => this.setPropDefaultThumb(evt)} style={{width:'150px',height:'120px'}}/>
}

renderAgentDP(imgName){
let imgpath= BASE_SERVER+'/preview/customers/av/agents/'+imgName;
return <img src={imgpath} onError={evt => this.setDefaultThumb(evt)} style={{width:'100px',height:'120px'}}/>
}

renderEventPromo(imgName,office_id){
let imgpath= BASE_SERVER+'/preview/customers/av/events/'+imgName;
return <img src={imgpath} onError={evt => this.setEventDefaultThumb(evt,office_id)} style={{width:'100px',height:'120px'}}/>
}

_head(heads) {
    var columns = _.map(heads, function(colName, colKey) {
      return (
        <th>{colName}</th>
      );
    });
    return (
      <tr>{columns}</tr>
    );
  }
  
_rows(rows,cols) {
    var _this = this;
    return rows.map(function(row) {
      var values = _.map(cols, function(colName, colKey) {
        return (
          <td data-label={colName}>{row[colKey]}</td>
        );
      })
      return (
        <tr>{values}</tr>
      );
    })
  }

removeDeals(e,dealId,office_id){
   console.log(office_id);
   this.props.deleteDealById(dealId,office_id);
  
  }

removeProp(e,propId,office_id){
   console.log(propId);
   this.props.deletePropById(propId,office_id);
  
  }

removeAgent(e,agentId,office_id){
   console.log(agentId);
   this.props.deleteAgentById(agentId,office_id);
  
  }

  removeEvent(e,eventId,office_id){
   this.props.deleteEventById(eventId,office_id);
  
  }

actionTransRender(trnsId,office_id){
  
return <div style={{width:'110px'}}><span  className="glyphicon glyphicon-pencil" onClick={(evt)=>{this.setNewTrans(evt,trnsId)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.removeDeals(evt,trnsId,office_id)}} ></span></div>
}


actionPropsRender(propId,office_id){
  
return <div style={{width:'110px'}}><span  className="glyphicon glyphicon-pencil" onClick={(evt)=>{this.setNewProp(evt,propId)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.removeProp(evt,propId,office_id)}} ></span></div>
}

actionAgentRender(agentId,office_id){
  
return <div style={{width:'110px'}}><span  className="glyphicon glyphicon-pencil" onClick={(evt)=>{this.setNewAgent(evt,agentId)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.removeAgent(evt,agentId,office_id)}} ></span></div>
}

actionEventRender(eventId,office_id){
  
return <div style={{width:'110px'}}><span  className="glyphicon glyphicon-pencil" onClick={(evt)=>{this.setNewEvent(evt,eventId)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.removeEvent(evt,eventId,office_id)}} ></span></div>
}

renderAllDeals(list) {
    
        var cols = {

       prop_id:'#Prop Id',
       a_photo_path: 'Agent DP',
      agent_name: 'Agent Name',
      photo_path:'Prop Snap',
      address: 'Property Address',
      deal_status: 'Status',
      action:'Actions'
      }
    let listNew= JSON.parse(JSON.stringify(list));
    let listUpdate = listNew.map(item => { 
      item.deal_status= typeof(item.deal_status)=='string'? this.getSelectComponent(item.deal_status,item.deal_id):item.deal_status;

      item.a_photo_path= item.a_photo_path= typeof(item.a_photo_path)=='string' || !item.a_photo_path?this.renderAgentDP(item.a_photo_path):item.a_photo_path;
      item.photo_path= item.photo_path= typeof(item.photo_path)=='string' || !item.photo_path?this.renderPropSnap(item.photo_path):item.photo_path;
      item.action = this.actionTransRender(item.deal_id,this.props.trans.office.details.office_id);
      return item;
    });
    let dealsTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(listUpdate,cols)}
        </tbody>
      </table>;
    return dealsTbl;
  }


renderAllProperties(list){
   console.log('properties list', list);
   var cols = {
       prop_id:'#',
      photo_path: 'Snapshot',
      address: 'Property Address',
      original_price: 'Original Price',
      current_price: 'Current Price',
      bedrooms: 'Bedrooms',
      baths: 'Baths',
      sqr_feet: 'Sqr Feet',
      listing_date:'Listing From',
      is_featured_listing:'Featured',
      action:'Actions'
    };
    let listNew= JSON.parse(JSON.stringify(list));
    let list_update = listNew.map(item => { item.is_featured_listing= this.getCheckComponent(item.is_featured_listing,item.prop_id);

      item.photo_path= typeof(item.photo_path)=='string' || !item.photo_path?this.renderPropSnap(item.photo_path):item.photo_path;
      item.original_price= item.original_price && item.original_price.toString().startsWith('$')?item.original_price : '$'+item.original_price;
      item.current_price= item.original_price && item.current_price.toString().startsWith('$') ? item.current_price : '$'+item.current_price;
      item.listing_date = this.daysDiff(new Date().getTime(),new Date(item.listing_date).getTime());
      item.action = this.actionPropsRender(item.prop_id,this.props.trans.office.details.office_id);
      return item;
    });
    let prosTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(list_update,cols)}
        </tbody>
      </table>;
    return prosTbl;
}
daysDiff(timestamp1, timestamp2) {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference/1000/60/60/24);
    return daysDifference+'d';
}

renderAgentsListTbl(list){
  var cols = {
      agent_id:"#Id",
      a_photo_path: 'Profile Pic',
      agent_name: 'Agent Name',
      is_agent_of_the_month: 'Agent Of The Month',
      action:'Actions'
    };
    let officeId=this.props.trans.office.details&&this.props.trans.office.details.office_id?this.props.trans.office.details.office_id:null
    let listCln= JSON.parse(JSON.stringify(list));
    let listNew= listCln.filter(row=>row.office_id===officeId);
    let list_update = listNew.map(item => { item.is_agent_of_the_month= this.getCheckAgentMonth(item.is_agent_of_the_month,item.agent_id);

      item.a_photo_path= typeof(item.a_photo_path)=='string' || !item.a_photo_path?this.renderAgentDP(item.a_photo_path):item.a_photo_path;
    item.action = this.actionAgentRender(item.agent_id,this.props.trans.office.details.office_id);
      return item;
    });
    let agentTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(list_update,cols)}
        </tbody>
      </table>;
    return agentTbl;
}

renderEventsListTbl(list){
  var cols = {
      event_photo: 'Promo',
      event_name: 'Event Title',
      event_info: 'Details',
      event_date: 'Date and time',
      action:'Actions'
    };
    let listCln= list?JSON.parse(JSON.stringify(list)):[];
    let listNew= listCln.filter(row=>row.office_id===this.props.trans.office.details.office_id);
    let list_update = listNew.map(item => { 

      item.event_photo= typeof(item.event_photo)=='string' || !item.event_photo?this.renderEventPromo(item.event_photo,this.props.trans.office.details.office_id):item.event_photo;
    item.action = this.actionEventRender(item.event_id,this.props.trans.office.details.office_id);
    item.event_date= item.event_date.indexOf('T')!==-1? item.event_date.replace('T', " "):"";
      return item;
    });
    let eventsTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(list_update,cols)}
        </tbody>
      </table>;
    return eventsTbl;
}
  
  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  setNewEvent(evt,eventId){
    console.log(eventId);
    
    this.setState({isNewEvent:true,actionEventId:eventId?eventId:null});

    window.scrollTop=0;
  }

  setNewTrans(evt,transId){
    console.log(transId);
    
    this.setState({isNewTrans:true,actionTransId:(transId?transId:null)});

    window.scrollTop=0;
  }

  setNewProp(evt,propId){
    console.log('set prop id', propId);
    this.setState({isNewProp:true,actionPropId:(propId?propId:null)});
     window.scrollTop=0;
  }
  setNewAgent(evt,agentId){
    this.setState({isNewAgent:true, actionAgentId:(agentId?agentId:null)});
  }
closeSaving(evt){
   this.setState({isNewTrans:false,
    isNewProp:false,isNewAgent:false,actionTransId:null,actionPropId:null,isNewEvent:false,actionEventId:null,actionAgentId:null});
}

saveNewAgent(evt,editObj){
  let agentId =document.getElementById('agent_id-ip').value;
  let pic = document.getElementById('agent_pic').files[0];
  let agentName= document.getElementById('agent_name-ip').value;
  let office_id= this.props.trans.office.details.office_id;
  let isAgentOftheMonth= 0;

  if(!editObj){
this.props.addNewAgent({agent_id:agentId,a_photo_path:pic, agent_name:agentName,office_id:office_id,is_agent_of_the_month:isAgentOftheMonth},'/agents');
}
else{

  pic && pic.name && this.props.uploadImg(pic,'/agents');
  let picName= pic && pic.name? this.getProperImageName(pic) : editObj.a_photo_path;     
  this.props.updateAgent({agent_id:agentId,a_photo_path:picName, agent_name:agentName,office_id:office_id,is_agent_of_the_month:isAgentOftheMonth},'/agents');
   this.closeSaving();
}

}

saveNewEvent(evt,editObj){
  
  let eventName =document.getElementById('event_name-ip').value;
  let eventDesc =document.getElementById('event_desc-ip').value;
  let pic = document.getElementById('event_pic').files[0];
  let eventDate= document.getElementById('event_date').value;
  let offId=this.props.trans.office.details.office_id

  if(!editObj){
    let eventId= Math.floor(Math.random() * Math.floor(9999999992222));
  this.props.addNewEvent({event_id:eventId,event_name:eventName, event_info:eventDesc,event_photo:pic, event_date:eventDate, office_id:offId},'/events',this.props.trans.office.details.office_id);
    } 
    else{
      pic && pic.name && this.props.uploadImg(pic,'/events');
    let picName= pic && pic.name? this.getProperImageName(pic) : editObj.event_photo;
    this.props.updateEvent({event_id:editObj.event_id,event_name:eventName, event_info:eventDesc,event_photo:picName, event_date:eventDate, office_id:offId}, this.props.trans.office.details.office_id);
    this.closeSaving();  
    }

}

renderNewEvent(e,editEventId){
    let editEventObj=null;
    if(editEventId){
      editEventObj = this.props.trans.events.list.filter(event => editEventId == event.event_id );
    editEventObj =editEventObj[0];
    }

    return <div className='sub-section'><h3>{"New Event Details:"}</h3>

  <ul>
    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Event Title : "}</div><input type='text' id='event_name-ip' defaultValue={editEventObj?editEventObj.event_name:""} placeholder={"Event Name"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Event Description : "}</div><input type='text' id='event_desc-ip' defaultValue={editEventObj?editEventObj.event_info:""} placeholder={"Event Details"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Event Photo: "}</div><input type='file' id='event_pic'/></li>


  <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Event Time : "}</div><input type='datetime-local' defaultValue={editEventObj? editEventObj.event_date:new Date().toISOString().substr(0, 19)} min="2000-06-07T00:00" max="2040-06-14T00:00" id='event_date'/></li>
   

 <li className='col-xs-12 col-md-12 col-lg-12'><input  type={'button'} onClick={(e)=>this.saveNewEvent(e,editEventObj)} defaultValue={'Save'} /><input  type={'button'} onClick={(e)=>this.closeSaving(e)} defaultValue={'Cancel'} /></li>
 </ul>
    </div>
  }


saveNewTrans(evt,editID){
  let agentId = document.getElementById('trans-agent').value;
  let propId= document.getElementById('trans-prop').value;
  let status= document.getElementById('trans-status').value;
  let transId= Math.floor(Math.random() * Math.floor(9999999992222));
  let office_id=this.props.trans.office.details.office_id;
 let dealObj={deal_id:transId, deal_status:status,agent_id:agentId, prop_id:propId, office_id:office_id};
 console.log('final tarns saving',dealObj);
 if(!editID){
this.props.addTransDeal(dealObj,office_id);
}else{
  dealObj.deal_id=editID;
  this.props.updateDeal(dealObj,this.props.trans.office.details.office_id);
}
this.closeSaving();
}

getProperImageName(imgFile){
let imgNm=imgFile.name?imgFile.name.substr(0, imgFile.name.lastIndexOf(".")).replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '_')+'.'+imgFile.type.split('/')[1]:"";
return imgNm;
}

saveNewProp(evt,editPropId){
  evt.preventDefault();
  
  let propId=document.getElementById('prop_input_id').value;
  
  let propPic= document.getElementById('prop_pic').files[0];
  
  let featurePic =document.getElementById('prop_pic_feature').files[0];
  let propAdd = document.getElementById('prop_input_addr').value;
  let propOrgPrc = document.getElementById('prop_ip_org_price').value;
  let propCurPrc = document.getElementById('prop_ip_cur_price').value; 
  let propBedroom = document.getElementById('prop_ip_bedroom').value;
  let propBathroom = document.getElementById('prop_ip_bath').value;
  let propSqrFt = document.getElementById('prop_ip_sf').value;
  let propIsFeatured =  document.getElementById('prop_cb_feature').value=='false'?0:1;
  let dol=document.getElementById('prop_cb_dol').value;
  let propCityId = document.getElementById('cities_sel').value;

let propObj = {
  prop_id: propId,
  address: propAdd,
  original_price:Number(propOrgPrc).toFixed(4),
  current_price: Number(propCurPrc).toFixed(4),
  bedrooms: Number(propBedroom).toFixed(1),
  baths: Number(propBathroom).toFixed(1),
  sqr_feet: parseInt(propSqrFt),
  buyers_age_commision:1.20,
  is_featured_listing: propIsFeatured,
  photo_path: propPic&&propPic.name?this.getProperImageName(propPic):"",
  featured_photo_path: featurePic&&featurePic.name?this.getProperImageName(featurePic):"",
  listing_date: dol,
  city_id:parseInt(propCityId)

};

console.log('final saving', propObj);

    if(editPropId){
        propObj.photo_path && this.props.uploadImg(propPic,'/properties');
        propObj.featured_photo_path && this.props.uploadImg(featurePic,'/featured');

        let oldPropObj= this.allDeals.filter(deal=>deal.prop_id === editPropId);
        propObj.photo_path=!propObj.photo_path?oldPropObj[0].photo_path:propObj.photo_path;
        propObj.featured_photo_path=!propObj.featured_photo_path?oldPropObj[0].featured_photo_path:propObj.featured_photo_path;
        propObj.prop_id = editPropId;
      this.props.updateProperty(propObj,this.props.trans.office.details.office_id);
      this.closeSaving();
    }
    else{
      this.props.saveProperty(propObj);
      propPic.name && this.props.uploadImg(propPic,'/properties');
      featurePic.name && this.props.uploadImg(featurePic,'/featured');
    }


}


renderSelectOptionsWthImg = (text,val) => {
       return <option  value={val}>{text}</option>;
}


  renderAgentsList(selectedItem,agents){
      let officaAgents = agents.filter(agnt => agnt.office_id== this.props.trans.office.details.office_id);
      return  <select id='trans-agent' defaultValue={selectedItem} className='has-content' >
      <option value='0'>{"Select An Agent"}</option>
          {officaAgents.map((option)=>this.renderSelectOptionsWthImg( option.agent_name,option.agent_id,option.a_photo_path))}
        </select>
     
}

 renderProperties(selectedItem,properties){
 
      return  <select id='trans-prop' defaultValue={selectedItem} className='has-content' >
      <option value='0'>{"Select Property"}</option>
          {properties.map((option)=>this.renderSelectOptions(option.address, option.prop_id))}
        </select>
     
}



renderStatus(selectedItem,statusArr){
   return  <select id='trans-status' defaultValue={selectedItem} className='has-content' >
          {statusArr.map((option)=>this.renderSelectOptions(option,option))}
        </select>
}

renderCities(cities,selectedItem){
   return  <select id='cities_sel' defaultValue={selectedItem?selectedItem:0} className='has-content' >
          {cities.map((option)=>this.renderSelectOptions(option.city_name, option.city_id ))}
        </select>
}

  renderAddNewTrans(trans,transId){
    var editTrans={};
    if(transId){
    editTrans = trans.deals.list.filter(deal => deal.deal_id==transId);
    editTrans = editTrans[0];
    this.allProps.push({prop_id:editTrans.prop_id,address:editTrans.address});
    console.log('editig',editTrans);
    }
    return <div className='sub-section'><h3>{transId?"Edit Transaction":"Add new Transaction"}</h3>

    <ul>

    <li className='col-xs-12 col-md-6 col-lg-6'>{"Select An Agent: "}{this.renderAgentsList(transId?editTrans.agent_id:0, trans.agents.list)}</li>

      <li className='col-xs-12 col-md-6 col-lg-6'>{"Select Property: "}{this.renderProperties(transId?editTrans.prop_id:0,this.allProps)}</li>

      <li className='col-xs-12 col-md-6 col-lg-6'>{"Current Status : "}{this.renderStatus(transId?editTrans.deal_status:0,this.dealsStatus)}</li>

      <li className='col-xs-12 col-md-12 col-lg-12'><input  type={'button'} onClick={(e)=>this.saveNewTrans(e,transId)} defaultValue={'Save'} /><input  type={'button'} onClick={(e)=>this.closeSaving(e)} defaultValue={'Cancel'} /></li>
      </ul>
    </div>

  }

  renderNewAgent(trans,editAgentId){
    let editAgentObj=null;
    if(editAgentId){
      editAgentObj = this.props.trans.agents.list.filter(agent => agent.agent_id == editAgentId);
      editAgentObj=editAgentObj[0];
    }
  
  return <div className='sub-section'><h3>{editAgentId?"Edit Agent Details":"New Agent Details:"}</h3>

  <ul>
    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Agent #Id : "}</div><input type='text' id='agent_id-ip' defaultValue={editAgentId?editAgentId:""} disabled={editAgentId?true:false} placeholder={"Agent reference #ID"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Profile Photo: "}</div><input type='file' id='agent_pic'/></li>
  
   <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Agent Name : "}</div><input type='text' id='agent_name-ip' defaultValue={editAgentId?editAgentObj.agent_name:""} placeholder={"Agent name"}/></li>

 <li className='col-xs-12 col-md-12 col-lg-12'><input  type={'button'} onClick={(e)=>this.saveNewAgent(e,editAgentObj)} defaultValue={'Save'} /><input  type={'button'} onClick={(e)=>this.closeSaving(e)} defaultValue={'Cancel'} /></li>
 </ul>
    </div>
  }


  renderAddNewProp(trans,editPropId){

    var editProps={};
    if(editPropId){
    editProps = trans.pros.list.filter(prop => prop.prop_id==editPropId);
    editProps = editProps[0];

    console.log('editig',editProps);
    }

    return <div className='sub-section'><h3>{editPropId?"Edit Property":"New Property Details:"}</h3>

    <ul>

     <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Property #Id: "}</div><input type='input' id='prop_input_id' defaultValue={editPropId?editPropId:""} disabled={editPropId?true:false} placeholder={"#Reference for property"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Add Photo: "}</div><input type='file' id='prop_pic'/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Featured Photo: "}</div><input type='file' id='prop_pic_feature'/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Address: "}</div><input type='input' id='prop_input_addr' defaultValue={editPropId?editProps.address:""} placeholder={"Address without city name"}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"City : "}</div>{this.renderCities(trans.cities.list, editPropId?editProps.city_id[0]:0)}</li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Original Price : "}</div><input type='number' id='prop_ip_org_price' defaultValue={editPropId?editProps.original_price:""} placeholder={"Original Price without currency sign"}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Current Price : "}</div><input type='number' id='prop_ip_cur_price' defaultValue={editPropId?editProps.current_price:""} placeholder={"Current Price without currency sign"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Bedrooms : "}</div><input type='number' id='prop_ip_bedroom' defaultValue={editPropId?editProps.bedrooms:""} placeholder={"Bedrooms count"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Baths : "}</div><input type='number' id='prop_ip_bath' defaultValue={editPropId?editProps.baths:""} placeholder={"Baths count"}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Area(Sqr feet) : "}</div><input type='number' id='prop_ip_sf' defaultValue={editPropId?editProps.sqr_feet:""}  placeholder={"Area Sq. Ft."}/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Featured Listing : "}</div><input type='checkbox' defaultValue={editPropId?editProps.is_featured_listing:false} id='prop_cb_feature'/></li>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Days of Listing : "}</div><input type='date' defaultValue={editPropId? editProps.listing_date:new Date().toISOString().substr(0, 10)} min="2000-06-07" max="2040-06-14" id='prop_cb_dol'/></li>

      <li className='col-xs-12 col-md-12 col-lg-12'><input  type={'button'} onClick={(e)=>this.saveNewProp(e,editPropId)} defaultValue={'Save'} /><input  type={'button'} onClick={(e)=>this.closeSaving(e)} defaultValue={'Cancel'} /></li>
      </ul>
    </div>
  }


  render() {
    const {trans } = this.props;
    let error =false;
    console.log('DEALS..',trans);
   
    var selectedTab= 0;
    if(!trans || !trans.deals['list']){
      return <div></div>;
    }
    var isExistingPlayer=this.props.activePlayer && this.props.activePlayer?true:false;
    this.allDeals= JSON.parse(JSON.stringify(trans.deals.list));
    this.allProps = JSON.parse(JSON.stringify(trans.pros.list));
    return (
      <div className="title-container"><h2 className="header-title">Properties Details</h2>
      <div className="inner-container customers">
     
     <Tabs selected={selectedTab}>
      <Pane label="Transactions Status">
      <ul id="myapps" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {!this.state.isNewTrans && <button style={{float:'right',marginTop:'27px',marginRight:'10px'}} className="btn btn-primary-trans " onClick={(e) => this.setNewTrans(e)} >{"New Transaction"}</button>}
      {this.state.isNewTrans && this.renderAddNewTrans(trans,this.state.actionTransId)}
      {trans.office.details && trans.office.details.office_id ?<div><h3 className="green">{"Transactions for: "+trans.office.details.office_name+ " Office (Code: "+trans.office.details.office_id+")"}<span style={{marginLeft:'10px'}}  className="glyphicon glyphicon-refresh" onClick={(evt)=>{this.props.refreshListData(evt,trans.office.details.office_id)}} ></span></h3></div>:null}
      {this.renderAllDeals(trans.deals.list)}
      </ul>
      </Pane>

      <Pane label="Properties" >
      <ul id="drafts" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {!this.state.isNewProp && <button style={{float:'right',marginTop:'27px',marginRight:'10px'}}  className="btn btn-primary-trans " onClick={(e) => this.setNewProp(e)} >{"Add New Property"}</button>}
      {this.state.isNewProp && this.renderAddNewProp(trans,this.state.actionPropId)}

      {trans.office.details && trans.office.details.office_id ?<h3 className="green">{"Properties for: "+trans.office.details.office_name+ " Office (Code: "+trans.office.details.office_id+")"}<span style={{marginLeft:'10px'}}  className="glyphicon glyphicon-refresh" onClick={(evt)=>{this.props.refreshListData(evt,trans.office.details.office_id)}} ></span></h3>:null}
      {this.renderAllProperties(trans.pros.list)}
      </ul>
      </Pane>

      <Pane  label="Agents">
      <ul id="templates" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {!this.state.isNewAgent && <button style={{float:'right',marginTop:'27px',marginRight:'10px'}}  className="btn btn-primary-trans " onClick={(e) => this.setNewAgent(e)} >{"Add New Agent"}</button>}
      {this.state.isNewAgent && this.renderNewAgent(trans,this.state.actionAgentId)}

      {trans.office.details && trans.office.details.office_id ?<h3 className="green">{"Agents for: "+trans.office.details.office_name+ " Office (Code: "+trans.office.details.office_id+")"}<span style={{marginLeft:'10px'}}  className="glyphicon glyphicon-refresh" onClick={(evt)=>{this.props.refreshListData(evt,trans.office.details.office_id)}} ></span></h3>:null}
      {this.renderAgentsListTbl(trans.agents.list)}
      </ul>
      </Pane>

      <Pane label= "Events">
      <ul id="services" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {!this.state.isNewEvent && <button style={{float:'right',marginTop:'27px',marginRight:'10px'}}  className="btn btn-primary-trans " onClick={(e) => this.setNewEvent(e)} >{"Add New Event"}</button>}
      {this.state.isNewEvent && this.renderNewEvent(trans,this.state.actionEventId)}

      {trans.office.details && trans.office.details.office_id ?<h3 className="green">{"Events for: "+trans.office.details.office_name+ " Office (Code: "+trans.office.details.office_id+")"}<span style={{marginLeft:'10px'}}  className="glyphicon glyphicon-refresh" onClick={(evt)=>{this.props.refreshListData(evt,trans.office.details.office_id)}} ></span></h3>:null}
      {this.renderEventsListTbl(trans.events.list)}
      </ul>
      </Pane>
      </Tabs>
     

</div>
</div>
    );
  }
}


export default CustomerAv;

