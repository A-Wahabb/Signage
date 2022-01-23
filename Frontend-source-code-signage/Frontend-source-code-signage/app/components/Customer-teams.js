import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs'
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import { toast } from 'react-toastify';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

class CustomerTeams extends Component {

  constructor(){
    super();
    this.state = {isNewTeams:false,actionTeamsId:null, matchTeams:[]};
    this.dealsStatus =['ACTIVE','PENDING','SOLD'];
    this.allDeals=[];
    this.colors=['BLUE','GREEN','GREY','RED','YELLOW'];
    this.setNewTeams = this.setNewTeams.bind(this);
    this.selectTeam = this.selectTeam.bind(this);
    this.confirmMatchTeams = this.confirmMatchTeams.bind(this);
    this.actionMatchesRender = this.actionMatchesRender.bind(this);
    this.renderColorSelect= this.renderColorSelect.bind(this);
  }

  componentWillMount() {
    console.log('-- Users will mount--', this.props);
    var userId = this.props.user.user._id;
    this.props.resetMe();
    this.props.fetchTeams();
    this.props.fetchMatches();
  }


confirmMatchTeams= (matchTeams) => {
      
      confirmAlert({
        title: 'Confirm Match Teams!!',                        // Title dialog
        message: 'Would you like to set match between [ '+matchTeams[0].name + ' Vs '+ matchTeams[1].name+' ] ?',               // Message dialog
        childrenElement: () => <div></div>,       // Custom UI or Component
        confirmLabel: 'CONTINUE',                           // Text button confirm
        cancelLabel: 'CANCEL',                             // Text button cancel
        onConfirm: () => this.props.addMatchTeams(matchTeams),    // Action after Confirm
        onCancel: () => console.log("Cancelled delete")     // Action after Cancel
      })
    };

dealUpdate(e,updateObj){
    console.log('status udpate',this.dealsStatus[e.target.selectedIndex] +'-'+ e.target.name);
    let editDealObj = this.allDeals.filter(deal=> deal.deal_id == e.target.name);

    let finalUpdate=updateObj?updateObj:{deal_id:e.target.name, deal_status:this.dealsStatus[e.target.selectedIndex],agent_id:editDealObj[0].agent_id,prop_id:editDealObj[0].prop_id};

    this.props.updateDeal(finalUpdate,this.props.teams.office.details.office_id);
}

setNewTeams(evt,teamsId){
    console.log(teamsId);
    
    this.setState({isNewTeams:true,actionteamsId:(teamsId?teamsId:null)});

    window.scrollTop=0;
  }


      
renderColorSelect (matchId,team) {
       return <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={team.color?team.color:'Theme'} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            {this.colors.map(color => <MenuItem onClick={()=>{this.props.updateMatch({_id:matchId,teamId:team._id,color:color})}}>
              <span style={{fontSize:'0.8em'}}>{color}</span>
            </MenuItem>)}
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown>
        </span>
     
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

selectTeam(evt, team){

console.log('selected team', team);
if(this.state.matchTeams.length <2){
  if(this.state.matchTeams.length==0){
    toast.info('Team 1 added for match, select 2nd team!');
  }
  let matchTeams = this.state.matchTeams;
  matchTeams.push(team);
  this.setState({matchTeams: matchTeams});
  if(matchTeams.length ==2 ){
    this.confirmMatchTeams(matchTeams);
    this.setState({matchTeams: []});
  }
  }

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

actionTeamsRender(team){
  
return <div style={{width:'160px'}}><span  className="glyphicon glyphicon glyphicon-ok" onClick={(evt)=>{this.selectTeam(evt,team)}} ></span><span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.props.delTeam(team.id)}} ></span></div>
}

actionMatchesRender(match){
  
return <div style={{width:'100px'}}>{match.status=='WAITING'&& <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px','fontSize':'0.8em',marginLeft:'10px'}}className="btn-primary-link" onClick={(e) => this.props.updateMatch({_id:match._id,status:'RUNNING'})} >START</button> }<span  className="glyphicon glyphicon-trash" onClick={(evt)=>{this.props.delMatch(match._id)}} ></span></div>
}

printDocument() {
    const input = document.getElementById('matchTbl');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpg');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

renderAllTeams(list) {
    var cols = {
      team_index :'#',
      team_name : 'Team Name',
      team_thumb: 'Team Thumb',
      weight:'Weight(gm)',
      color:'Color',
      condition:'Condition',
      box:'#Box',
      action:""
      };
    try{

    let listNew= JSON.parse(JSON.stringify(list));
    let listUpdate = listNew.map((item,indx) => {
      let team={};
      team.id=item._id;
      team.name=item.team_name;
      item.team_index = indx+1;
      item.team_name = <span style={{minWidth:'250px',maxWidth:'350px',wordBreak:'break-all'}}>{item.team_name}</span>
      let thumbPath= BASE_SERVER +'/custom/'+item.team_thumb;
      item.team_thumb=< img src={thumbPath} style={{width:'80px',height:'80px'}}/>;
      item.weight= <span>{item.numbers}</span>;
      item.color= <span>{item.color}</span>;
      item.condition= <span>{item.condition}</span>;
      item.box= <span>{item.box}</span>;
      item.action = this.actionTeamsRender(team);
      return item;
    });
    let teamsTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(listUpdate,cols)}
        </tbody>
      </table>;
    return teamsTbl;
    }
    catch(e){
       let emptyTeamsTbl= <table className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          <h2> No teams found, create new team</h2>
        </tbody>
      </table>
      return emptyTeamsTbl
    }
  }


renderMatchesList(matches, teams) {

    let cols = {
      matchNo:'#Match',
      teamA : 'Team A',
      teamB : 'Team B',
      winner: 'Winner',
      winFightTime:'Fight Time',
      isWalkoverWin:'Walkover?',
      status:"Status",
      action:""
      };
      try{
    let listNew= JSON.parse(JSON.stringify(matches));
    let listUpdate = listNew.map((item,indx) => {

      for(let i=0;i<teams.length; i++){
          if(teams[i]._id == item.teamA){
            item.teamAId=item.teamA;
            item.teamA = teams[i].team_name;
          }
          if(teams[i]._id == item.teamB){
            item.teamBId=item.teamB;
            item.teamB = teams[i].team_name;
          }
         
      }
      item.matchNo = item.matchNo;
      item.teamA = <span style={{minWidth:'250px',maxWidth:'300px',wordBreak:'break-all'}}>{item.teamA}</span>;
      item.teamB = <span style={{minWidth:'250px',maxWidth:'300px',wordBreak:'break-all'}}>{item.teamB}</span>;
      item.status = <span style={{'maxWidth':'100px','fontSize':'0.7em',fontWeight:'bold',color:item.status=='FINISHED'?'green':(item.status=='RUNNING'?'orange':'#1d91e6')}}>{item.status}</span>;
      item.winner = <span>{item.winner && <span style={{'maxWidth':'200px','wordBreak':'break-all'}} className='green-oval'>
          { item.winner == item.teamAId?item.teamA:item.teamB }
          </span>}</span>;
      item.winFightTime = <span style={{'maxWidth':'100px','wordBreak':'break-all','fontSize':'0.8em',fontWeight:'bold',color:'#d6860a'}}>{item.winFightTime}</span>;
      item.isWalkoverWin = <span style={{'maxWidth':'100px','wordBreak':'break-all','fontSize':'0.7em',fontWeight:'bold',color:(item.isWalkoverWin?'#6307a7':'#838c09')}}>{item.isWalkoverWin?'YES':"NO"}</span>;
      item.action = this.actionMatchesRender(matches[indx]);
      return item;
    });
    let matchesTbl= <table id='matchTbl'  className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          {this._rows(listUpdate,cols)}
        </tbody>
      </table>;
    return matchesTbl;
    }
    catch(e){
      let emptyMatchesTbl= <table id='matchTbl' className="responsive-table">
        <thead>
          {this._head(cols)}
        </thead>
        <tbody>
          <h2>No Match found!</h2>
        </tbody>
      </table>;
    return emptyMatchesTbl;

    }
  }


  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }
 
closeSaving(evt){
   this.setState({isNewTeams:false,
    actionteamsId:null});
}


saveNewTeam(evt,editObj){
  let teamName = document.getElementById('team_name').value;
  let teamThumb=document.getElementById('team_thumb').files[0];
  let weight= document.getElementById('numbers').value;
  let color= document.getElementById('color').value;
  let condition= document.getElementById('condition').value;
  let box= document.getElementById('box').value;

  let teamObj={
      team_name:teamName, 
      team_thumb:teamThumb && teamThumb.name?this.getProperImageName(teamThumb):"",
       numbers:weight,
       color:color,
       condition:condition,
       box: box
     };


    if(teamThumb && teamThumb.name){
      this.props.uploadImg(teamThumb,'/team-thumbs');
    }

     if(!editObj){
     
      this.props.addTeam(teamObj);
    }
    else{

      teamObj.teamThumb = teamThumb && teamThumb.name?this.getProperImageName(teamThumb):editObj.teamThumb;
        teamObj._id=teamObj._id;
      this.props.updateTeam(teamObj);
    }

    this.closeSaving();
}

getProperImageName(imgFile){
  let imgNm=imgFile.name?imgFile.name.substr(0, imgFile.name.lastIndexOf(".")).replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '_')+'.'+imgFile.type.split('/')[1]:"";
  return imgNm;
}


