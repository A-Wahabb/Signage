import React, { Component } from 'react';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class DLDateTime extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor (props) {
    super(props);
    console.log(new Date(props.dateTime));
    this.state={
      year:props.year?props.year:new Date(props.dateTime).getFullYear(),
      month:props.month?props.month:new Date(props.dateTime).getMonth(),// in number for JAN it will be 0
      date:props.date?props.date:new Date(props.dateTime).getDate(),// today's date number
      hour:props.date?props.date:new Date(props.dateTime).getHours(),
      minute:props.date?props.date:new Date(props.dateTime).getMinutes()
    };

  }

    componentDidUpdate(prevProps, prevState){
      if(JSON.stringify(prevState) != JSON.stringify(this.state)){
        let date = ''+this.state.year+'-'+(this.state.month+1)+'-'+this.state.date+' '+this.state.hour+':'+this.state.minute+':00';
          console.log('update date', date);
        this.props.updateDate(date);
      }
  }

  setSelection(selection, val){
    
    switch(selection){
      case 'YEAR' :
      {
      this.setState({
        year: val
      });
      break;
      }
      case 'MONTH' :
      {
      this.setState({
        month: val
      });
      break;
      }
      case 'DATE' :
      {
      this.setState({
        date: val
      });
      break;
      }
      case 'HOUR' :
      {
      this.setState({
        hour: val
      });
      break;
      }
      case 'MINUTE' :
      {
      this.setState({
        minute: val
      });
      break;
      }
    }
    
  }

  getYears(){
   let currentYear = new Date().getFullYear();
   let yearsList=[currentYear];
   for(let i=1;i<5;i++){
              yearsList.push(currentYear+i)
              }
   return(<div style={{marginLeft:'5px',display:'inline-block',borderBottom:'none'}}>
        
          <span className='nodrop'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.state.year} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {
              yearsList.map((year) => (<MenuItem key={year} onClick={()=>{this.setSelection('YEAR',year)}}>
                <span>{year}</span>
              </MenuItem>))
            }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

  getMonths(){
   let months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
   return(<div style={{display:'inline-block',borderBottom:'none'}}>
        
          <span className='nodrop'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={months[this.state.month]} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
              { months.map((month,i) => (<MenuItem key={month} onClick={()=>{this.setSelection('MONTH',i)}}>
                <span>{month}</span>
              </MenuItem>))
              }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

getDate(){
   let dates=[];
   for(let i=1;i<32;i++){
    dates.push(i);
   }
   return(<div style={{display:'inline-block',borderBottom:'none'}}>
        
          <span className='nodrop'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.state.date} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            { dates.map((date) => (<MenuItem key={date} onClick={()=>{this.setSelection('DATE',date)}}>
                <span>{date}</span>
              </MenuItem>))
            }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

getHours(){
   let hoursList = [];
   for(let i=1;i<25;i++){
    hoursList.push(i);
   }
   return(<div style={{display:'inline-block',borderBottom:'none'}}>
        
          <span className='nodrop'>
            <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
        <Dropdown.Toggle title={this.state.hour} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {hoursList.map( hour => ( <MenuItem key={hour} onClick={()=>{this.setSelection('HOUR',hour)}}>
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
        <Dropdown.Toggle title={this.state.minute} />
        <Dropdown.MenuWrapper>
          <Dropdown.Menu>
            {mntList.map(minute => (<MenuItem key={minute} onClick={(e)=>{this.setSelection('MINUTE',minute)}}>
                <span>{minute}</span>
              </MenuItem>))
              }
          </Dropdown.Menu>
          </Dropdown.MenuWrapper>
          </Dropdown></span>
        </div>);
}

  render() {
   
    return (
      <div>
       {this.getYears()}
       {this.getMonths()}
       {this.getDate()}
       {', '}
       {this.getHours()}
       {':'}
       {this.getMinutes()}

      </div>
    );
  }
}

export default DLDateTime;