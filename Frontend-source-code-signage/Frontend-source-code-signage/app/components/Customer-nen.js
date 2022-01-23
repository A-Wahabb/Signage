import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs'
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import ModalLocal from './modal-local';
import ReactTooltip from 'react-tooltip';

class CustomerAv extends Component {

  constructor(){
    super();
    this.state = {isNewPlayerAppUpdate:false,isPlayerAppUpdate:false,
      preview:true,
      modalOpen:false};
    this.previewApp=null;
    this.username='';
    this.pass='';
    this.dealsStatus =['ACTIVE','PENDING','SOLD'];
  }
  componentWillMount() {
    console.log('-- Users will mount--', this.props);
    //var userId = this.props.user.user._id;
    //this.props.resetMe();
    // if (userId){
    //   //this.props.fetchLocs();
    // }
  }


componentDidUpdate(){

    ReactTooltip.rebuild();

    }

  tooltiphide(){
    try{
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility='hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display='none !important';
    }catch(e){
console.log(e);
    }
  }

shouldComponentUpdate(nextProps, nextState) {
return true;
}



confirm= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        // Title dialog
        message: 'Do you want to delete template -'+param.appName+'?',               // Message dialog
        childrenElement: () => <div></div>,       // Custom UI or Component
        confirmLabel: 'Remove',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => this.props.removingApp(param),    // Action after Confirm
        onCancel: () => console.log("Cancelled delete"),      // Action after Cancel
      })
    };



 

removeApp(app){
    if(app)
    {
   this.props.removingApp(app);
    
    }
  }

togglePreview(){
      this.setState({
        modalOpen:!this.state.modalOpen
      });

    }


updateUname(evt){
      console.log('uame',evt.target.value);
      this.username=evt.target.value;
    }
updatePass(evt){
      this.pass=evt.target.value;
    }

signToHub(evt){
    evt.preventDefault();
    let uname=this.username;
    let pass=this.pass;
    let cred= Object.assign({},{'username':uname,'password':pass});
      this.props.fetchLocs(cred);
    
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

renderAllDeals(list) {
    ReactTooltip.rebuild();
        var cols = {
       deal_id:'#Deal',
      agent_name: 'Agent Name',
      address: 'Property Address',
      deal_status: 'Status'
    }
    list = list.map(item => { item.deal_status= this.getSelectComponent(item.deal_status);
      return item;
    });
    let dealsTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(list,cols)}
        </tbody>
      </table>;
    return dealsTbl;
  }

  renderUserDraftApps(apps) {
    ReactTooltip.rebuild();
    var draftApps=apps.filter(app => !app.isTemplate && app.status=="DRAFT").map((app) => this.getTemplateItem(app));
    return draftApps;

  }

  renderTemplateApps(apps) {
    ReactTooltip.rebuild();
    var templateApps =apps.filter(app => (app.isTemplate && (app.domain !=="schedules" && app.domain !=="services" && app.domain !=="customs"))).map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  renderCustomApps(apps) {
    ReactTooltip.rebuild();
    var templateApps =apps.filter(app => (app.isTemplate && (app.domain ==="customs" ))).map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.props.setSelectedAppId("");
    this.props.changeConsole('LANDING');

  }
  handleSelect(e) {
    console.log('Selected loc: ',e.target.value);
    this.props.setSelectedLocs(e.target.value);
  }

renderSelectOptions = (text,val,selectedItem) => (
        <option value={val}  >{text}</option>
      )


renderLocationDdl(list){
  console.log('log',list);
    return  <select className='has-content' onChange={ (e)=>this.handleSelect(e)} defaultValue={this.props.selectedLoc} selected={this.props.selectedLoc}>
          <option value={'No Location Selected'}  >{"Select One"}</option>
          {list.map((option)=>this.renderSelectOptions(option.name,option.id,this.props.selectedLoc))}
        </select>;
}

  render() {
    const {locs} = this.props;
    let error =false;
    console.log('DEALS..',locs);
    
 
    var selectedTab= 0;
    if(!locs || !locs.locs['list']){
      return <div></div>;
    }
    //var isExistingPlayer=this.props.activePlayer && this.props.activePlayer?true:false;
    return (
      <div style={{padding:'10px'}}>
      <div >
      <h2 className="header-title modal-title-pad">{"Hub Details"}</h2>
      </div>
      <div className="container">
     
     <Tabs selected={selectedTab}>
      
      <Pane label="Location Data">
      <Loading isLoading={ locs.locs.loading }/>
      <Error error={locs.locs.error}/>
      {locs.locs['list'].length==0?<div>
      <ul id="myapps" className="panel-body">
      
      <li className='col-xs-12 col-md-6 col-lg-6'>
      <input className='col-xs-12 col-md-6 col-lg-4' type={'text'} defaultValue={''} onBlur={e=>this.updateUname(e)} placeholder='Type your hub username' /></li>
      <li className='col-xs-12 col-md-6 col-lg-6'>
      <input className='col-xs-12 col-md-6 col-lg-4'  type={'password'} onBlur={(e)=>this.updatePass(e)} defaultValue={''}  placeholder='Type your hub password' /></li>
      <li className='col-xs-6 col-md-6 col-lg-4'><input  type={'button'} onClick={(e)=>this.signToHub(e)} defaultValue={'SignIn'} /></li>
      </ul>
      </div>: <div>
        <h2>Please select your location for template</h2>
        {this.renderLocationDdl(locs.locs['list'])}
        {this.props.selectedLoc?<div><h3 className="green">Your location code: {this.props.selectedLoc}</h3><br/><span>*Copy this code and paste it in template textbox</span></div>:""}
      </div>}

      </Pane>

      <Pane label="Other Info">
      <ul id="drafts" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={error}/>
      {"No Info found"}
      </ul>
      </Pane>

      
      </Tabs>
     

</div>
</div>
    );
  }
}


export default CustomerAv;

