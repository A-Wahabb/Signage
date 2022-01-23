import React from 'react';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

const ChevSelect = (props) => {
    console.log('checv props---', props);
    let menuItems= props.menuItems;
    let onSelectChange = props.onSelectionChange;
    let selectedIndx=props.selectedIndx;
    return (<span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
          <Dropdown.Toggle title={selectedIndx?menuItems[menuItems]:menuItems[0]} />
          <Dropdown.MenuWrapper>
            <Dropdown.Menu>
             {menuItems.map( (menu,indx) => 
              <MenuItem onClick={(e)=>onSelectChange(indx)}>
               <span>{menu}</span>
              </MenuItem>
              )}
            </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown>
          </span>
          );
        };

export default ChevSelect;