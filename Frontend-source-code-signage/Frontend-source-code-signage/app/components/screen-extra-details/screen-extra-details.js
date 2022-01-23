import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER, PrimaryColor} from '../../constants/Config';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

class ScreenExtraDetails extends Component {
 
constructor(props) {
    super(props);
    this.state= {
      selectedGroup: '',
      selectedGroupId:'',
      newGroupInput: false
    };
    this.selectScreenGroup = this.selectScreenGroup.bind(this);
    this.renderScreenGroups= this.renderScreenGroups.bind(this);
    this.toggleAddNewGroup = this.toggleAddNewGroup.bind(this);
    this.saveAdditionalDetails = this.saveAdditionalDetails.bind(this);
  }

componentDidMount(){
  this.props.requestGroups();
}

componentDidUpdate(prevProps, prevState){
  

}

selectScreenGroup(groupSelected, groupId){
  console.log(groupSelected);
  this.setState({
    selectedGroup: groupSelected,
    selectedGroupId: groupId
  });
}

toggleAddNewGroup(){
  this.setState({
    newGroupInput: !this.state.newGroupInput
  });
}

createNewGroup(evt){
  let grpName= document.getElementById('grp-input').value;
  console.log('--------new group--',grpName);
  this.props.creatGroup(grpName);
  this.toggleAddNewGroup();
}

saveAdditionalDetails(){
  let playerExtraBody= {};
  let address = document.getElementById('address-details').value;
  playerExtraBody.address = address;
  playerExtraBody.groupId= this.state.selectedGroupId?this.state.selectedGroupId:  this.props.player.groupId;

  this.props.updatePlayer(playerExtraBody, this.props.player._id);
}

renderScreenGroups(){
  let groups = this.props.groups? this.props.groups:[];

  return (<span className='menu-arrow glyphicon optionbtn'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.state.selectedGroup?this.state.selectedGroup : (this.props.player.groupName?this.props.player.groupName : 'Select a group for screen')} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
          
          {groups.map( group => ( <MenuItem  onClick={() => this.selectScreenGroup(group.group_name,group._id)}>
              <span>{group.group_name}</span>
            </MenuItem>))}

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>);
}


renderNewGroup(){
  return (<div>
          <li>
           <Link
              to="#"
              style={{float:'right',color:PrimaryColor}}
              className="btn btn-primary-link btn-single"
              onClick={(evt) => this.toggleAddNewGroup(evt)}>
              <span style={{color:PrimaryColor}} className="glyphicon glyphicon-plus"></span>{' NEW GROUP'}
            </Link>
            </li>
            {this.state.newGroupInput && 
          <li>
            <div className="">
            <input  className={'effect-16 has-content'} id="grp-input" type='input' placeholder="Enter a group name..." required/>
            <div className="edit-tool-box-in"><span className="glyphicon glyphicon-ok" onClick={(evt)=>this.createNewGroup(evt)}  ></span>
          <span className="glyphicon glyphicon-remove" onClick={(evt)=>this.toggleAddNewGroup(evt)}  ></span>
            </div>
            </div>
            </li>
          }
              </div>);
}

render() {
  console.log('--playr at map', this.props.player);
 
  return (
      <div style={{height:'100%'}}>
       <Title title={'Screen Extra: '+this.props.player.playerName}/>
        <div style={{ height: 'calc(100% - 120px)', width: '100%' }}>
        <ul style={{listStyle: 'none'}}>
        <li style={{marginTop: '10px'}}>
        <div><label>Screen Additional Details (e.g. Floor, Address, Store, City)</label></div>

        <div><textarea id='address-details' defaultValue={this.props.player.address}  style={{width:'200px',height:'100px'}}/></div>
        </li>
        <li style={{marginTop: '10px'}}>
        <div><label>Screen Group </label></div>
        <div>{this.renderScreenGroups()}</div>
        </li>
        {this.renderNewGroup()}
        </ul>

      </div>
      <div className="btn-footer">
      <button
      onClick={ e => this.saveAdditionalDetails() }
      style={{backgroundColor:PrimaryColor}}
      className="btn btn-primary "
      > SAVE
      </button>
      </div>
    </div>
  
  )
}
}


export default ScreenExtraDetails;
