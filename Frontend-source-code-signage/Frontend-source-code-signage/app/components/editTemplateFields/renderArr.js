import React, { Component } from 'react';
import RenderJSON from './renderJson';
import RenderNumber from './../renderNumber';
import RenderImgWoverlay from './renderImgWithOverlay';

class RenderArr extends React.Component { 
  constructor(props) {
    super(props);
    this.renderArrObj = this.renderArrObj.bind(this);
    this.rootProperty=this.props.rootProperty;
    this.getRandomInt=this.getRandomInt.bind(this);
    this.removeItem = this.removeItem.bind(this);
     this.isRemoveAction= false;
    this.animOptions=[
               "SlideUp",
               "Swash",
               "SlideLeft",
               "Foolish",
               "Space"
            ];
    }

  getRandomInt() {
  return Math.floor(Math.random() * 200000000);
} 

  componentDidUpdate(prevProps,prevState){
      this.isRemoveAction = false;

    }


  removeItem(e){
    this.isRemoveAction = true;
    this.props.removeContent(e);
  }

  renderArrObj(arrObj){
  let { objType, updateContent, appLocation,rootProperty, toggleMediaPicker} = this.props;
  
  return (<ul style={{margin:"10px 0px"}}>

          <li >
            
            {
            arrObj.map((item, index) =>
            <div >
            {rootProperty.indexOf('fixed') == -1 && 
            <span name={this.rootProperty+'['+index+']'+'~remove'}  onClick={(e) => this.removeItem(e)} className="glyphicon glyphicon-remove remove" ></span>}


            {objType(item) == 'Array' && this.renderArrObj(item) }

            {objType(item) == 'Json' && <RenderJSON 
              jsonObj={item}
              objType={objType}
              key={this.isRemoveAction?"key-"+this.getRandomInt():""}
              updateContent={updateContent}
              appLocation={appLocation}
              rootProperty={this.rootProperty+'['+index+']'}
              toggleMediaPicker={toggleMediaPicker}
              removeContent={this.props.removeContent}
              addNewContent={this.props.addNewContent}
              />   }

            { objType(item) == 'String' && item.indexOf('class') == -1 && !item.endsWith('select')  && <input name={this.rootProperty+'['+index+']'} key={this.rootProperty+'['+index+']'}  type="text" defaultValue={item} className='effect-16'  onChange={(event)=>updateContent(event)}  /> }

          
            { objType(item) == 'Bool' && <div><label>{jsonObj[item].chk_label}</label><input name={this.rootProperty+'['+index+']'} type="checkbox" key={this.rootProperty+'['+index+']'} onChange={(evt) => updateContent(evt, jsonObj[item], 'checkbox')}  checked={jsonObj[item]} /></div> }

          
            { objType(item) == 'Number' && <div><label>{input.value[item+'_lbl']}</label><span name={this.rootProperty+'['+index+']'} className="glyphicon glyphicon-plus" onClick={(event)=>updateContent(event,parseInt(jsonObj[item])+1,'number')}></span><input name={this.rootProperty+'.'+item} type='number' defaultValue={parseInt(item)} value={parseInt(item)} className='edit_form_number' onChange={(event)=>updateContent(event,undefined,'number')}  step="1" min="0"/><span  className="glyphicon glyphicon-remove" ></span><span name={this.rootProperty+'['+index+']'} className="glyphicon glyphicon-minus" onClick={(event)=>updateContent(event,parseInt(jsonObj[item])-1,'number')}></span></div> }

            {objType(item) == 'String' && (item.endsWith("img") || item.endsWith("media")) && <RenderImgWoverlay imgPath={jsonObj[item]} rootProperty={this.rootProperty+'.'+item} toggleMediaPicker={toggleMediaPicker}/> }

            {objType(item) == 'String' && item.endsWith('select') && 
              <div><select
                 name={this.rootProperty+'.'+item+'['+i+']'}
                 onChange={(evt) => updateContent(event)}>
                  {this.animOptions.map( (e,i) => <option selected={e==objType(item)}>{e}</option>)}
                  </select></div>}

            </div>
            )}
              {rootProperty.indexOf('fixed') == -1 &&  <button className="add" name={this.rootProperty+'[0]'+'~add'} onClick={(e) => {this.props.addNewContent(e,arrObj)}}><span  className="glyphicon glyphicon-plus-sign"  ></span></button>}
            </li>
      </ul>);
  }

  render() {
    let arrObj = this.props.arrObj;

     return(
     <div>
      {this.renderArrObj(arrObj)}
      </div>
      );
    }
}

export default RenderArr;

