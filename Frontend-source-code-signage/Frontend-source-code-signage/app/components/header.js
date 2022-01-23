import React, { Component, PropTypes } from "react";
import { Link } from "react-router-dom";
import { BASE_SERVER } from "../constants/Config";
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
    
  }


  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.props.changeConsole("LANDING");
  }
 
  logout(evt) {
    evt && evt.preventDefault();
    this.props.logout();
  }
  
 

  renderSignInLinks(authenticated) {
    if (this.props.authenticated) {
      console.log("modal content type", this.props.authenticated);
      return (
        <ul className="nav  nav-pills navbar-right">
          <li  role="presentation" style={{padding:'10px'}}>
              <span style={{top:'5px'}}>
                <Dropdown autoOpen= {true} arrowClassName='glyphicon glyphicon-user'>
                      <Dropdown.Toggle title="" />
                      <Dropdown.MenuWrapper>
                        <Dropdown.Menu>
                            <MenuItem >
                            <span>{" " + this.props.user.user.name.toUpperCase()}
                            </span>
                            </MenuItem>
                            
                            <MenuItem onClick={e => this.logout(e)}>
                                <span>{" LOG OUT"}</span>
                            </MenuItem>
                            
                        </Dropdown.Menu>
                        </Dropdown.MenuWrapper>
                 </Dropdown>
              </span>
          </li>
        </ul>
      );
    } else {
      return null;
    }
  }

  searchChange(e){
        this.props.setSearchText(e.target.value);
  }


  renderLinks() {
    const { type, user,isLeftMenuActive } = this.props;
    let isPortrait = window.matchMedia("(orientation: portrait)").matches;
    //console.log('--type header links of render --', type);
    if (type === "home" || type === "user_dashboard") {
      return (
        <div className="top-container col-sm-12 col-md-12 col-lg-12">
          <ul className="nav  nav-pills navbar-left">
          {isPortrait && <li onClick={e => this.props.toggleLeftMenuActive(!isLeftMenuActive)}>
          <span className="glyphicon glyphicon-menu-hamburger"></span>
            </li>}
            <li
              style={{ paddingRight: "10px" }}
              onClick={e => this.goToDashboard(e)}
              role="presentation"
            >
              {isPortrait ?<span className="logo-small"></span>:<span className="logo-common"></span>}
            </li>
          </ul>
          {false && <div className='search-top-input' >
          <input onClick={(e) => this.props.changeConsole('SEARCH')} type='search' className='search' placeholder="Search..." onChange={(e)=> this.searchChange(e)}/>
          </div>}
          {this.renderSignInLinks(this.props.authenticated)}
        </div>
      );
      
    } else if (type === "sign_in" || type === "admin_dashboard") {
      return (
        <div>
          <ul className="nav  nav-pills ">
            <li className="small-header" role="presentation">
              <span className="logo"></span>
            </li>
          </ul>
          {this.renderSignInLinks(this.props.authenticated)}
        </div>
      );
    }
  }

  render() {
    const {user } = this.props;
    const authenticatedUser = this.props.authenticated;
    if (!user || !authenticatedUser) {
      return null;
    }
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div id="navbar" className="navbar-collapse collapse">
            {this.renderLinks()}
          </div>
        </nav>
       
      </div>
    );
  }
}

export default Header;


