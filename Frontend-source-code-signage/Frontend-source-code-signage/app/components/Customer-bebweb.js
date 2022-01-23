
import React, { Component, PropTypes } from 'react';
import {Loading,Error} from './commonDumbs';
import {IsPublicSignup,PrimaryColor} from '../constants/Config';
import Collapsible from 'react-collapsible';
import { toast } from 'react-toastify';
//import S3FileUpload from 'react-s3';

class BebWeb extends Component {
  constructor() {
    super();
    this.state ={bebData: {
      wtwedo: {
      'watwedo-title':"ds",
      'watwedo-desc':"",
      'do1-title':"",
      'do1-desc':"",
      'do2-title':"",
      'do2-desc':"",
      'do3-title':"",
      'do3-desc':"",
      'do4-title':"",
      'do4-desc':"",
      'do5-title':"",
      'do5-desc':"",
      'do6-title':"",
      'do6-desc':""
     },
    howitwork: {
      'how-title':"",
      'how-desc':""
     },

    evrything : {
      'evry-title':"",
      'evry-desc':"",

      'evry1-title':"",
      'evry1-desc':"",
      'evry2-title':"",
      'evry2-desc':"",
      'evry3-title':"",
      'evry3-desc':"",
      'evry4-title':"",
      'evry4-desc':"",
      'evry5-title':"",
      'evry5-desc':"",
      'evry6-title':"",
      'evry6-desc':""
     },
     adertisenet : {
      'adnet-title':"",
      'adnet-desc':"",
     
      'adnet1-title':"",
      'adnet1-desc':"",
      'adnet2-title':"",
      'adnet2-desc':"",
      'adnet3-title':"",
      'adnet3-desc':"",
      'adnet4-title':"",
      'adnet4-desc':"",
      'adnet5-title':"",
      'adnet5-desc':""
     },

    whyus: {
      'whyus-title':"",
      'whyus-desc':"",
     
      'whyus1-title':"",
      'whyus1-desc':"",
      'whyus2-title':"",
      'whyus2-desc':"",
      'whyus3-title':"",
      'whyus3-desc':"",
      'whyus4-title':"",
      'whyus4-desc':""
    
     },

    casestudy:{
      'case-title':"",
      'case-desc':"",
     
      'case1-title':"",
      'case1-desc':"",
      'case2-title':"",
      'case2-desc':"",
      'case3-title':"",
      'case3-desc':""
    
     },

     faq: {
      'faq-title':"",
      'faq-desc':"",

       'faq1-title':"",
      'faq1-desc':"",
      'faq2-title':"",
      'faq2-desc':"",
      'faq3-title':"",
      'faq3-desc':"",
      'faq4-title':"",
      'faq4-desc':"",
      'faq5-title':"",
      'faq5-desc':"",
      'faq6-title':"",
      'faq6-desc':""
     },

     retails: {
      'rtl-root-title':"",
      'rtl-root-desc':"",
      'rtl-title':"",
      'rtl-desc':"",
      'rtl1-title':"",
      'rtl1-desc':"",
      'rtl2-title':"",
      'rtl2-desc':"",
      'rtl3-title':"",
      'rtl3-desc':"",
      'rtl4-title':"",
      'rtl4-desc':"",
      'rtl5-title':"",
      'rtl5-desc':"",
      'rtl6-title':"",
      'rtl6-desc':"",

      'rtl1-mr-title':"",
      'rtl1-mr-desc':"",
      'rtl2-mr-title':"",
      'rtl2-mr-desc':""
     },

      hc: {
      'hc-root-title':"",
      'hc-root-desc':"",

      'hc-title':"",
      'hc-desc':"",
       'hc1-title':"",
      'hc1-desc':"",
      'hc2-title':"",
      'hc2-desc':"",
      'hc3-title':"",
      'hc3-desc':"",

      'hc1-mr-title':"",
      'hc1-mr-desc':"",
      'hc2-mr-title':"",
      'hc2-mr-desc':"",
      'hc3-mr-title':"",
      'hc3-mr-desc':"",
      'hc4-mr-title':"",
      'hc4-mr-desc':""
     },

     ro: {
        'ro-root-title':"",
      'ro-root-desc':"",

      'ro-title':"",
      'ro-desc':"",
      'ro1-title':"",
      'ro1-desc':"",
      'ro2-title':"",
      'ro2-desc':"",
      'ro3-title':"",
      'ro3-desc':"",

      'ro1-mr-title':"",
      'ro1-mr-desc':"",
      'ro2-mr-title':"",
      'ro2-mr-desc':"",
      'ro3-mr-title':"",
      'ro3-mr-desc':"",
      'ro4-mr-title':"",
      'ro4-mr-desc':""
     },

     edu:{
       'edu-root-title':"",
      'edu-root-desc':"",

      'edu-title':"",
      'edu-desc':"",
      'edu1-title':"",
      'edu1-desc':"",
      'edu2-title':"",
      'edu2-desc':"",
      'edu3-title':"",
      'edu3-desc':"",

      'edu1-mr-title':"",
      'edu1-mr-desc':"",
      'edu2-mr-title':"",
      'edu2-mr-desc':"",
      'edu3-mr-title':"",
      'edu3-mr-desc':"",
      'edu4-mr-title':"",
      'edu4-mr-desc':""
     },

     enter:{
      'enter-root-title':"",
      'enter-root-desc':"",

      'enter-title':"",
      'enter-desc':"",

      'enter1-title':"",
      'enter1-desc':"",
      'enter2-title':"",
      'enter2-desc':"",
      'enter3-title':"",
      'enter3-desc':"",

      'enter1-mr-title':"",
      'enter1-mr-desc':"",
      'enter2-mr-title':"",
      'enter2-mr-desc':"",
      'enter3-mr-title':"",
      'enter3-mr-desc':"",
      'enter4-mr-title':"",
      'enter4-mr-desc':""
     },

     sport:{

      'sport-root-title':"",
      'sport-root-desc':"",

      'sport-title':"",
      'sport-desc':"",

      'sport1-title':"",
      'sport1-desc':"",
      'sport2-title':"",
      'sport2-desc':"",
      'sport3-title':"",
      'sport3-desc':"",

      'sport1-mr-title':"",
      'sport1-mr-desc':"",
      'sport2-mr-title':"",
      'sport2-mr-desc':"",
      'sport3-mr-title':"",
      'sport3-mr-desc':"",
      'sport4-mr-title':"",
      'sport4-mr-desc':""
     },

     hospitality:{
      'hospitality-root-title':"",
      'hospitality-root-desc':"",

      'hospitality-title':"",
      'hospitality-desc':"",
      'hospitality1-title':"",
      'hospitality1-desc':"",
      'hospitality2-title':"",
      'hospitality2-desc':"",
      'hospitality3-title':"",
      'hospitality3-desc':"",

      'hospitality1-mr-title':"",
      'hospitality1-mr-desc':"",
      'hospitality2-mr-title':"",
      'hospitality2-mr-desc':"",
      'hospitality3-mr-title':"",
      'hospitality3-mr-desc':"",
      'hospitality4-mr-title':"",
      'hospitality4-mr-desc':""
     },

     dmenu:{
      'dmenu-root-title':"",
      'dmenu-root-desc':"",

      'dmenu-title':"",
      'dmenu-desc':"",
      'dmenu1-title':"",
      'dmenu1-desc':"",
      'dmenu2-title':"",
      'dmenu2-desc':"",
      'dmenu3-title':"",
      'dmenu3-desc':"",

      'dmenu1-mr-title':"",
      'dmenu1-mr-desc':"",
      'dmenu2-mr-title':"",
      'dmenu2-mr-desc':"",
      'dmenu3-mr-title':"",
      'dmenu3-mr-desc':"",
      'dmenu4-mr-title':"",
      'dmenu4-mr-desc':""
     },
     malls:{
      'malls-root-title':"",
      'malls-root-desc':"",

      'malls-title':"",
      'malls-desc':"",
      'malls1-title':"",
      'malls1-desc':"",
      'malls2-title':"",
      'malls2-desc':"",
      'malls3-title':"",
      'malls3-desc':"",

      'malls1-mr-title':"",
      'malls1-mr-desc':"",
      'malls2-mr-title':"",
      'malls2-mr-desc':"",
      'malls3-mr-title':"",
      'malls3-mr-desc':"",
      'malls4-mr-title':"",
      'malls4-mr-desc':""
     },

      price:{
      'price-root-title':"",
      'price-root-desc':"",

       'price-title':"",
      'price-desc':"",

      'price-ev-title':"",
      'price-ev-header':"",
      'price-ev-desc':"",
      'price-ev-offer1':"",
      'price-ev-offer2':"",
      'price-ev-offer3':"",
      'price-ev-offer4':"",
      'price-ev-offer5':"",

      'price-biz-title':"",
      'price-biz-header':"",
      'price-biz-desc':"",
      'price-biz-offer1':"",
      'price-biz-offer2':"",
      'price-biz-offer3':"",
      'price-biz-offer4':"",
      'price-biz-offer5':"",
      'price-biz-offer6':"",
      'price-biz-offer7':"",
      'price-biz-offer8':"",

      'price-part-title':"",
      'price-part-header':"",
      'price-part-desc':"",
      'price-part-offer1':"",
      'price-part-offer2':"",
      'price-part-offer3':"",
      'price-part-offer4':"",
      'price-part-offer5':"",
      'price-part-offer6':"",
      'price-part-offer7':"",
      'price-part-offer8':"",
      'price-part-offer9':"",
      'price-part-offer10':"",

      'price-sec-title':"",

      'price1-title':"",
      'price1-desc':"",
      'price2-title':"",
      'price2-desc':"",
      'price3-title':"",
      'price3-desc':"",

      'price4-title':"",
      'price4-desc':"",
      'price5-title':"",
      'price5-desc':"",
      'price6-title':"",
      'price6-desc':"",

      'price7-title':"",
      'price7-desc':"",
      'price8-title':"",
      'price8-desc':"",
      'price9-title':"",
      'price9-desc':"",

      'price10-title':"",
      'price10-desc':"",
      'price11-title':"",
      'price11-desc':"",
      'price12-title':"",
      'price12-desc':"",

      'price13-title':"",
      'price13-desc':"",
      'price14-title':"",
      'price14-desc':"",
      'price15-title':"",
      'price15-desc':"",

      'price16-title':"",
      'price16-desc':"",
      'price17-title':"",
      'price17-desc':"",
      'price18-title':"",
      'price18-desc':""

     },

      contact:{
      'contact-root-title':"",
      'contact-root-desc':"",
      'contact-mr-title':"",
      'contact-mr-desc':""
     },

      about:{
      'about-root-title':"",
      'about-root-desc':"",
      'about-mr-title':"",
      'about-mr-desc':""
     },

     privacy:{
      'privacy-root-title':"",
      'privacy-root-desc':"",
      'privacy1-mr-title':"",
      'privacy1-mr-desc':"",
      'privacy2-mr-title':"",
      'privacy2-mr-desc':"",
      'privacy3-mr-title':"",
      'privacy3-mr-desc':"",
      'privacy4-mr-title':"",
      'privacy4-mr-desc':"",
      'privacy5-mr-title':"",
      'privacy5-mr-desc':"",
      'privacy6-mr-title':"",
      'privacy6-mr-desc':"",
      'privacy7-mr-title':"",
      'privacy7-mr-desc':"",
      'privacy8-mr-title':"",
      'privacy8-mr-desc':"",
      'privacy9-mr-title':"",
      'privacy9-mr-desc':"",
      'privacy10-mr-title':"",
      'privacy10-mr-desc':"",
      'privacy11-mr-title':"",
      'privacy11-mr-desc':"",

      'privacy12-mr-title':"",
      'privacy12-mr-desc':"",
      'privacy13-mr-title':"",
      'privacy13-mr-desc':""
      
     },
      guide:{
      'guide-root-title':"",
      'guide-root-desc':"",
      'guide-title':"",
      'guide-desc':"",

      'guide1-title':"",
      'guide1-desc':"",
      'guide2-title':"",
      'guide2-desc':"",
      'guide3-title':"",
      'guide3-desc':"",
      'guide4-title':"",
      'guide4-desc':"",
      'guide5-title':"",
      'guide5-desc':"",

      'guide1-mr-title':"",
      'guide1-mr-desc':"",
      'guide2-mr-title':"",
      'guide2-mr-desc':"",
      'guide3-mr-title':"",
      'guide3-mr-desc':"",
      'guide4-mr-title':"",
      'guide4-mr-desc':""

      
     },
      common:{
        'fb-pg':"",
        'twitter-pg':"",
        'insta-pg': "",
        'beb-pg': "",
        'ph-pg':"",
        'em-pg':""
      }



    }, isData:false};
    this.saveWebData = this.saveWebData.bind(this);
   this.updateWebData = this.updateWebData.bind(this);
  }
 
