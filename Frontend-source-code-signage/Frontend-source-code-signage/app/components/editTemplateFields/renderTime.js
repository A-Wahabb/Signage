import React, { Component } from 'react';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class DDTime extends React.Component { 

  constructor (props) {
    super(props);
    this.state={
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.time = this.props.time;// hh:mm:ss format
    this.hr='';
    this.mnt='';
    this.sec='';
  }

handleChange(sec,val){
    let time = this.time;
    timeArr =time.split(':');
    if(sec=='HOUR'){
      timeArr[0] = val;
    }else if(sec =='MIN')
    {
      timeArr[1] = val;
    }else{
      timeArr[2] = val;
    }
    let updatedTime = timeArr[0]+':'+timeArr[1]+':'+timeArr[2];
    let evt= {target:this.props.name,value:updatedTime};
    this.prop.updateContent(evt,updatedTime);
}


getHours(){
   let hoursList = [];
   for(let i=1;i<25;i++){
    hoursList.push(i);
   }
   return(<div style={{display:'inline-block',borderBottom:'none'}}>
        
          <span className='nodrop'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.hr} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {hoursList.map( hour => ( <MenuItem onClick={()=>{this.handleChange('HOUR',hour)}}>
                <span>{hour}</span>
              </MenuItem>))
              }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

getMinutes(){
   let mntList = [];
   for(let i=1;i<61;i++){
      mntList.push(i);
   }

   return(<div style={{marginLeft:'5px',display:'inline-block',borderBottom:'none'}} >
        
          <span className='menu-arrow glyphicon'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.mnt} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {mntList.map(minute => (<MenuItem onClick={(e)=>{this.handleChange('MINUTE',minute)}}>
                <span>{minute}</span>
              </MenuItem>))
              }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

getSeconds(){
   let secList = [];
   for(let i=1;i<61;i++){
      secList.push(i);
   }

   return(<div style={{marginLeft:'5px',display:'inline-block',borderBottom:'none'}} >
        
          <span className='menu-arrow glyphicon'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.sec} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {secList.map(sec => (<MenuItem onClick={(e)=>{this.handleChange('MINUTE',sec)}}>
                <span>{sec}</span>
              </MenuItem>))
              }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

  render() {

    let timeArr= this.time.split(':');

    this.hr = timeArr[0];
    this.mnt = timeArr[1];
    this.sec= timeArr[2];
    return (
      <div>
       
       {this.getHours()}
       {':'}
       {this.getMinutes()}
       {':'}
       {this.getSeconds()}

      </div>
    );
  }
}

export default DDTime;