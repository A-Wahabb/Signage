import React, { Component } from 'react';
import RenderArr from './renderArr';
import Collapsible from 'react-collapsible';
import RenderNumber from './../renderNumber';
import RenderImgWoverlay from './renderImgWithOverlay';
import RenderStyle from './RenderStyle';
import {BASE_SERVER} from '../../constants/Config';

class RenderJSON extends React.Component { 
  constructor(props) {
    super(props);
    this.renderJSONObj= this.renderJSONObj.bind(this);
    this.renderRootLblChilds = this.renderRootLblChilds.bind(this);
    this.rootProperty=this.props.rootProperty;
     this.getRandomInt=this.getRandomInt.bind(this);

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
    

  componentDidMount() {

     let titles = document.getElementsByClassName('Collapsible__trigger');
    
     for(var i=0;i< titles.length; i++){
     titles[i].style.background=this.props.themeColor;
     }
    }

  renderRootLblChilds(jsonObj){
    let { objType , appLocation, updateContent, toggleMediaPicker} = this.props;

    return (<div>
      {Object.keys(jsonObj).filter((item)=> ['root_label'].indexOf(item) == -1).map((item, index) =>
      <div >
    
      { objType(jsonObj[item]) == 'Array' && <RenderArr  arrObj={jsonObj[item]} objType={objType} updateContent={updateContent} appLocation={appLocation} rootProperty={this.rootProperty+'.'+item} toggleMediaPicker={toggleMediaPicker}
        addNewContent={this.props.addNewContent}
        removeContent={this.props.removeContent}
        /> }

      { objType(jsonObj[item]) == 'Json' && this.renderRootLblChilds(jsonObj) }
          
     { objType(jsonObj[item]) == 'String' && !(item.endsWith('select') || item.indexOf('class') != -1 || item.endsWith('_lbl')||item.endsWith('_label')||item.endsWith("img") || item.endsWith("media") || item.endsWith("placeholder")) && <input  name={this.rootProperty+'.'+item} key={this.rootProperty+'.'+item}  type="text" defaultValue={jsonObj[item]} placeholder={jsonObj[item+'_placeholder']} className='effect-16' onChange={(event)=>updateContent(event)}  /> }

     { objType(jsonObj[item]) == 'Color' && <input  name={this.rootProperty+'.'+item} key={this.rootProperty+'.'+item}  type="color" defaultValue={jsonObj[item]}  onChange={(event)=>updateContent(event)}  /> }
          
     { objType(jsonObj[item]) == 'Bool'   && <div><input  name={this.rootProperty+'.'+item}  type="checkbox"  onChange={(evt) => updateContent(evt, jsonObj[item], 'checkbox')} checked={jsonObj[item]} /></div> }

          
     { objType(jsonObj[item]) == 'Number'   && 
      <div><span name={this.rootProperty+'.'+item} className="glyphicon glyphicon-plus" onClick={(event)=>updateContent(event,parseInt(jsonObj[item])+1,'number')}></span><input name={this.rootProperty+'.'+item} type='number' value={parseInt(jsonObj[item])} defaultValue={parseInt(jsonObj[item])} className='edit_form_number' onChange={(event)=>updateContent(event,undefined,'number')}  step="1" min="0" /><span name={this.rootProperty+'.'+item} className="glyphicon glyphicon-minus" onClick={(event)=>updateContent(event,parseInt(jsonObj[item])-1,'number')}></span></div>
    }
    
     {objType(jsonObj[item]) == 'String' && !(item.endsWith('class_name') || item.endsWith('_lbl') || item.endsWith('placeholder'))&& (item.endsWith("img") || item.endsWith("media")) && <RenderImgWoverlay  imgPath={jsonObj[item]} rootProperty={this.rootProperty+'.'+item} key={this.getRandomInt()} appLocation={appLocation} toggleMediaPicker={toggleMediaPicker}/> }

     {objType(jsonObj[item]) == 'String' && !(item.endsWith('class_name') ||item.endsWith("img") || item.endsWith("media") ||  item.endsWith('placeholder')) && (item.endsWith('_lbl')||item.endsWith('_label')) && <label>{jsonObj[item]}</label> }


     {objType(jsonObj[item]) == 'String' && item.endsWith('select') && 
              <div><select
                 name={this.rootProperty+'.'+item}
                 onChange={(evt) => updateContent(event)}>
                  {this.animOptions.map( (e,i) => <option selected={e==jsonObj[item]}>{e}</option>)}
                  </select></div>}
        </div>

        )}

      </div>);
  }

  renderJSONObj(jsonObj){
      let { objType } = this.props;
      let currentParent = this.rootProperty;
      let isRootLblItem=Object.keys(jsonObj).indexOf('root_label') !== -1 ? true:false;
      let isRootSection = Object.keys(jsonObj).indexOf('css') !== -1?true: false;

      if(isRootSection){
       return (<div>
          {Object.keys(jsonObj).filter(item => (['css','tooltips','formats'].indexOf(item) == -1)).map((item, index) =>
            {
            this.rootProperty=this.props.rootProperty+'.'+item;
            return(<div>{this.renderJSONObj(jsonObj[item])}</div>);
           }
          )}
          </div>);
      }
      else if(isRootLblItem){
        currentParent = currentParent.split('.').reverse()[0];
       return <Collapsible style={{background:'#000'}} trigger={jsonObj['root_label']}  key={jsonObj['root_label']}>

              {this.renderRootLblChilds(jsonObj)}
             
              {this.parentJsonProp['css'][0]&& this.parentJsonProp['css'][0][currentParent] && this.parentJsonProp['css'][0][currentParent][0] && 
              <RenderStyle rootProperty={this.props.rootProperty+'.'+'css[0].'+currentParent+'[0]'} styleObj={this.parentJsonProp['css'][0][currentParent][0]}
                 updateContent={this.props.updateContent}/>
                
                 }
                 
          </Collapsible>;
      }
      else{
      return (
        <div>{this.renderRootLblChilds(jsonObj)}</div>
          );
        }
}

  render() {
    let { jsonObj, updateContent, appDetail} = this.props;
    let { appLocation} = this.props;
    this.parentJsonProp = JSON.parse(JSON.stringify(jsonObj));

    let guidePath ="";
    if(appDetail){
    guidePath=appDetail.thumb|| appDetail.thumbnailPath ? BASE_SERVER+'/'+ appDetail.thumbnailPath.replace('app-thumbnail','thumb').replace('.png','.jpg'):"";
        guidePath = !guidePath && appDetail._id ? BASE_SERVER+'/thumb/'+ appDetail._id+'.jpg':guidePath;
        
    }
    return  (
        <li>
        {this.renderJSONObj(jsonObj)}
        {guidePath && <div style={{bordertop:'1px solid #ccc',paddingTop:'20px'}}><h4 style={{textAlign:'center'}}>Instructions</h4>
        <label>{"In order to update content, Please, expand zone/section rows above. And also refer below image for zone's positions"}</label>
        <img  src={guidePath} alt='242x200'/>
        <h4 style={{textAlign:'center'}}>Notes</h4>
         <li><label>{"- Preview works appx. 95%~100% as compare with actual on device"}</label></li>
         <li><label>{"- Few features will only on devices, due to browser's security concerns. e.g weather, custom third pary data access, sometime video play etc..."}</label></li>
         <li><label>{"- For customization of any third party data, adding features to any template or adding new temlate as you wish, please contact admin or sales persons."}</label></li>
        </div>}
        </li>
        
        );
    }
}

export default RenderJSON;
