import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs'
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import ModalLocal from './modal-local';
import ReactTooltip from 'react-tooltip';



class CustomerHanane extends Component {

  constructor(){
    super();

    
    this.state = {isNewTrans:false,actionTransId:null};
    this.dealsStatus =['ACTIVE','PENDING','SOLD'];
    this.allDeals=[];
  }

  componentWillMount() {
    console.log('-- Users will mount--', this.props);
    var userId = this.props.user.user._id;
    this.props.resetMe();
    this.props.fetchOptins();
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

removeDeals(e,dealId){
 
   this.props.deleteDealById(dealId);
  
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

launchPreview(evt,pgId){
  let server= window.location.origin;
  let previewPath = server+'/page/'+pgId+'.html';
  console.log(previewPath);
  window.open(previewPath, '_blank');
}

actionTransRender(pagdId){
  
return <div style={{width:'160px'}}><span  className="glyphicon glyphicon glyphicon-eye-open" onClick={(evt)=>{this.launchPreview(evt,pagdId)}} ></span><span  className="glyphicon glyphicon-pencil" onClick={(evt)=>{this.setNewTrans(evt,pagdId)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.removeDeals(evt,pagdId)}} ></span></div>
}



renderAllDeals(list) {
    
        var cols = {
      optin_index :'#',
      optin_name : 'Title',
      visits_count: 'Visits',
      optins:'Optins',
      download_url: 'Download URL',
      action:'Actions'
      };

    let listNew= JSON.parse(JSON.stringify(list));
    let listUpdate = listNew.map((item,indx) => {
      item.optin_index = indx+1;
      item.optin_name = <span style={{minWidth:'250px',maxWidth:'350px',wordBreak:'break-all'}}>{item.optin_name}</span>
      let server= window.location.origin;
      let downloadPath= server +'/download/downloadings/'+item.download_url;
      item.download_url=<a href={downloadPath}>{item.download_url}</a>;
      item.action = this.actionTransRender(item._id);
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


renderAllDealsDetails(list) {
    
        var cols = {
      optin_index :'#',
      optin_name : 'Title',
      page_url: 'Page URL',
      emails:'Leads emails'
      };

    let listNew= JSON.parse(JSON.stringify(list));
    let listUpdate = listNew.map((item,indx) => {
      item.optin_index = indx+1;
      item.optin_name = <span style={{minWidth:'250px',maxWidth:'300px',wordBreak:'break-all'}}>{item.optin_name}</span>
      let server= window.location.origin;
      let pageURL = server+'/page/'+item._id+'.html';
      item.page_url = <span style={{'maxWidth':'200px','wordBreak':'break-all'}}>{pageURL}</span>;
      let downloadPath= server +'/download/downloadings/'+item.download_url;
      item.download_url=<a href={downloadPath}>{item.download_url}</a>;
      item.emails = <span style={{maxWidth:'200px','wordBreak':'break-all'}}>{item.emails}</span>;
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


daysDiff(timestamp1, timestamp2) {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference/1000/60/60/24);
    return daysDifference+'d';
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

 
closeSaving(evt){
   this.setState({isNewTrans:false,
    actionTransId:null});
}


saveNewTrans(evt,editObj){
  let pgName = document.getElementById('page_title').value;
  let pgDesc= document.getElementById('page_dsc').value;
  let thanks= document.getElementById('thanks_text').value;
  let bannerPic=document.getElementById('banner_pic').files[0];
  let downloadFile=document.getElementById('download_file').files[0];

 let pgObj={optin_name:pgName, optin_desc:pgDesc,download_url:downloadFile && downloadFile.name?this.getProperImageName(downloadFile):"", banner_pic:bannerPic && bannerPic.name?this.getProperImageName(bannerPic):"", thanks_msg:thanks};
 console.log('final pg saving',pgObj);
if(downloadFile && downloadFile.name){
   this.props.uploadPdf(downloadFile,'/downloadings');
}
if(bannerPic && bannerPic.name){
  this.props.uploadImg(bannerPic,'/banners');
}

 if(!editObj){
 
  this.props.addTransDeal(pgObj);
}
else{

  console.log('edit save',pgObj);
  pgObj.banner_pic=bannerPic && bannerPic.name?this.getProperImageName(bannerPic):editObj.banner_pic;

  pgObj.download_url = downloadFile && downloadFile.name?this.getProperImageName(downloadFile):editObj.downloadFile;
    pgObj._id=editObj._id;
  this.props.updateDeal(pgObj);
}

 

this.closeSaving();
}

getProperImageName(imgFile){
let imgNm=imgFile.name?imgFile.name.substr(0, imgFile.name.lastIndexOf(".")).replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '_')+'.'+imgFile.type.split('/')[1]:"";
return imgNm;
}




renderSelectOptionsWthImg = (text,val) => {
     // let imgpath= BASE_SERVER+'/preview/customers/av/'+proPic;
       return <option  value={val}>{text}</option>;
}





renderStatus(selectedItem,statusArr){
   return  <select id='trans-status' defaultValue={selectedItem} className='has-content' >
          {statusArr.map((option)=>this.renderSelectOptions(option,option))}
        </select>
}

rteChange(e){
  e.preventDefault();
}

  renderAddNewTrans(trans,transId){
    var editTrans=null;
    if(transId){
    editTrans = trans.deals.list.filter(deal => deal._id==transId);
    editTrans = editTrans[0];
    console.log('editig',editTrans);
    }
    return <div className='sub-section'><h3>{transId?"Edit Page":"Add new Page"}</h3>

    <ul>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Page title: "}</div><input type='input' id='page_title' defaultValue={editTrans?editTrans.optin_name:""}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Banner Pic: "}</div><input type='file' id='banner_pic'/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Pdf to download: "}</div><input type='file' id='download_file'/></li>



     <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Page Description: "}</div><textarea rows="4" cols="50" id='page_dsc' defaultValue={editTrans?editTrans.optin_desc:""} ></textarea></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"After download thanks msg: "}</div><input type='input' id='thanks_text' defaultValue={editTrans?editTrans.thanks_msg:""} /></li>

      <li className='col-xs-12 col-md-12 col-lg-12'><input  type={'button'} onClick={(e)=>this.saveNewTrans(e,editTrans)} defaultValue={'Save'} /><input  type={'button'} onClick={(e)=>this.closeSaving(e)} defaultValue={'Cancel'} /></li>
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

    return (
      <div className="title-container"><span className="glyphicon glyphicon-arrow-left bk-btn" onClick={(evt) => this.props.changeConsole(isExistingPlayer?"TEMPLATE_EDIT":"TEMPLATE_NEW")}></span><h2 className="header-title">Properties Details</h2>
      <div className="container customers">
     
     <Tabs selected={selectedTab}>
      <Pane label="Optin Pages">
      <ul id="myapps" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {!this.state.isNewTrans && <div><button style={{float:'right',marginLeft:'27px',marginRight:'10px',marginBottom:'20px'}} className="btn btn-primary-trans " onClick={(e) => this.setNewTrans(e)} >{"New Page"}</button><span style={{marginLeft:'10px',float:'right'}}  className="glyphicon glyphicon-refresh" onClick={(evt)=>{this.props.refreshListData(evt)}} ></span></div>}
      {this.state.isNewTrans && this.renderAddNewTrans(trans,this.state.actionTransId)}
   
      {!this.state.isNewTrans && this.renderAllDeals(trans.deals.list)}
      </ul>
      </Pane>

      <Pane label="Details" >
      <ul id="details" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
        {!this.state.isNewTrans && this.renderAllDealsDetails(trans.deals.list)}
      
      </ul>
      </Pane>

      
      </Tabs>
     

</div>
</div>
    );
  }
}


export default CustomerHanane;

