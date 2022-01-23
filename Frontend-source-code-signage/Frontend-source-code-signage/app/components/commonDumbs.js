import React from 'react';
import MDSpinner from "react-md-spinner";


const Loading = ({isLoading}) => {
  if(isLoading){
    return (<div className="loading-container">
    <MDSpinner color1="#6CBEB9" color2="#DA7A43" color3="#6CBEB9"
        color4="#DA7A43"
      /></div>);
  }else{
    return null;
  }
  
};

const CheckBox = ({isChecked,text,onClickFn,style})=> (<span className='check-small-container' onClick={onClickFn} style={style}><span className={isChecked?'checked-box':'uncheck-box'}></span><span className='lbl-check'>{text}</span></span>);

const ToolTip = ({text}) => (

   <div className="loading-container">
   {text}</div>
  );

const TitleAndButton =({title,isHide})=>(

    <h4 style={{display:'inline-block',marginTop:'0px',wordBreak:'break-all'}} className={isHide?"hide": ""}>{title}</h4>


);

const Title = ({title,InputText,InfoIcon}) => (

  <div className="panel-default">
    {title && <div className='title-holder'>
    <h4 className="panel-heading">{title}</h4>{InfoIcon?InfoIcon :''} </div>}
    {InputText && <InputText/>}
    </div>
);

const Error =({error}) => (

    error ? <div className="alert alert-danger">
    { error.message  }
    </div>:null
  );

const ImageTiles= ({path, selct_item, index}) => (
 <div className={'slide-holder'} id={'slide'+index} onClick={()=>selct_item(index+1)}><img src={path} /></div>

)

const SelectionPopup =({title,data,isHide,close,itemSelect})=>(

    <div className={isHide?"hide": "section-popup"}>
    <div><h3>{title}</h3><span className='glyphicon glyphicon-remove' onClick={()=>close()}></span></div>
    {data.map((path,index )=> <ImageTiles selct_item={itemSelect} index={index} path={path}/>)}
    </div>

);

const CategoriesPopup =({title,data,isHide,close,itemSelect})=>(

    <div className={isHide?"hide": "section-popup"}>
    <div><h3>{title}</h3><span className='glyphicon glyphicon-remove' onClick={()=>close()}></span></div>
    <ul>{data.map((path,index )=> <li selct_item={itemSelect} index={index} path={path}></li>)}</ul>
    </div>

);

const LaunchPreview = () =>{

      let frame= document.getElementById('preview-frame');
      let templateBody =frame.contentWindow.document.getElementsByTagName('body');
       setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},2*1000);
    setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},5*1000);
        setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},10*1000);
      
};

Object.addToPath= function(o, s, r,p, cb){
    s = s.replace(/\[(\w+)\]/g, '.$1'); 
    s = s.replace(/^\./, ''); 
    var a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in o || o.length==0) {
        if (i == (n - 1)) {
          if (r == "ADD") {
                o.push(p);

            return;
          }
          if (r == "DELETE") {
            o.splice(k, 1);
           
          }
          o[k] = r;
        }
        o = o[k] ;

      } else {
        return;
      }
    }
    return o;
  }

  Object.byString = function (o, s, r, cb) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); 
    s = s.replace(/^\./, '');          
    var a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in o) {
        if (i == (n - 1)) {
          if (r == "ADD") {
            console.log('by sting', o[k] );

            return o;
           
           
          }
          else if (r == "DELETE") {
        
            o.splice(k, 1);

          }
          else{o[k] = r;return;};
        }
        o =o[k] ;
      } else {
        return o;
      }
    }
    return o;
  }


const updateActiveApp = (pathInStr, value, appData, cb) => {
    
    if(value=='ADD'){
      let originIndxPath= pathInStr;
      pathInStr =pathInStr.endsWith(']')?pathInStr.replace(/\[.*?\]\s?/g, '[0]'):pathInStr;
    var item=Object.byString(appData, pathInStr, value);
    let itemToPush=item&&item.length?(typeof(item[0]) == 'object'?JSON.parse(JSON.stringify(item[0])): item[0]):JSON.parse(JSON.stringify(item));

    Object.addToPath(appData, originIndxPath.replace('.formats',''), value, itemToPush,cb);
    if(cb){
            cb(appData);
        }

    }else if(value == 'DELETE'){

      Object.byString(appData, pathInStr, value, cb);
      if(cb){
            cb(appData);
        }
    }else{
      Object.byString(appData, pathInStr.replace('.formats',''), value,cb);
       if(cb){
            cb(appData);
        }
    }

  }



const ZoomoutPreview = (_self) => {
  function zoomout(_self){
    clearInterval(window.frameInterval);
      window.frameInterval = setInterval(function(){
        let frameNow=document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('html')[0];
         frameNow.style.zoom =_self.previewApp.orientation.toLowerCase()=='landscape'? 0.5:0.3;
         frameNow.style.overflow='hidden';
        
       },2*1000);
}
  try{
      
      zoomout(_self);
      
  }
catch(e){
  console.log(e);
  zoomout(_self);
}

}

module.exports= {LaunchPreview, Loading,Title ,Error,TitleAndButton,ToolTip,SelectionPopup,CategoriesPopup,CheckBox,updateActiveApp,ZoomoutPreview} ;
