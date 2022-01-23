// src/components/Header.js

import React, { Component, Fragment } from "react";

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      selected: 1,
      templateFiltersOptions: "all",
    };
  }

  componentWillMount() {
      this.setState({
        selected: this.props.selected,
      });
  }

  handleClick(index, event) {
    event.preventDefault();
    this.setState({
      selected: index,
    });
  }

  handleChange(evt) {
    evt.preventDefault();
    this.setState({
      templateFiltersOptions: evt.target.value,
    });
  }

  _renderTitles() {
    function labels(child, index) {
      var activeClass = this.state.selected === index ? "active" : "";
      if (child.props) {
        return (
          <li key={index}>
            <a
              href="#"
              className={activeClass}
              onClick={this.handleClick.bind(this, index)}
            >
              <h4>{child.props.label}</h4>
            </a>
          </li>
        );
      } else {
        return null;
      }
    }
    if (
      this.props.filterTemplates 
    ) {
      return (
        <Fragment>
          <ul className="tabs__labels w-75">
            {this.props.children.map(labels && labels.bind(this))}
          </ul>
          <div style={{float:'right',color:"#afafaf"}}>
          <span className={"glyphicon glyphicon-filter"} style={{marginTop:"3px"}}></span>
          <select
            className="btn"
            style={{padding:"2px",marginBottom:"3px"}}
            value={
              this.props.defaultFilter ? this.props.defaultFilter : "all"
            }
            onChange={(e) => this.props.filterTemplatesChange(e)}
          >
            {this.props.filterTemplates.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <span onClick={this.props.onRefresh} className={"glyphicon glyphicon-refresh"} style={{color:'#afafaf',marginTop:"3px",marginLeft:'10px'}}></span>
          </div>
        </Fragment>
      );
    } else {
      return (
        <ul className="tabs__labels">
          {this.props.children.map(labels && labels.bind(this))}
        </ul>
      );
    }
  }
  _renderContent() {
    return (
      <div className="tabs__content">
        {this.props.children[this.state.selected]}
      </div>
    );
  }
  render() {
    return (
      <div className="tabs">
        {this._renderTitles()}
        {this._renderContent()}
      </div>
    );
  }
}

class Pane extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}
module.exports = {
  Tabs,
  Pane,
};
