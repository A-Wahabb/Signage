import React from 'react';
import { Component,PropTypes } from 'react';
import SignIn from './../pages/SignInPg';
import SignUp from './../pages/SignUpPg';
import AdminDashboard from './../pages/AdminDashboardPg';
import UserDashboardPg from './../pages/UserDashboard';
import {ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './../pages/ForgotPwd';
import ResetPassword from './../pages/UserNewPasswordPg';
import ModalLocal from './modal-local';

class App extends Component {
	constructor() {
    super();

    this.state= {
    	modalOpen:false
    	}
    this.modalSize='';
    this.modalContent='';
    this.rootModal = this.rootModal.bind(this);
    this.modalPreview=false;
    this.closeModalPopup= this.closeModalPopup.bind(this);
    this.zoomOutPreviewWindow = this.zoomOutPreviewWindow.bind(this);
	}
	 
	componentWillMount() {
    this.props.loadUserFromToken();
  	}

	componentDidUpdate(prevProps) {
		if(this.state.modalOpen && this.modalPreview ){
			this.zoomOutPreviewWindow();
		}
	}

	zoomOutPreviewWindow(){
		try{
		  let frame= document.getElementById('preview-frame');
		    if(frame){
		      this.frameInterval=null;
		      let _self =this;
		      let templateBody =frame && frame.contentWindow.document.getElementsByTagName('body');
		      this.frameInterval = setInterval(function(){
		          if(templateBody[0]){
		        let frameNow=document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0];
		         frameNow.style.zoom =_self.previewApp.orientation.toLowerCase()=='landscape'? 0.5:0.3;
		         frameNow.style.overflow='hidden';
		       }},5*1000);
		      }
		      }catch(e){console.log(e);}
	}

	getModalClass(size){
	    if(size === 'PREVIEW'){
	      this.modalPreview=true;
	      return 'modal-local modal-preview';
	    }else if(size === 'MEDIUM'){
	      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
	    }
	    else if(size === 'LARGE'){
	      return 'modal-local modal-default modal-large col-sm-12 col-lg-10 col-md-10';
	    }
	    else if(size === 'EXTRA-LARGE'){
	      return 'modal-local modal-default extra-modal-large col-sm-12 col-lg-12 col-md-12';
	    }
	    else{
	      return 'modal-local modal-default ';
	    }
  }

  closeModalPopup(){
  		this.modalSize= '';
  		this.modalContent = '';
  		this.modalPreview=false;
  		this.setState({
  			modalOpen: false
  		});
  }

  rootModal(modalContent,modalSize,isOpen){
  		this.modalSize= modalSize;
  		this.modalContent = modalContent;
  		this.setState({
  			modalOpen: isOpen});
  }

  render() {
		let selectedConsole=null;
	
		switch( this.props.common.parentConsole){
			 case 'SIGN_IN':
			 selectedConsole=
			 <SignIn
			 		user= {this.props.user}
    				common= {this.props.common}
			 	/>;
			 break;
			  case 'SIGNUP':
			 selectedConsole=
			 <SignUp
			 		user= {this.props.user}
    				common= {this.props.common}
			 	/>;
			 break;
			  case 'FORGOT_PASSWORD':
			 selectedConsole=
			 <ForgotPassword
    				common= {this.props.common}
			 	/>;
			 break;
			 case 'RESET_PASSWORD':
			 selectedConsole=
			 <ResetPassword
    				common= {this.props.common}
    				user= {this.props.user}
			 	/>;
			 break;

			 case 'ADMIN_CONSOLE':
			 selectedConsole=
			 <AdminDashboard
			 		user= {this.props.user}
    				common= {this.props.common}
    				rootModal={this.rootModal}

			 />;
			 break;
			 case 'USER_DASHBOARD':
			 selectedConsole=
			 <UserDashboardPg
			 	rootModal={this.rootModal}
			 	closeModalPopup={this.closeModalPopup}
			 />;
			 break;
			 default:
			 selectedConsole=
			 <SignIn
			 		user= {this.props.user}
    				common= {this.props.common}
			 />;
 
		}
    return (<div>
			{selectedConsole}
			<ToastContainer
				position={toast.POSITION.BOTTOM_CENTER}
				autoClose= {5000}
				hideProgressBar= {true}
				closeOnClick= {true}
				pauseOnHover= {true}
				draggable= {false}
				closeButton= {false}
			/>
			<ModalLocal  
			className={this.getModalClass(this.modalSize)}
			isOpen={this.state.modalOpen} >
				{this.state.modalOpen?this.modalContent:''}
				<span 
				className="glyphicon glyphicon-remove modal-remove-icon" 
				onClick={(e) => this.closeModalPopup(e)} >
				</span>
				</ModalLocal>
			</div>);
  }
}
export default App;
