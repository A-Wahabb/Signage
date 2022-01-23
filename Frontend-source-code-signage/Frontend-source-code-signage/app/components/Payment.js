import React, { Component, PropTypes } from 'react';
import { payment } from '../actions/payment';
import {Loading,Error} from './commonDumbs';
import {IsPublicSignup,PrimaryColor,BILLING_SERVER,SPK,Provider,ProviderAddr,ProviderEmail,ProviderPhn} from '../constants/Config';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

class Payment extends Component {
  constructor() {
    super();
    this.state={
      isPlanSelected:false,
      planId:null,
      subscribed:false,
      isMyPlanView:false,
      showInvoiceDetail:false
    };
    this.saveSubscription = this.saveSubscription.bind(this);
    this.billingInvitation =null;
    this.getManageView = this.getManageView.bind(this);
    this.renderMyPlan= this.renderMyPlan.bind(this);
    this.getInvDetails = this.getInvDetails.bind(this);
    this.renderInvoices = this.renderInvoices.bind(this);
    this.showInvoice = this.showInvoice.bind(this);
    this.printInvoice = this.printInvoice.bind(this);
    this.currencyIcon={'usd':'$', 'inr':'₹','rupee':'₹'};
  }
  
 componentDidMount(){
  //this.props.resetMe();
  this.props.getSubscriptions();
  this.togglePlanView();
 }

 componentDidUpdate(prevProps,prevState){
      // if(this.props.newPayment.payment){
      //   this.props.changeConsole("/");
      // }
      if(!prevState.isPlanSelected && this.state.isPlanSelected){
         window.Servicebot.init({
    templateId : parseInt(this.state.planId),
    url : BILLING_SERVER,
    selector : document.getElementById('billing-request-form'),
    handleResponse : (response) => {
        //Response function, you can put redirect logic or app integration logic here
      console.log('=== subscription response==', response);
      this.saveSubscription(response);
      let regApi = response.api;
      let userDetails= {references:{}, name:this.props.user.user.username , password:new Date().getTime()};
      this.props.registerBillingUser(regApi,userDetails);
    },
    type: "request",
    spk: SPK,
    forceCard : false, //set to true if you want credit card to be a required field for the customer
    setPassword : false //set to true if you want customer to fill out a password
});
      }

      console.log('---subs plan view -- ',this.props.userSubs.plan);
      if((!prevState.isMyPlanView && this.state.isMyPlanView) ||
        (!prevProps.userSubs.plan && this.props.userSubs.plan)
       ){
        this.getManageView();
      }
 }
//selector : document.getElementById('billing-management-form'),
  getManageView(){
    if(this.props.userSubs && this.props.userSubs.plan){
    Servicebot.init({
        url : BILLING_SERVER,
        selector : document.getElementById('billing-management-form'),
        type : "manage",
        token: this.props.userSubs.plan && this.props.userSubs.plan.userBillToken,
        handleResponse: (response) => {
            //determine what to do on certain events...
            console.log(response);
        }
    });

    this.props.fetchInvoices(this.props.userSubs.plan.userBillToken);
    }
  }

   saveSubscription(subObj){

      let subFinal= {};
            subFinal.subscription_id = subObj.id;
            subFinal.signage_user_id = this.props.user.user._id;
            subFinal.billing_user_id = subObj.user_id;
            subFinal.category_id= subObj.request.category_id;
            subFinal.email = subObj.request.email;
            subFinal.status = subObj.status; //running, cancelled
            subFinal.trial_end = subObj.trial_end;
            subFinal.type = subObj.type;//subscribed,
            subFinal.inviteUrl = subObj.url;
            subFinal.isPaymentMethodAdded= subObj.payment_plan.amount >0 && subObj.trial_end == null && subObj.status == 'running' ? true:false;
            this.props.saveSubs(subFinal);
            this.billingInvitation = subObj.url;
            this.setState({
              subscribed: true
            });
   }

  onSearchChange(evt){
    evt.preventDefault();
  }

  deleteCurrentSubscription(currentSubId){
    this.props.delServiceById(currentSubId);
  }

  togglePlanView(){
        this.setState({
          isMyPlanView: !this.state.isMyPlanView,
          isPlanSelected: false
        });
  }


  renderMyPlan(){
    return (
    <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
      className="btn-primary-link" onClick={()=>this.togglePlanView()} >
      {this.state.isMyPlanView ? "NEW/CHANGE PLAN" : "MY ACTIVE PLAN"}
      </button>
    );
    }

