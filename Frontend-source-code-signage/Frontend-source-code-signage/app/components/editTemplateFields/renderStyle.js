import React, { Component } from 'react';

class RenderStyle extends React.Component { 

  constructor(props) {
    super(props);
    this.rootProperty=this.props.rootProperty;
    this.renderStyleElement = this.renderStyleElement.bind(this);
    this.fontFamily=['Anton','Arial','Arial Black','Bookman','Comic Sans MS','Courier','Courier New','Fjalla One','Georgia','Garamond','HelveticaNeueBd','HelveticaNeueLt','Impact','Merienda','oswal','oswal-medium','oswal-regular','Palatino','Times New Roman','Times','Sketch-B','Sketch-R','Tahoma','Trebuchet MS','Verdana'];
    }

     getRandomInt() {
  return Math.floor(Math.random() * 200000000);
}

  renderStyleElement(){
    let {styleObj, styleRoot, updateContent} = this.props;

    return <div >{
                Object.keys(styleObj).map((item, index) =>
                <div className="style-small">
                
                 {(item.indexOf("style_label") != -1) && styleObj[item].map(e => <label className={"col-2 style-lbl "} >{e}</label>)}
                
                {(item.indexOf("fontSize") != -1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Font Size</label>}<input name={this.rootProperty+'.'+item+'['+i+']' } type="number" onChange={(event)=>updateContent(event)}  min="0.1" max="20.0" step="0.1" defaultValue={e} /></div>)}
                
                {(item.indexOf("fontFamily") != -1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Font Family</label>}<select
                 name={this.rootProperty+'.'+item+'['+i+']'}
                 
                 onChange={(evt) => updateContent(event)}>
                  {this.fontFamily.map(font => <option selected={e==font}>{font}</option>)}
                  </select>
                 </div>)}

                 {item == "color" && styleObj[item].map( (e,i) => <div>{i==0&&<label>Font Color</label>}<input name={this.rootProperty+'.'+item+'['+i+']'}  type="color" onChange={(evt) => updateContent(event)}  defaultValue={e}/></div>)}

                {(item.indexOf("backgroundColor") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Background Color</label>}<input name={this.rootProperty+'.'+item+'['+i+']'}  type="color" onChange={(evt) => updateContent(event)}  defaultValue={e}/></div>)}

                {(item.indexOf("backgroundImage") !=-1) && styleObj[item].map( (e,i) =><div>{i==0&&<label>Background Image</label>}<input name={this.rootProperty+'.'+item+'['+i+']'}  type="text" label={i==0?"Background Image":""}  /></div>)}

                {(item.indexOf("borderColor") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Border Color</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'}  type="color" onChange={(event)=>updateContent(event)} defaultValue={e}/></div>)}

                {(item.indexOf("borderWidth") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Border width</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'} type="number" onChange={(event)=>updateContent(event)}  /></div>)}

                {(item.indexOf("width") !=-1)  && styleObj[item].map( (e,i) => <div>{i==0&&<label>Width</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'}  type="number" onChange={(event)=>updateContent(event)} defaultValue={e}  /></div>)}

                {(item.indexOf("height") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Height</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'}  type="number" onChange={(event)=>updateContent(event)} defaultValue={e} /></div>)}

                {(item.indexOf("marginLeft") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Margin left</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'} type="number" onChange={(event)=>updateContent(event)} defaultValue={e}  /></div>)}

                {(item.indexOf("marginTop") !=-1) && styleObj[item].map( (e,i) => <div>{i==0&&<label>Margin Top</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'} type="number" onChange={(event)=>updateContent(event)} defaultValue={e} /></div>)}

                {item == "margin" && styleObj[item].map( (e,i) => <div>{i==0&&<label>Margin</label>}<input  name={this.rootProperty+'.'+item+'['+i+']'}  type="number"  onChange={(event)=>updateContent(event)}  defaultValue={e}/></div>)}

                </div>)}
                </div>
  }


  render() {
    
    return (

      <li className="sub-header-contain" ><h4 >{'Style This Section :'}</h4>
      {this.renderStyleElement()}
      </li>
              )
  }
}

export default RenderStyle;

