import { connect } from 'react-redux'
import CustomerAv from '../components/Customer-av';
import { showModal, hideModal, updateKey } from '../actions/popup';
import {fetchDeals,fetchDealsFailure, fetchDealsSuccess,fetchCities,fetchCityFailure, fetchCitySuccess,updateDeals,updateDealsFailure, updateDealsSuccess,fetchPros,fetchProsFailure, fetchProsSuccess,
    fetchOffice,fetchOfficeFailure, fetchOfficeSuccess,fetchAgents,fetchAgentsSuccess,fetchAgentsFailure,addDeals,addDealsFailure,delDeals,delDealsFailure,addProperty,addPropertyFailure,uploadImg,addAgent,addAgentFailure,updateProperty,updatePropertyFailure,delProp,delPropFailure,delAgent,delAgentFailure,updateAgent,updateAgentFailure,fetchEvents,fetchEventsSuccess,fetchEventsFailure,addEvent,addEventFailure,delEvent,delEventsFailure,updateEvent,updateEventFailure
} from '../actions/customer-av';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  console.log("[Custom APP]", state);
  return {
    trans: state.trans,
    user: state.user,
    activePlayer: state.posts.activePlayer
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      console.log('reset');
    },

    fetchDeals: (officeId) => {
    return  dispatch(fetchDeals(token,officeId)).then((response) => {
        if(!response.error){ 
            //var Dealsdata=Object.assign([],);
        

       dispatch(fetchDealsSuccess(response.payload.data));
    }
    else{  
        dispatch(fetchDealsFailure(response.payload.data));
        }
    });
    },

    updateDeal: (updateData,officeId) => {
        console.log(officeId);
    return  dispatch(updateDeals(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
            dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updateDealsFailure(response.payload.data));
        }
      });
    },

    updateProperty: (updateData,officeId) => {
        console.log(officeId);
        console.log(updateData);
    return  dispatch(updateProperty(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
           dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updatePropertyFailure(response.payload.data));
        }
      });
    },


    updateAgent: (updateData,officeId) => {
       
        console.log(updateData);
    return  dispatch(updateAgent(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
           
           dispatch(fetchAgents(token)).then((response) => {
        !response.error ? dispatch(fetchAgentsSuccess(response.payload.data.message)) : dispatch(fetchAgentsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updateAgentFailure(response.payload.data));
        }
      });
    },

     updateEvent: (updateData,officeId) => {
       
        console.log(updateData);
         console.log(officeId);
    return  dispatch(updateEvent(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
           
           dispatch(fetchEvents(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
          });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updateEventFailure(response.payload.data));
        }
      });
    },

    deleteDealById: (dealId,officeId) => {
       console.log('delete', dealId+'---'+officeId)
    return  dispatch(delDeals(token,dealId)).then((response) => {
        if(!response.error)  
            {
                toast.success("DELETED SUCCESSFULLY!");
            dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delDeals(response.payload.data));
        }
      });
    },

    deletePropById: (propId,officeId) => {
       console.log('delete', propId+'---'+officeId)
    return  dispatch(delProp(token,propId)).then((response) => {
        if(!response.error)  
            {
                toast.success("DELETED SUCCESSFULLY!");
                dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delDeals(response.payload.data));
        }
      });
    },

    deleteAgentById: (agentId,officeId) => {
       console.log('delete', agentId+'---'+officeId)
    return  dispatch(delAgent(token,agentId)).then((response) => {
        if(!response.error)  
            {


                toast.success("DELETED SUCCESSFULLY!");
              dispatch(fetchAgents(token)).then((response) => {
        !response.error ? dispatch(fetchAgentsSuccess(response.payload.data.message)) : dispatch(fetchAgentsFailure(response.payload.data));
      });

                dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delDealsFailure(response.payload.data));
        }
      });
    },

    refreshListData:(evt,officeId)=> {
      dispatch(fetchAgents(token)).then((response) => {
        !response.error ? dispatch(fetchAgentsSuccess(response.payload.data.message)) : dispatch(fetchAgentsFailure(response.payload.data));
      });

                dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

      dispatch(fetchEvents(token,officeId)).then((response) => {

        !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
      });

    },

    fetchPros: (agentcityId) => {
        return  dispatch(fetchPros(token,agentcityId)).then((response) => {
       if(!response.error){ dispatch(fetchProsSuccess(response.payload.data));

         }
        else{
          dispatch(fetchProsFailure(response.payload.data));
        }
      });
    },

    fetchOfficeId: (officeName) => {
    return  dispatch(fetchOffice(token,officeName)).then((response) => {
        !response.error ? dispatch(fetchOfficeSuccess(response.payload.data.message)) : dispatch(fetchOfficeFailure(response.payload.data));
      });
    },


    fetchCities: () => {
    return  dispatch(fetchCities(token)).then((response) => {
        !response.error ? dispatch(fetchCitySuccess(response.payload.data.message)) : dispatch(fetchCityFailure(response.payload.data));
      });
    },

    fetchAgents: () => {
    return  dispatch(fetchAgents(token)).then((response) => {
        !response.error ? dispatch(fetchAgentsSuccess(response.payload.data.message)) : dispatch(fetchAgentsFailure(response.payload.data));
      });
    },

