import React, { Component } from 'react';

class RenderBlob extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    return (
            <li >{
              <div ><img name={input.name} className="small-thumb" src={BASE_SERVER+'/'+ input.value.replace('app-thumbnail/','thumb/').replace('uploads','preview').replace('.mp4','.png')} />
            <div className="btn-container">  <button className="btn btn-danger-trans" onClick={(e) => (this.toggleMediaPicker(input.name,input),this.toggleModal())}>{"My Media"}</button>
            {isSchedulerApp && <select className="btn btn-danger-trans" style={{position:'absolute',left:'0px'}} onChange={(e) => (this.toggleMediaPicker(input.name, input),this.toggleModal())}>
            {appsList.apps.map((app)=><option key={app._id} >{app.appName}</option>)};
            </select>}</div>
              </div>}</li >
            )
  }
}

export default RenderBlob;