renderRunningMatches(teams, matches){

  return <ul className='section-list'>{matches.map(match =>{
    if(match.status=='RUNNING' ){
      let teamA= teams.filter(team => team._id == match.teamA)[0];
      let teamB= teams.filter(team => team._id == match.teamB)[0];
      let thumbPathA='';
      if(teamA && teamA.team_thumb){
      thumbPathA= BASE_SERVER +'/custom/'+teamA.team_thumb;
      }
      let thumbPathB='';
      if(teamB && teamB.team_thumb){
      thumbPathB= BASE_SERVER +'/custom/'+teamB.team_thumb;
      }
      teamA.color= match.teamA_color;
      teamB.color= match.teamB_color;

     return <li>
        <div>
          <h2>{'#Match : '+  match.matchNo} </h2>
          <div className='sub-sec'>
            <img src={thumbPathA} style={{width:'80px',height:'80px'}}/>
              <div style={{fontWeight:'bold'}}>{teamA.team_name}</div>
              <div>{this.renderColorSelect(match._id,teamA)}</div>
              <div>{match.winner && match.winner ==teamA._id ? <h3><i>WINNER</i></h3> :<button
                onClick={()=>this.props.updateMatch({_id:match._id, winner:teamA._id,status:'FINISHED'})}
                className="btn-primary-link">
                DECLARE WINNER
              </button>}</div>
          </div>
          <div className='sub-sec'>
            <h1>Vs</h1>
          </div>
          <div className='sub-sec'>
            <img src={thumbPathB} style={{width:'80px',height:'80px'}}/>
            <div style={{fontWeight:'bold'}}>{teamB.team_name}</div>
            <div>{this.renderColorSelect(match._id,teamB)}</div>
            <div>{match.winner && match.winner ==teamB._id ? <h3><i>WINNER</i></h3> :<button
                onClick={()=>this.props.updateMatch({_id:match._id, winner:teamB._id,status:'FINISHED'})}
                className="btn-primary-link">
                DECLARE WINNER
              </button>}</div>
          </div>
          <div> 
          <button
          onClick={()=>this.props.updateMatch({_id:match._id, isWalkover:!match.isWalkover})}
          className={match.isWalkover?'btn':'btn btn-primary' }
          style={{backgroundColor:match.isWalkover?'red':'#099b90',float:'none'}}
          > {match.isWalkover?'STOP WALKOVER': 'START WALKOVER'}
          </button>
          <button
          style={{marginLeft:'20px',backgroundColor:match.isGametimeStart?'red':'#099b90',float:'none'}}
          onClick={()=>this.props.updateMatch({_id:match._id, isGametimeStart:!match.isGametimeStart})}
          className={match.isGametimeStart?'btn':'btn btn-primary' }
           > {match.isGametimeStart?'STOP FIGHT TIME': 'START FIGHT TIME'}
          </button>
          </div>
        </div>
     </li>
    }
  })
  }</ul>;

}


  renderAddNewteams(teams,teamsId){
    var editTeams=null;
    if(teamsId){
    editTeams = teams.teams.list.filter(team => team._id==teamsId);
    editTeams = editTeams[0];
    console.log('editig',editTeams);
    }
    return <div className='sub-section'><h3>{teamsId?"Edit Teams Details ":"Add New Teams"}</h3>

    <ul>

    <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Teams Owner: "}</div><input className="effect-16" type='input' id='team_name' defaultValue={editTeams?editTeams.owner_name:""}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Teams Pic: "}</div><input type='file' id='team_thumb'/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Weight: "}</div><input className="effect-16" type='input' id='numbers' defaultValue={editTeams?editTeams.weight:""}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Color: "}</div><input className="effect-16" type='input' id='color' defaultValue={editTeams?editTeams.color:""}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"Condition: "}</div><input className="effect-16" type='input' id='condition' defaultValue={editTeams?editTeams.condition:""}/></li>

      <li className='col-xs-12 col-md-6 col-lg-6'><div>{"#Box: "}</div><input className="effect-16" type='input' id='box' defaultValue={editTeams?editTeams.Box:""}/></li>
     

      <li className='col-xs-12 col-md-12 col-lg-12' >
      

       <button
       style={{float:'right',backgroundColor:'#099b90'}}
      onClick={(e)=>this.saveNewTeam(e,editTeams)}
      className="btn btn-primary "
      > SAVE
      </button>
        <button
        style={{float:'right',marginRight:'10px'}}
        onClick={(e)=>this.closeSaving(e)}
        className="btn-primary-link"
        > CANCEL
        </button>

        </li>
      </ul>
    </div>

  }


  render() {
    const {teams,matches } = this.props;
    var selectedTab= 0;

    return (
      <div className="title-container"><h2 className="header-title">Team Details</h2>
      <div>
      <Tabs selected={selectedTab}>
      <Pane label="TEAMS">
      <ul id="teams" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={teams.error}/>     
      {teams.list.length==0 ? this.renderAddNewteams():this.renderAllTeams(teams.list)}
 
      </ul>
      </Pane>

      <Pane label="MATCH LIST" >
      <ul id="matches" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={null}/>
      <span  className="glyphicon glyphicon-print" onClick={(e)=> this.printDocument()} ></span>
        {this.renderMatchesList(matches.list,teams.list)}
      
      </ul>
      </Pane>

      <Pane label="RUNNING" >
      <ul id="current" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={null}/>
        {this.renderRunningMatches(teams.list, matches.list)}
      
      </ul>
      </Pane>

      <Pane label="NEW TEAM" >
      <ul id="current" className="panel-body">
      <Loading isLoading={ false }/>
      <Error error={null}/>
        {this.renderAddNewteams(teams.list)}
      
      </ul>
      </Pane>
      
      </Tabs>
     

</div>
</div>
    );
  }
}


export default CustomerTeams;