 componentDidMount(){
    
    this.props.fetchBebWebReq();
 }

 componentDidUpdate(prevState,prevProps){
  console.log('fi-----',this.props.bebweb);
  if(!this.state.isData && this.props.bebweb.list && this.props.bebweb.list[0]){
    console.log('final beb', this.props.bebweb);
    let data = this.props.bebweb.list[0];
    data.wtwedo = JSON.parse(data.wtwedo);
    data.howitwork = JSON.parse(data.howitwork);
    data.evrything= JSON.parse(data.evrything);
    data.adertisenet= JSON.parse(data.adertisenet);
    data.whyus= JSON.parse(data.whyus);
    data.casestudy= JSON.parse(data.casestudy);
    data.faq= JSON.parse(data.faq);
    data.retails= JSON.parse(data.retails);
    data.hc= JSON.parse(data.hc);
    data.ro= JSON.parse(data.ro);
    data.edu= JSON.parse(data.edu);
    data.enter= JSON.parse(data.enter);
    data.sport= JSON.parse(data.sport);
    data.hospitality= JSON.parse(data.hospitality);
    data.dmenu = JSON.parse(data.dmenu);
    data.malls = JSON.parse(data.malls);
    data.price = JSON.parse(data.price);
    data.contact = JSON.parse(data.contact);
    data.about = JSON.parse(data.about);
    data.privacy = JSON.parse(data.privacy);
    data.guide = JSON.parse(data.guide);
    data.common = JSON.parse(data.common);
    this.setState({
      bebData : data,
      isData: true
    });
    
  }

 }

