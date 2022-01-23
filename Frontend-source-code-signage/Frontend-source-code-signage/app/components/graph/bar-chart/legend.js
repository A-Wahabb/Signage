import React, { PureComponent,Component } from "react";
class Legend extends Component{

  render() {
    var labels = this.props.labels,
      colors = this.props.colors;
    console.log('lables',labels);
    return (
    <div className="Legend">
      { labels.map(function(label, labelIndex) {
        return (
        <span key={label}>
          <span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
          <span className="Legend--label">{ label }</span>
        </span>
        );
      }) }
    </div>
    );
  }
};

export default Legend;
