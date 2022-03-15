import React, { Component, PropTypes } from 'react';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

class Search extends Component {

  constructor (props) {
    super(props);

  }



render() {

  return (
 <span className={this.props.isOnlysearch?'pop-search':'search-top-input ms-auto w-100'} >
      <span className='glyphicon glyphicon-search w-100' ></span>
      {!this.props.isOnlysearch && <span className='search-drop'>
          <Dropdown autoOpen= {true} arrowClassName='glyphicon glyphicon-triangle-bottom' className={'glyphicon glyphicon-triangle-bottom'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={(e)=>{this.props.changeConsole('USER_SCREENS')}}>
              <span>SCREENS</span>
            </MenuItem>
            <MenuItem onClick={(e)=>{this.props.changeConsole('PLAYLISTS')}}>
              <span>PLAYLISTS</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.props.changeConsole('TEMPLATE_LIST')}}>
              <span>TEMPLATES</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.props.changeConsole('GALLERY')}}>
              <span>LIBRARY</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.props.changeConsole('REPORTS')}}>
              <span>REPORTS</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>}
          <input 
            type='search' 
            className='search ms-auto' 
            placeholder="search..." 
            onChange={(e)=> this.props.onSearchChange(e)}/>

          </span>
  )
}
}


export default Search;