  saveWebData(){
    let bebData= {};

     bebData.wtwedo = JSON.stringify(this.state.bebData.wtwedo);
    
    bebData.howitwork = JSON.stringify(this.state.bebData.howitwork);
    
    bebData.evrything = JSON.stringify(this.state.bebData.evrything);

    bebData.adertisenet = JSON.stringify(this.state.bebData.adertisenet);
    bebData.whyus= JSON.stringify(this.state.bebData.whyus);

    bebData.casestudy=JSON.stringify(this.state.bebData.casestudy);

    bebData.faq= JSON.stringify(this.state.bebData.faq);

    bebData.retails= JSON.stringify(this.state.bebData.retails);
    bebData.dmenu= JSON.stringify(this.state.bebData.dmenu);

    bebData.hc= JSON.stringify(this.state.bebData.hc);
    bebData.ro= JSON.stringify(this.state.bebData.ro);

    bebData.edu= JSON.stringify(this.state.bebData.edu);
    bebData.enter= JSON.stringify(this.state.bebData.enter);
    bebData.sport= JSON.stringify(this.state.bebData.sport);
    bebData.hospitality= JSON.stringify(this.state.bebData.hospitality);
    bebData.malls = JSON.stringify(this.state.bebData.malls);
    bebData.price = JSON.stringify(this.state.bebData.price);
    bebData.contact = JSON.stringify(this.state.bebData.contact);
    bebData.about = JSON.stringify(this.state.bebData.about);
    bebData.privacy = JSON.stringify(this.state.bebData.privacy);
    bebData.guide = JSON.stringify(this.state.bebData.guide);
    bebData.common = JSON.stringify(this.state.bebData.common);

      if(this.state.bebData._id){
    this.props.updateBebWeb(bebData);
      }else{
    this.props.saveBebWebData(bebData);
    }
  }

  updateWebData(e,section){
    let sub = e.target.id;
    let data = this.state.bebData;
    data[section][sub] = e.target.value;

    this.setState({
      bebData: data
    });
  }

  uploadImages(e,dir){
//     let config={
//       bucketName: S3Bucket,
//       dirName: dir, /* optional */
//       region: S3Region,
//       accessKeyId: S3AccessKeyId,
//       secretAccessKey: S3SecretCode
//     };
// console.log('S3----', config);
//     S3FileUpload.uploadFile(e.target.files[0],config).
//     then((data) => {
//       console.log(data.location);
//       toast.success('Upload Done!');
//     }).
//     catch( (err) => {
//       console.log('errr', err);
//       toast.error('Upload Failed!');
//     })


      toast.info('UPLOADING...PLEASE WAIT...!')
      // Create an object of formData
      const formData = new FormData();
      
      // Update the formData object
      formData.append(
        "img_path",
        e.target.files[0],
        e.target.files[0].name
      );
    
      // Details of the uploaded file
      console.log(e.target.files[0]);
    
      // Request made to the backend api
      // Send formData object
      //axios.post("api/uploadfile", formData);
      this.props.uploadFile(formData, dir);

  }


  render() {

    const {bebweb} = this.props;
    console.log('beb state', this.state.bebData);
    let data = this.state.bebData;

    return (
      <div className='formweb'>
       <div style={{textAlign:'right'}}>
           <button
                    onClick={() =>this.saveWebData()}
                    className="btn btn-primary"
                    style={{marginRight:'110px',marginBottom:'20px',position:'relative'}}
                    >
                    SAVE
            </button>
        </div>
      <Collapsible trigger={"Landing Page"}  key={'landing'}>
       <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>What we do</h1>
        <input id='watwedo-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["watwedo-title"]} />
        <input id='watwedo-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')} value={data.wtwedo["watwedo-desc"]} />
        </li>
        <li>
         <input id='do1-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do1-title"]} />
         <input id='do1-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do1-desc"]} />

         <input id='do2-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do2-title"]} />
         <input id='do2-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do2-desc"]} />

         <input id='do3-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do3-title"]} />
         <input id='do3-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do3-desc"]} />

         <input id='do4-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do4-title"]} />
         <input id='do4-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do4-desc"]} />

         <input id='do5-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do5-title"]} />
         <input id='do5-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do5-desc"]} />

         <input id='do6-title' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do6-title"]} />
         <input id='do6-desc' type='text' onChange={(e)=>this.updateWebData(e,'wtwedo')}  value={data.wtwedo["do6-desc"]} />