  subscribeSelected(planId){

    this.setState({
      isPlanSelected:true,
      planId: planId
    });
  }

  renderPlans(){
    let plans = this.props.subscriptions.plans;
    if(plans && this.props.userSubs.plan){
      plans = plans.filter( plan => plan.amount > 0);
    }
    if(this.props.subscriptions.loading){
      <Loading />
    }

    if(plans){
    return plans.map( plan => <li key={plan.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item">

          <div style={{padding:'10px',height:'400px'}} className="thumbnail" >
          <h2 style={{color:PrimaryColor,borderBottom:'1px solid #dedada',marginBottom:'10px'}}>{plan.references.service_categories[0].name}</h2>
          <div style={{borderBottom:'1px solid #dedada',marginBottom:'10px'}}>{plan.name}
           <div><label >{plan.description}</label></div>
          </div>
          <div style={{borderBottom:'1px solid #dedada',marginBottom:'10px'}}>
          <h1 >{this.currencyIcon[plan.currency]+(plan.amount/100) }</h1><span>{ ' / '+plan.interval_count+' '+(plan.interval)}</span></div>
          <div dangerouslySetInnerHTML={{ __html: plan.details }}></div>
          <button 
      className="btn-primary-link" style={{color:PrimaryColor, position:'absolute','bottom':'10px','right':'20px','float':'right'}} onClick={()=>this.subscribeSelected(plan.id)} >
      SELECT
      </button>
          </div>
          </li>);
          }
  }

  demoRemainCounter(){
    let user = this.props.user;
    if(this.props.user && this.props.user.user && this.props.user.user.status.toUpperCase()=='DEMO'){
      let createDt = moment(user.user.createdAt.split('T')[0]);
      let todayDt = moment().format();
      todayDt= moment(todayDt.split('T')[0]);
      let diff = todayDt.diff(createDt,'days'); 
      return <h1 style={{color:'red'}}>{(30 - diff >0? 30 - diff : 0) + ' Demo Days remaining, kindly choose paid plan to continue and enjoy many more features!'}</h1>
    }else{
      return <div>''</div>;
    }
    
  }


  renderNewChangePlanView(){
    return <div>
          {!this.state.isPlanSelected ? <h2>Choose your plan</h2> : <h2>Confrim & Pay</h2>}
          {!this.state.isPlanSelected && <ul id="plans-list" className="panel-body">
          {this.renderPlans()}
          </ul>}
          
          {this.state.isPlanSelected && !this.state.subscribed && <div id="billing-request-form"></div>}

          {this.state.subscribed && <div>
              <h2>You subscribed successfully!!</h2>
              <h1>Click below link, to manage your subscriptions</h1>
              <a href={this.billingInvitation} target='blank'>Manage Subscription Here</a>
            </div>}
            </div>
  }

  renderMyPlanView(){
    return <div>
             {this.props.userSubs && !this.props.userSubs.plan && this.demoRemainCounter()}
            {this.props.userSubs && this.props.userSubs.plan && <div id="billing-management-form"></div>}
            {this.props.userSubs && this.props.userSubs.plan && <div>
              
              <label>{'Note: In order to get another new plan, you should first "Cancel Subscription" and then "TERMINATE" subscription by clicking below link button.'} </label>
              <button 
      className="btn-primary-link" style={{color:'red','bottom':'10px','right':'20px','float':'right'}} onClick={()=>this.deleteCurrentSubscription(this.props.userSubs.plan._id)} >
       TERMINATE SUBSCRIPTION
      </button></div>}
      {this.renderInvoices(this.props.invoices.list)}

    </div>
  }

  renderInvoices(invoices){

    return (

    <table className="table" >
  <thead style={{background:'#5f5c5c',color:'#fff'}}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Invoice Link</th>
      <th scope="col">Amount</th>
      <th scope="col">On Date</th>
      <th scope="col">Is Paid?</th>
    </tr>
  </thead><tbody style={{maxHeight:'300px',overflow:'hidden',overflowY:'scroll'}}>
  {invoices && invoices.map((inv,indx) => (
    <tr>
      <th scope="row">{indx+1}</th>
      <td><a href="#" onClick={e=> this.getInvDetails(e,inv)}>{inv.invoice_id}</a></td>
      <td>{this.currencyIcon[inv.currency]}{inv.amount_due/100}</td>
      <td>{moment(inv.created_at).format('LLLL')}</td>
      <td>{inv.paid?<label style={{color:'green'}}>YES</label>:<label style={{color:'red'}}>NO</label>}</td>
    </tr>
   
  ))}</tbody>
</table>
  )
  }


  printInvoice(){

    const input = document.getElementById('matchTbl');
    let w = input.offsetWidth;
    let h = input.offsetHeight;
    html2canvas(input,{ allowTaint: true , scrollX:0, scrollY: -window.scrollY })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p');
        pdf.addImage(imgData, 'PNG',4, 4);
        pdf.save(Provider+"_signage_invoice.pdf");
        
      });

  }

  getInvDetails(e, inv){
    e.preventDefault();
    this.setState({
      showInvoiceDetail: inv
    });
    setTimeout(function(){
    var scrollingElement = document.body;
    scrollingElement.scrollTop = scrollingElement.scrollHeight;
  },1000);
  }

  showInvoice(invoice){
    let user= this.props.user.user;
    let details=invoice.references.user_invoice_lines && invoice.references.user_invoice_lines?invoice.references.user_invoice_lines:[];
    return(<div> <button 
      className="btn-primary-link" style={{color:PrimaryColor,'bottom':'10px','right':'20px','float':'right'}} onClick={()=>this.printInvoice()} >
       PRINT
      </button>
      <div id='matchTbl' style={{background:'#ffffff',padding:'10px',width:'750px',height:'auto',paddingBottom:'40px'}}>
      <div style={{display:'inline',padding:'10px'}}>
        <h1 style={{display:'inline-block',padding:'10px',width:'200px'}}>INVOICE</h1>
        <div style={{display:'inline-block',padding:'10px',float:'right',textAlign:'left'}}>
        <div><label>{'Charge Date:'+ moment(invoice.created_at).format('LLLL')}</label></div>
        <div><label>{'Invoice No:'+ invoice.id}</label></div>
        <div><label>{'Invoice ID:'+ invoice.invoice_id}</label></div>
        </div>
      </div>

      <div style={{padding:'20px',marginTop:'20px', width:'100%'}}>
        <div>
          <h2 style={{borderBottom:'2px solid #000'}}>From</h2>
          <h3><span>{Provider} </span></h3>
          <div><span>{ProviderAddr} </span></div>
          <div><span>{ProviderEmail} </span></div>
          <div><span>{ProviderPhn} </span></div>
        </div>
        
        <div>
          <h2 style={{borderBottom:'2px solid #000'}}>To</h2>
          <h3><span>{user.name} </span></h3>
          <div><span>{user.address} </span></div>
          <div><span>{user.email} </span></div>
          <div><span>{user.mobile} </span></div>
        </div>
        
        <div>
          <h2 style={{borderBottom:'2px solid #000'}}>Details</h2>
          <h3><span>{'Invoice Total: '+ this.currencyIcon[invoice.currency]}{invoice.total/100} </span></h3>
          <div><label>{'Status: '+(invoice.paid?'PAID':'NOT CHARGED') } </label></div>

        </div>
      </div>

      <div>
          <table className="table">
  <thead style={{background:'#5f5c5c',color:'#fff'}}>
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Plan Name</th>
      <th scope="col">Type</th>
      <th scope="col">Quantity</th>
      <th scope="col">Amount</th>
    </tr>
  </thead><tbody>
  {details.map((line,indx) => (
    <tr>
      <td>{line.id}</td>
      <td>{line.description}</td>
      <td>{line.type}</td>
      <td>{line.quantity}</td>
      <td>{this.currencyIcon[line.currency]}{line.amount/100}</td>
    </tr>
   
  ))}</tbody>
</table>
      </div>

      <div style={{float:'right',display:'inline'}}>
      <h4 style={{display:'inline'}}>{'Transaction Total '}</h4>
      <h4 style={{display:'inline'}}>{invoice.paid?(this.currencyIcon[invoice.currency] + invoice.total/100):'NOT CHARGED' }</h4>
      </div>
      </div>
    </div>);
  }

  render() {

    console.log('---pay subs', this.props);

    return (

      <div>
          <div className="title-container">
            <h2 className="header-title">{this.state.isMyPlanView?"My Plan & Billing":"Subscribe & Pay"}</h2>
           
          <div className="search-bar">
               {this.renderMyPlan()}
          </div>

          </div>
          <div className="inner-container" style={{padding:'10px'}}>
          { !this.state.isMyPlanView ? <div>{this.renderNewChangePlanView()}</div>
            :

            <div>
              {this.renderMyPlanView()}
              {this.state.showInvoiceDetail && this.showInvoice(this.state.showInvoiceDetail)}
            </div>

            }

          </div>
      </div>
    )
  }
}

export default Payment