deleteEventById: (eventId,officeId) => {
       console.log('delete', eventId+'---'+officeId)
    return  dispatch(delEvent(token,eventId)).then((response) => {
        if(!response.error)  
            {

                toast.success("DELETED SUCCESSFULLY!");
            dispatch(fetchEvents(token,officeId)).then((response) => {

        !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delEventsFailure(response.payload.data));
        }
      });
    },


fetchEvents: (officeId) => {
    return  dispatch(fetchEvents(token,officeId)).then((response) => {

        !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
      });
    },

     addTransDeal: (dealData, officeId) => {
        
    return  dispatch(addDeals(token,dealData)).then((response) => {
        if(!response.error)  
            {
                toast.success("ADDED SUCCESSFULLY!");
                //dispatch(updateDealsSuccess(response.payload.data));
               dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
            dispatch(fetchDeals(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("ADDING DEAL FAILED!");
            dispatch(addDealsFailure(response.payload.data));
        }
      });
    },

    saveProperty:(propObj) =>{

    return  dispatch(addProperty(token,propObj)).then((response) => {
        if(!response.error)  
            {
                toast.success("PROPERTY SAVED SUCCESSFULLY!");
                //dispatch(updateDealsSuccess(response.payload.data));
            dispatch(fetchPros(token,"noneed")).then((response) => {
        !response.error ? dispatch(fetchProsSuccess(response.payload.data)) : dispatch(fetchProsFailure(response.payload.data));
      });
      }
     else{ 
            toast.error("PROPERTY SAVING FAILED!");
            dispatch(addPropertyFailure(response.payload.data));
        }

      });
    },

    addNewAgent(agentObj,subfolder){
      let profileToUpload=agentObj.a_photo_path.name?agentObj.a_photo_path:null;
      agentObj.a_photo_path=agentObj.a_photo_path.name?agentObj.a_photo_path.name.substr(0, agentObj.a_photo_path.name.lastIndexOf(".")).replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '_')+'.'+agentObj.a_photo_path.type.split('/')[1]:"";
      return  dispatch(addAgent(token,agentObj)).then((response) => {
        if(!response.error)  
            {
                toast.success("AGENT SAVED SUCCESSFULLY!");
                //dispatch(updateDealsSuccess(response.payload.data));
            dispatch(uploadImg(token,profileToUpload,subfolder)).then((response) => {});
            dispatch(fetchAgents(token)).then((response) => {
        !response.error ? dispatch(fetchAgentsSuccess(response.payload.data.message)) : dispatch(fetchAgentFailure(response.payload.data));
      });
      }
     else{ 
            toast.error("AGENT SAVING FAILED!");
            dispatch(addAgentFailure(response.payload.data));
        }

      });
    },

    addNewEvent(eventObj,subfolder,officeId){
      let eventToUpload=eventObj.event_photo.name?eventObj.event_photo:null;
      eventObj.event_photo=eventObj.event_photo.name?eventObj.event_photo.name.substr(0, eventObj.event_photo.name.lastIndexOf(".")).replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, '_')+'.'+eventObj.event_photo.type.split('/')[1]:"";
      return  dispatch(addEvent(token,eventObj)).then((response) => {
        if(!response.error)  
            {
                toast.success("EVENT SAVED SUCCESSFULLY!");
                //dispatch(updateDealsSuccess(response.payload.data));
            dispatch(uploadImg(token,eventToUpload,subfolder)).then((response) => {});
            dispatch(fetchEvents(token,officeId)).then((response) => {
        !response.error ? dispatch(fetchEventsSuccess(response.payload.data)) : dispatch(fetchEventsFailure(response.payload.data));
      });
      }
     else{ 
            toast.error("EVENT SAVING FAILED!");
            dispatch(addEventFailure(response.payload.data));
        }

      });
    },

    uploadImg:(uploadObj,subfolder)=>{
      return  dispatch(uploadImg(token,uploadObj,subfolder)).then((response) => {
        if(!response.error)  
            {
      }
     else{ 
            toast.error("Upload image FAILED!");
            //dispatch(addPropertyFailure(response.payload.data));
        }

      });

    },
    
    updateModal: (param) =>{
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAv);