        </li>

      </ul>

      <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>How it works</h1>
        <input id='how-title'type='text' onChange={(e)=>this.updateWebData(e,'howitwork')}  value={data.howitwork["how-title"]} />
        <input id='how-desc'type='text' onChange={(e)=>this.updateWebData(e,'howitwork')}  value={data.howitwork["how-desc"]} />
        </li>

      </ul>

      <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>Everything You Need for Digital Signage</h1>
        <input id='evry-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry-title"]} />
        <input id='evry-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry-desc"]} />
        </li>
         <li>
         <input id='evry1-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry1-title"]} />
         <input id='evry1-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry1-desc"]} />

         <input id='evry2-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry2-title"]} />
         <input id='evry2-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry2-desc"]} />

         <input id='evry3-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry3-title"]} />
         <input id='evry3-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry3-desc"]} />

         <input id='evry4-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry4-title"]} />
         <input id='evry4-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry4-desc"]} />

         <input id='evry5-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry5-title"]} />
         <input id='evry5-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry5-desc"]} />

         <input id='evry6-title' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry6-title"]} />
         <input id='evry6-desc' type='text' onChange={(e)=>this.updateWebData(e,'evrything')}  value={data.evrything["evry6-desc"]} />

        </li>
      </ul>

      <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>Advertising Networks</h1>
        <input id='adnet-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet-title"]} />
        <input id='adnet-desc' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet-desc"]} />
        </li>
         <li>
         <input id='adnet1-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet1-title"]} />
         <input id='adnet1-desc' type='text'onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet1-desc"]} />

         <input id='adnet2-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet2-title"]} />
         <input id='adnet2-desc' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet2-desc"]} />

         <input id='adnet3-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet3-title"]} />
         <input id='adnet3-desc' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet3-desc"]} />

         <input id='adnet4-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet4-title"]} />
         <input id='adnet4-desc' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet4-desc"]} />

         <input id='adnet5-title' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet5-title"]} />
         <input id='adnet5-desc' type='text' onChange={(e)=>this.updateWebData(e,'adertisenet')}  value={data.adertisenet["adnet5-desc"]} />

        

        </li>
      </ul>


      <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>Why Us?</h1>
        <input id='whyus-title' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus-title"]} />
        <input id='whyus-desc' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus-desc"]} />
        </li>
         <li>
         <input id='whyus1-title' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus1-title"]} />
         <input id='whyus1-desc' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus1-desc"]} />

         <input id='whyus2-title' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus2-title"]} />
         <input id='whyus2-desc' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus2-desc"]} />

         <input id='whyus3-title' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus3-title"]} />
         <input id='whyus3-desc' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus3-desc"]} />

         <input id='whyus4-title' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus4-title"]} />
         <input id='whyus4-desc' type='text' onChange={(e)=>this.updateWebData(e,'whyus')}  value={data.whyus["whyus4-desc"]} />
        
        </li>
      </ul>

      <ul className="nav  nav-pills ">
        <li className="" role="">
        <h1>Case studies</h1>
        <input id='case-title' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case-title"]} />
        <input id='case-desc' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case-desc"]} />
        </li>
         <li>
         <input id='case1-title' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case1-title"]} />
         <input id='case1-desc' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case1-desc"]} />

         <input id='case2-title' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case2-title"]} />
         <input id='case2-desc' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case2-desc"]} />

         <input id='case3-title' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case3-title"]} />
         <input id='case3-desc' type='text' onChange={(e)=>this.updateWebData(e,'casestudy')}  value={data.casestudy["case3-desc"]} />

        </li>
      </ul>


      <ul className="nav nav-pills">
        <li className="" role="">
        <h1>FAQ</h1>
        <input id='faq-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq-title"]} />
        <input id='faq-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq-desc"]} />
        </li>
         <li>
         <input id='faq1-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq1-title"]} />
         <input id='faq1-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq1-desc"]} />

         <input id='faq2-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq2-title"]} />
         <input id='faq2-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq2-desc"]} />

         <input id='faq3-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq3-title"]} />
         <input id='faq3-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq3-desc"]} />

         <input id='faq4-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq4-title"]} />
         <input id='faq4-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq4-desc"]} />

         <input id='faq5-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq5-title"]} />
         <input id='faq5-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq5-desc"]} />

         <input id='faq6-title' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq6-title"]} />
         <input id='faq6-desc' type='text' onChange={(e)=>this.updateWebData(e,'faq')}  value={data.faq["faq6-desc"]} />

        </li>
      </ul>
      </Collapsible>

      <Collapsible trigger={"Retail Page"}  key={'retail-page'}>

           <ul className="nav nav-pills">
        <li className="" role="">
        <h1>RETAIL</h1>
        <input id='rtl-root-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl-root-title"]} />
        <input id='rtl-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl-root-desc"]} />
        </li>
        
        <li className="" role="">
        <input id='rtl-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl-title"]} />
        <input id='rtl-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl-desc"]} />
        </li>

         <li>
         <input id='rtl1-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl1-title"]} />
         <input id='rtl1-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl1-desc"]} />

         <input id='rtl2-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl2-title"]} />
         <input id='rtl2-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl2-desc"]} />

         <input id='rtl3-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl3-title"]} />
         <input id='rtl3-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl3-desc"]} />

         <input id='rtl4-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl4-title"]} />
         <input id='rtl4-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl4-desc"]} />

         <input id='rtl5-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl5-title"]} />
         <input id='rtl5-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl5-desc"]} />

         <input id='rtl6-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl6-title"]} />
         <input id='rtl6-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl6-desc"]} />


          <input id='rtl1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl1-mr-title"]} />
         <input id='rtl1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl1-mr-desc"]} />

         <input id='rtl2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl2-mr-title"]} />
         <input id='rtl2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'retails')}  value={data.retails["rtl2-mr-desc"]} />

        </li>
      </ul>

      </Collapsible>

      <Collapsible trigger={"HealthCare Page"}  key={'healthcare-page'}>

   <ul className="nav nav-pills" >
      <li className="" role="">
        <h1>HEALTHCARE</h1>
        <input id='hc-root-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc-root-title"]} />
        <input id='hc-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc-root-desc"]} />
        </li>
        
