import { connect } from 'react-redux'
import CustomerTeams from '../components/Customer-teams';
import { showModal, hideModal, updateKey } from '../actions/popup';
import {fetchTeams,fetchTeamsFailure, fetchTeamsSuccess,fetchCities,delTeam,delTeamFailure,updateTeams,updateTeamsFailure, updateTeamsSuccess,addTeams,addTeamsFailure,addProperty,uploadImg,fetchMatches, fetchMatchesSuccess,fetchMatchesFailure,addMatchTeams,updateMatch,delMatch,delMatchFailure,} from '../actions/customer-teams';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  console.log("[Custom APP]", state);
  return {
    teams: state.teams.teams,
    matches: state.teams.matches,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      console.log('reset');
    },

    fetchTeams: () => {
    return  dispatch(fetchTeams(token)).then((response) => {
        if(!response.error){ 
            //var Teamsdata=Object.assign([],);
        
       console.log('Teams',response);
       dispatch(fetchTeamsSuccess(response.payload.data));
    }
    else{  
        dispatch(fetchTeamsFailure(response.payload.data));
        }
    });
    },

    updateTeam: (updateData) => {
  
    return  dispatch(updateTeams(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
            
            dispatch(fetchTeams(token)).then((response) => {
        !response.error ? dispatch(fetchTeamsSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updateTeamsFailure(response.payload.data));
        }
      });
    },


    delTeam: (TeamId) => {
       console.log('delete', TeamId);
    return  dispatch(delTeam(token,TeamId)).then((response) => {
        if(!response.error)  
            {
                toast.success("DELETED SUCCESSFULLY!");
            
            dispatch(fetchTeams(token)).then((response) => {
        !response.error ? dispatch(fetchTeamsSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delTeamFailure(response.payload.data));
        }
      });
    },

      delMatch: (matchId) => {
       console.log('delete', matchId);
    return  dispatch(delMatch(token,matchId)).then((response) => {
        if(!response.error)  
            {
                toast.success("DELETED SUCCESSFULLY!");
            
            dispatch(fetchMatches(token)).then((response) => {
        !response.error ? dispatch(fetchMatchesSuccess(response.payload.data)) : dispatch(fetchMatchesFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delMatchFailure(response.payload.data));
        }
      });
    },

    refreshListData:(evt)=> {
     
            dispatch(fetchTeams(token)).then((response) => {
        !response.error ? dispatch(fetchTeamsSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });


    },

     addTeam: (pgData) => {
        
    return  dispatch(addTeams(token,pgData)).then((response) => {
        if(!response.error)  
            {
                toast.success("ADDED SUCCESSFULLY!");
                //dispatch(updateTeamsSuccess(response.payload.data));
               
            dispatch(fetchTeams(token)).then((response) => {
        !response.error ? dispatch(fetchTeamsSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("ADDING Team FAILED!");
            dispatch(addTeamsFailure(response.payload.data));
        }
      });
    },

    addMatchTeams:(matchTeams) =>{
      let matchObj = {
        teamA:matchTeams[0].id,
        teamB:matchTeams[1].id,
        status:'WAITING',
        winner: false,
        winFightTime:"",
        isWalkoverWin:false 
      };
      return  dispatch(addMatchTeams(token,matchObj)).then((response) => {
        if(!response.error)  
            {
                toast.success("MATCH CREATED SUCCESSFULLY!");
                //dispatch(updateTeamsSuccess(response.payload.data));
               
            dispatch(fetchMatches(token)).then((response) => {
        !response.error ? dispatch(fetchMatchesSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("MATCH CREATION FAILED!");
            dispatch(addTeamsFailure(response.payload.data));
        }
      });

    },

    fetchMatches: () => {
    return  dispatch(fetchMatches(token)).then((response) => {
        if(!response.error){ 
            //var Teamsdata=Object.assign([],);
        
       console.log('Matches',response);
       dispatch(fetchMatchesSuccess(response.payload.data));
    }
    else{  
        dispatch(fetchMatchesFailure(response.payload.data));
        }
    });
    },

    updateMatch:(matchObj) =>{
      
      return  dispatch(updateMatch(token,matchObj)).then((response) => {
        if(!response.error)  
            {
                toast.success("MATCH UPDATED SUCCESSFULLY!");
            dispatch(fetchMatches(token)).then((response) => {
        !response.error ? dispatch(fetchMatchesSuccess(response.payload.data)) : dispatch(fetchTeamsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("MATCH UPDATE FAILED!");
            dispatch(addTeamsFailure(response.payload.data));
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

    uploadPdf:(uploadObj,subfolder)=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTeams);