        <li className="" role="">
        <input id='hc-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc-title"]} />
        <input id='hc-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc-desc"]} />
        </li>

         <li>
         <input id='hc1-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc1-title"]} />
         <input id='hc1-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc1-desc"]} />

         <input id='hc2-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc2-title"]} />
         <input id='hc2-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc2-desc"]} />

         <input id='hc3-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc3-title"]} />
         <input id='hc3-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc3-desc"]} />



          <input id='hc1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc1-mr-title"]} />
         <input id='hc1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc1-mr-desc"]} />

         <input id='hc2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc2-mr-title"]} />
         <input id='hc2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc2-mr-desc"]} />

          <input id='hc3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc3-mr-title"]} />
         <input id='hc3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc3-mr-desc"]} />

         <input id='hc4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc4-mr-title"]} />
         <input id='hc4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hc')}  value={data.hc["hc4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>


          <Collapsible trigger={"Religious Page"}  key={'religious-page'}>

   <ul className="nav nav-pills">
      <li className="" role="">
        <h1>RELIGIOUS</h1>
        <input id='ro-root-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro-root-title"]} />
        <input id='ro-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro-root-desc"]} />
        </li>
        
        <li className="" role="">
        <input id='ro-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro-title"]} />
        <input id='ro-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro-desc"]} />
        </li>

         <li>
         <input id='ro1-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro1-title"]} />
         <input id='ro1-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro1-desc"]} />

         <input id='ro2-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro2-title"]} />
         <input id='ro2-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro2-desc"]} />

         <input id='ro3-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro3-title"]} />
         <input id='ro3-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro3-desc"]} />



          <input id='ro1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro1-mr-title"]} />
         <input id='ro1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro1-mr-desc"]} />

         <input id='ro2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro2-mr-title"]} />
         <input id='ro2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro2-mr-desc"]} />

          <input id='ro3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro3-mr-title"]} />
         <input id='ro3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro3-mr-desc"]} />

         <input id='ro4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro4-mr-title"]} />
         <input id='ro4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'ro')}  value={data.ro["ro4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>


         <Collapsible trigger={"Education Page"}  key={'education-page'}>

      <ul className="nav nav-pills">
      <li className="" edule="">
        <h1>EDUCATION</h1>
        <input id='edu-root-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu-root-title"]} />
        <input id='edu-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu-root-desc"]} />
        </li>
        
        <li className="" edule="">
        <input id='edu-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu-title"]} />
        <input id='edu-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu-desc"]} />
        </li>

         <li>
         <input id='edu1-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu1-title"]} />
         <input id='edu1-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu1-desc"]} />

         <input id='edu2-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu2-title"]} />
         <input id='edu2-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu2-desc"]} />

         <input id='edu3-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu3-title"]} />
         <input id='edu3-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu3-desc"]} />



          <input id='edu1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu1-mr-title"]} />
         <input id='edu1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu1-mr-desc"]} />

         <input id='edu2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu2-mr-title"]} />
         <input id='edu2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu2-mr-desc"]} />

          <input id='edu3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu3-mr-title"]} />
         <input id='edu3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu3-mr-desc"]} />

         <input id='edu4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu4-mr-title"]} />
         <input id='edu4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'edu')}  value={data.edu["edu4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>


         <Collapsible trigger={"Entertainment Page"}  key={'entertainment-page'}>

   <ul className="nav  nav-pills ">
      <li className="" enterle="">
        <h1>ENTERTAINMENT</h1>
        <input id='enter-root-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter-root-title"]} />
        <input id='enter-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter-root-desc"]} />
        </li>
        
        <li className="" enterle="">
        <input id='enter-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter-title"]} />
        <input id='enter-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter-desc"]} />
        </li>

         <li>
         <input id='enter1-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter1-title"]} />
         <input id='enter1-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter1-desc"]} />

         <input id='enter2-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter2-title"]} />
         <input id='enter2-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter2-desc"]} />

         <input id='enter3-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter3-title"]} />
         <input id='enter3-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter3-desc"]} />



          <input id='enter1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter1-mr-title"]} />
         <input id='enter1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter1-mr-desc"]} />

         <input id='enter2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter2-mr-title"]} />
         <input id='enter2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter2-mr-desc"]} />

          <input id='enter3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter3-mr-title"]} />
         <input id='enter3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter3-mr-desc"]} />

         <input id='enter4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter4-mr-title"]} />
         <input id='enter4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'enter')}  value={data.enter["enter4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>

         <Collapsible trigger={"Sport Page"}  key={'sport-page'}>

        <ul className="nav  nav-pills ">
      <li className="" sportle="">
        <h1>SPORTS</h1>
        <input id='sport-root-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport-root-title"]} />
        <input id='sport-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport-root-desc"]} />
        </li>
        
        <li className="" sportle="">
        <input id='sport-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport-title"]} />
        <input id='sport-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport-desc"]} />
        </li>

         <li>
         <input id='sport1-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport1-title"]} />
         <input id='sport1-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport1-desc"]} />

         <input id='sport2-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport2-title"]} />
         <input id='sport2-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport2-desc"]} />

         <input id='sport3-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport3-title"]} />
         <input id='sport3-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport3-desc"]} />



          <input id='sport1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport1-mr-title"]} />
         <input id='sport1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport1-mr-desc"]} />

         <input id='sport2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport2-mr-title"]} />
         <input id='sport2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport2-mr-desc"]} />

          <input id='sport3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport3-mr-title"]} />
         <input id='sport3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport3-mr-desc"]} />

         <input id='sport4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport4-mr-title"]} />
         <input id='sport4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'sport')}  value={data.sport["sport4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>



         <Collapsible trigger={"hospitality Page"}  key={'hospitality-page'}>

   <ul className="nav  nav-pills ">
      <li className="" hospitalityle="">
        <h1>HOSPITALITY</h1>
        <input id='hospitality-root-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality-root-title"]} />
        <input id='hospitality-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality-root-desc"]} />
        </li>
        
        <li className="" hospitalityle="">
        <input id='hospitality-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality-title"]} />
        <input id='hospitality-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality-desc"]} />
        </li>

         <li>
         <input id='hospitality1-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality1-title"]} />
         <input id='hospitality1-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality1-desc"]} />

         <input id='hospitality2-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality2-title"]} />
         <input id='hospitality2-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality2-desc"]} />

         <input id='hospitality3-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality3-title"]} />
         <input id='hospitality3-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality3-desc"]} />



          <input id='hospitality1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality1-mr-title"]} />
         <input id='hospitality1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality1-mr-desc"]} />

         <input id='hospitality2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality2-mr-title"]} />
         <input id='hospitality2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality2-mr-desc"]} />

          <input id='hospitality3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality3-mr-title"]} />
         <input id='hospitality3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality3-mr-desc"]} />

         <input id='hospitality4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality4-mr-title"]} />
         <input id='hospitality4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'hospitality')}  value={data.hospitality["hospitality4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>

         <Collapsible trigger={"Digital menu Page"}  key={'dmenu-page'}>

   <ul className="nav  nav-pills ">
      <li className="" dmenule="">
        <h1>Digital Menu</h1>
        <input id='dmenu-root-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu-root-title"]} />
        <input id='dmenu-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu-root-desc"]} />
        </li>
        
        <li className="" dmenule="">
        <input id='dmenu-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu-title"]} />
        <input id='dmenu-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu-desc"]} />
        </li>

         <li>
         <input id='dmenu1-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu1-title"]} />
         <input id='dmenu1-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu1-desc"]} />

         <input id='dmenu2-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu2-title"]} />
         <input id='dmenu2-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu2-desc"]} />

         <input id='dmenu3-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu3-title"]} />
         <input id='dmenu3-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu3-desc"]} />



          <input id='dmenu1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu1-mr-title"]} />
         <input id='dmenu1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu1-mr-desc"]} />

         <input id='dmenu2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu2-mr-title"]} />
         <input id='dmenu2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu2-mr-desc"]} />

          <input id='dmenu3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu3-mr-title"]} />
         <input id='dmenu3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu3-mr-desc"]} />

         <input id='dmenu4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu4-mr-title"]} />
         <input id='dmenu4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'dmenu')}  value={data.dmenu["dmenu4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>

    
    <Collapsible trigger={"Malls Page"}  key={'malls-page'}>

      <ul className="nav  nav-pills ">
      <li className="" mallsle="">
        <h1>Malls Digital signage</h1>
        <input id='malls-root-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls-root-title"]} />
        <input id='malls-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls-root-desc"]} />
        </li>
        
        <li className="" mallsle="">
        <input id='malls-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls-title"]} />
        <input id='malls-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls-desc"]} />
        </li>

         <li>
         <input id='malls1-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls1-title"]} />
         <input id='malls1-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls1-desc"]} />

         <input id='malls2-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls2-title"]} />
         <input id='malls2-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls2-desc"]} />

         <input id='malls3-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls3-title"]} />
         <input id='malls3-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls3-desc"]} />



          <input id='malls1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls1-mr-title"]} />
         <input id='malls1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls1-mr-desc"]} />

         <input id='malls2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls2-mr-title"]} />
         <input id='malls2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls2-mr-desc"]} />

          <input id='malls3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls3-mr-title"]} />
         <input id='malls3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls3-mr-desc"]} />

         <input id='malls4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls4-mr-title"]} />
         <input id='malls4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'malls')}  value={data.malls["malls4-mr-desc"]} />
         </li>
         </ul>

         </Collapsible>

        <Collapsible trigger={"Price Page"}  key={'price-page'}>

      <ul className="nav  nav-pills ">
      <li className="" >
        <h1>Price Digital signage</h1>
        <input id='price-root-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-root-title"]} />
        <input id='price-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-root-desc"]} />
        </li>
        
        <li className="" >
        <input id='price-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-title"]} />
        <input id='price-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-desc"]} />
        </li>

        <li className="" >
        
        <input id='price-ev-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-title"]} />

        <input id='price-ev-header' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-desc"]} />

        <input id='price-ev-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-desc"]} />

         <input id='price-ev-offer1' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer1"]} />

         <input id='price-ev-offer2' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer2"]} />

         <input id='price-ev-offer3' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer3"]} />

         <input id='price-ev-offer4' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer4"]} />

         <input id='price-ev-offer5' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer5"]} />
         
         </li>


         <li className="" >
        
        <input id='price-biz-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-title"]} />

        <input id='price-biz-header' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-header"]} />

        <input id='price-biz-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-desc"]} />

         <input id='price-biz-offer1' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer1"]} />

         <input id='price-biz-offer2' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer2"]} />

         <input id='price-biz-offer3' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer3"]} />

         <input id='price-biz-offer4' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer4"]} />

         <input id='price-ev-offer5' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer5"]} />

          <input id='price-ev-offer6' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer6"]} />

           <input id='price-ev-offer7' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer7"]} />

            <input id='price-ev-offer8' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-ev-offer8"]} />

         </li>

         <li className="" >
        
        <input id='price-biz-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-title"]} />

        <input id='price-biz-header' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-header"]} />

        <input id='price-biz-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-desc"]} />

         <input id='price-biz-offer1' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer1"]} />

         <input id='price-biz-offer2' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer2"]} />

         <input id='price-biz-offer3' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer3"]} />

         <input id='price-biz-offer4' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer4"]} />

         <input id='price-biz-offer5' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer5"]} />

          <input id='price-biz-offer6' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer6"]} />

           <input id='price-biz-offer7' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer7"]} />

            <input id='price-biz-offer8' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-biz-offer8"]} />

         
         </li>

         <li className="" >
        
        <input id='price-part-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-title"]} />

        <input id='price-part-header' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-header"]} />

        <input id='price-part-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-desc"]} />

         <input id='price-part-offer1' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer1"]} />

         <input id='price-part-offer2' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer2"]} />

         <input id='price-part-offer3' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer3"]} />

         <input id='price-part-offer4' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer4"]} />

         <input id='price-part-offer5' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer5"]} />

          <input id='price-part-offer6' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer6"]} />

           <input id='price-part-offer7' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer7"]} />

            <input id='price-part-offer8' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer8"]} />

        <input id='price-part-offer9' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer9"]} />

        <input id='price-part-offer10' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-offer10"]} />
         
         </li>


          <li className="" >
        
        <input id='price-part-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price-part-title"]} />

         <input id='price1-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price1-title"]} />
          <input id='price1-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price1-desc"]} />
         
          <input id='price2-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price2-title"]} />
          <input id='price2-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price2-desc"]} />

          <input id='price3-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price3-title"]} />
          <input id='price3-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price3-desc"]} />

           <input id='price4-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price4-title"]} />
          <input id='price4-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price4-desc"]} />
         
          <input id='price5-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price5-title"]} />
          <input id='price5-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price5-desc"]} />

          <input id='price6-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price6-title"]} />
          <input id='price6-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price6-desc"]} />

          <input id='price7-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price7-title"]} />
          <input id='price7-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price7-desc"]} />


          <input id='price8-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price8-title"]} />
          <input id='price8-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price8-desc"]} />

          <input id='price9-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price9-title"]} />
          <input id='price9-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price9-desc"]} />

          <input id='price10-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price10-title"]} />
          <input id='price10-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price10-desc"]} />


           <input id='price11-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price11-title"]} />
          <input id='price11-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price11-desc"]} />

          <input id='price12-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price12-title"]} />
          <input id='price12-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price12-desc"]} />


          <input id='price13-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price13-title"]} />
          <input id='price13-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price13-desc"]} />

           <input id='price14-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price14-title"]} />
          <input id='price14-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price14-desc"]} />


          <input id='price15-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price15-title"]} />
          <input id='price15-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price15-desc"]} />

          <input id='price16-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price16-title"]} />
          <input id='price16-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price16-desc"]} />

           <input id='price17-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price17-title"]} />
          <input id='price17-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price17-desc"]} />

           <input id='price18-title' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price18-title"]} />
          <input id='price18-desc' type='text' onChange={(e)=>this.updateWebData(e,'price')}  value={data.price["price18-desc"]} />
         
         </li>

     </ul>

         </Collapsible>


         <Collapsible trigger={"Contact Us Page"}  key={'contact-page'}>

      <ul className="nav  nav-pills ">
      <li className="" contactle="">
        <h1>Contact Us</h1>
        <input id='contact-root-title' type='text' onChange={(e)=>this.updateWebData(e,'contact')}  value={data.contact["contact-root-title"]} />
        <input id='contact-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'contact')}  value={data.contact["contact-root-desc"]} />
        </li>
        
        <li className="" contactle="">
        <input id='contact-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'contact')}  value={data.contact["contact-mr-title"]} />
        <input id='contact-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'contact')}  value={data.contact["contact-mr-desc"]} />
        </li>

        
         </ul>

         </Collapsible>


         <Collapsible trigger={"About Us Page"}  key={'about-page'}>

      <ul className="nav  nav-pills ">
      <li className="" aboutle="">
        <h1>About Us</h1>
        <input id='about-root-title' type='text' onChange={(e)=>this.updateWebData(e,'about')}  value={data.about["about-root-title"]} />
        <input id='about-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'about')}  value={data.about["about-root-desc"]} />
        </li>
        
        <li className="" aboutle="">
        <input id='about-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'about')}  value={data.about["about-mr-title"]} />
        <input id='about-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'about')}  value={data.about["about-mr-desc"]} />
        </li>

        
         </ul>

         </Collapsible>


         <Collapsible trigger={"Privacy Page"}  key={'privacy-page'}>

      <ul className="nav  nav-pills ">
      <li className="" privacyle="">
        <h1>Privacy</h1>
        <input id='privacy-root-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy-root-title"]} />
        <input id='privacy-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy-root-desc"]} />
        </li>
        
        <li className="" privacyle="">
        <input id='privacy1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy1-mr-title"]} />
        <input id='privacy1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy1-mr-desc"]} />


         <input id='privacy2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy2-mr-title"]} />
        <input id='privacy2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy2-mr-desc"]} />


         <input id='privacy3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy3-mr-title"]} />
        <input id='privacy3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy3-mr-desc"]} />

        <input id='privacy4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy4-mr-title"]} />
        <input id='privacy4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy4-mr-desc"]} />

        <input id='privacy5-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy5-mr-title"]} />
        <input id='privacy5-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy5-mr-desc"]} />

        <input id='privacy6-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy6-mr-title"]} />
        <input id='privacy6-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy6-mr-desc"]} />

         <input id='privacy7-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy7-mr-title"]} />
        <input id='privacy7-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy7-mr-desc"]} />

        <input id='privacy8-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy8-mr-title"]} />
        <input id='privacy8-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy8-mr-desc"]} />

        <input id='privacy9-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy9-mr-title"]} />
        <input id='privacy9-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy9-mr-desc"]} />

        <input id='privacy10-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy10-mr-title"]} />
        <input id='privacy10-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy10-mr-desc"]} />


        <input id='privacy11-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy11-mr-title"]} />
        <input id='privacy11-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy11-mr-desc"]} />

        <input id='privacy12-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy12-mr-title"]} />
        <input id='privacy12-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy12-mr-desc"]} />

        <input id='privacy13-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy13-mr-title"]} />
        <input id='privacy13-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'privacy')}  value={data.privacy["privacy13-mr-desc"]} />

        </li>

        
         </ul>

         </Collapsible>

          <Collapsible trigger={"Guide Page"}  key={'guide-page'}>

      <ul className="nav  nav-pills ">
      <li className="" guidele="">
        <h1>Guide</h1>
        <input id='guide-root-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide-root-title"]} />
        <input id='guide-root-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide-root-desc"]} />
        </li>
        
        <li className="" guidele="">
        <input id='guide-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide-title"]} />
        <input id='guide-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide-desc"]} />

        <input id='guide1-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide1-title"]} />
        <input id='guide1-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide1-desc"]} />

        <input id='guide2-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide2-title"]} />
        <input id='guide2-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide2-desc"]} />

        <input id='guide3-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide3-title"]} />
        <input id='guide3-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide3-desc"]} />

        <input id='guide4-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide4-title"]} />
        <input id='guide4-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide4-desc"]} />

        <input id='guide5-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide5-title"]} />
        <input id='guide5-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide5-desc"]} />

         <input id='guide1-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide1-mr-title"]} />
        <input id='guide1-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide1-mr-desc"]} />


         <input id='guide2-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide2-mr-title"]} />
        <input id='guide2-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide2-mr-desc"]} />

        <input id='guide3-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide3-mr-title"]} />
        <input id='guide3-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide3-mr-desc"]} />

        <input id='guide4-mr-title' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide4-mr-title"]} />
        <input id='guide4-mr-desc' type='text' onChange={(e)=>this.updateWebData(e,'guide')}  value={data.guide["guide4-mr-desc"]} />

        </li>

        
         </ul>

         </Collapsible>

         <Collapsible trigger={"Common Settings"}  key={'guide-page'}>

          <ul className="nav  nav-pills ">
            <h1>Common</h1>
            <li className="">
            <input id='fb-pg' placeholder='Facebook page link here ...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["fb-pg"]} />
            <input id='twitter-pg' placeholder='Twitter page link here ...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["twitter-pg"]} />
            <input id='insta-pg' placeholder='Instagram page link here ...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["insta-pg"]} />
            <input id='beb-pg' placeholder='Beautyebooking page link here ...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["beb-pg"]} />
            <input id='ph-pg' placeholder='Phone number here...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["ph-pg"]} />
            <input id='em-pg' placeholder='email here ...' type='text' onChange={(e)=>this.updateWebData(e,'common')}  value={data.common["em-pg"]} />

            </li>

            
             </ul>

         </Collapsible>

         <Collapsible trigger={"Child Page Images"}  key={'child-img-page'}>

      <ul className="nav  nav-pills ">
        <h1>Upload Child page details images</h1>
        <h4 >*Note: Upload the image with same name which you want to replace</h4>
        <li className="">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/1_1.png'} />
          <div>1_1.png</div>
        </div>
         <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/1_2.png'} />
          <div>1_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/2_1.png'} />
          <div>2_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/2_2.png'} />
          <div>2_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/2_3.png'} />
          <div>2_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/2_4.png'} />
          <div>2_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/3_1.png'} />
          <div>3_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/3_2.png'} />
          <div>3_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/3_3.png'} />
          <div>3_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/3_4.png'} />
          <div>3_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/4_1.png'} />
          <div>4_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/4_2.png'} />
          <div>4_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/4_3.png'} />
          <div>4_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/4_4.png'} />
          <div>4_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/5_1.png'} />
          <div>5_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/5_2.png'} />
          <div>5_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/5_3.png'} />
          <div>5_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/5_4.png'} />
          <div>5_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/6_1.png'} />
          <div>6_1.png</div>
        </div>


        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/7_1.png'} />
          <div>7_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/7_2.png'} />
          <div>7_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/7_3.png'} />
          <div>7_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/7_4.png'} />
          <div>7_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/8_1.png'} />
          <div>8_1.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/8_2.png'} />
          <div>8_2.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/8_3.png'} />
          <div>8_3.png</div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/8_4.png'} />
          <div>8_4.png</div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
          <img width={250} height={150} src={'https://www.digitosignage.com/img/Images/9_1.png'} />
          <div>9_1.png</div>
        </div>


        </li>
        <li> <input type='file' onChange={(e)=>this.uploadImages(e,'child-details')}/></li>
        
         </ul>

         </Collapsible>

         <Collapsible trigger={"Background Header Images"}  key={'bg-child-page'}>

      <ul className="nav  nav-pills ">
        <h1>Background Images</h1>
        <h4>Note: * Upload images with same name, you wish to replace with</h4>
        <li className="">

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/About-bg.png'} />
            <div>{"About-bg.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Blog-bg.png'} />
            <div>{"Blog-bg.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Contact-bg.png'} />
            <div>{"Contact-bg.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/corve-bg.png'} />
            <div>{"corve-bg.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Education.png'} />
            <div>{"Education.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Entertainment.png'} />
            <div>{"Entertainment.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Healthcare.png'} />
            <div>{"Healthcare.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Hospitality.png'} />
            <div>{"Hospitality.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Menu_boards_bg.png'} />
            <div>{"Menu_boards_bg.png"}</div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Menu_boards_bg.png'} />
            <div>{"Menu_boards_bg.png"}</div>
          </div>

          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Pricing-bg.png'} />
            <div>{"Pricing-bg.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Privacy-bg.png'} />
            <div>{"Privacy-bg.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Religious.png'} />
            <div>{"Religious.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Retail Digital Signage.png'} />
            <div>{"Retail Digital Signage.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Shopping Malls.png'} />
            <div>{"Shopping Malls.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/signage-bg.png'} />
            <div>{"signage-bg.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Solutions-bg.png'} />
            <div>{"Solutions-bg.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Sports Facilities.png'} />
            <div>{"Sports Facilities.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Support-bg.png'} />
            <div>{"Support-bg.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Training-bg.png'} />
            <div>{"Training-bg.png"}</div>
          </div><div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/Background/Work-bg.png'} />
            <div>{"Work-bg.png"}</div>
          </div>


        </li>
        <li><input type={'file'} onChange={(e)=>this.uploadImages(e,'background')} /></li>

        
         </ul>

         </Collapsible>


           <Collapsible trigger={"Landing Background Image"}  key={'landing-bg-page'}>

          <ul className="nav  nav-pills ">
            <h1>Landing Background Image</h1>
            <h4>Note - *Upload image with same name, you wish to replace </h4>
            <li className="">
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/home/Home.png'} />
            <div>{"Home.png"}</div>
          </div>
            </li>
            <li> <input type='file' onChange={(e)=>this.uploadImages(e,'home')}/></li>
             </ul>

         </Collapsible>


         <Collapsible trigger={"Logo Images"}  key={'logo-page'}>

          <ul className="nav  nav-pills ">
            <h1>Logo Images</h1>
            <h4>Note - *Upload image with same name, you wish to replace </h4>
            <li className="">
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/logo/BBLogo.png'} />
            <div>{"BBLogo.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/logo/logo-dark.png'} />
            <div>{"logo-dark.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/logo/logo-da.png'} />
            <div>{"logo-da.png"}</div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">
            <img width={250} height={150} src={'https://www.digitosignage.com/img/logo/logo.png'} />
            <div>{"logo.png"}</div>
          </div>
            </li>
            <li> <input type='file' onChange={(e)=>this.uploadImages(e,'logo')}/></li>
             </ul>

         </Collapsible>



      </div>


    )
  }
}

export default BebWeb
