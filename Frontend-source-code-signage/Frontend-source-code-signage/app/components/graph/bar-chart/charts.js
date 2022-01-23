import React, { PureComponent, Component } from "react";

function compareNumbers(a, b) {
  return a - b;
}
//reference https://codepen.io/maydie/pen/WvpzPG
class Charts extends Component{
  render() {
    var self = this,
      data =  JSON.parse(JSON.stringify(this.props.data)),
      layered = this.props.grouping === 'layered' ? true : false,
      stacked = this.props.grouping === 'stacked' ? true : false,
      opaque = this.props.opaque,
      colors = JSON.parse(JSON.stringify(this.props.colors)),
      max = 0;
    for (var i = data.length; i--; ) {
      for (var j = data[i].length; j--; ) {
        if (data[i][j] > max) {
          max = data[i][j];
        }
      }
    }
    
        
    return (
      <div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
        { data.map(function (serie, serieIndex) {
          var sortedSerie = serie.slice(0),
            sum;
          
          sum = serie.reduce(function (carry, current) {
            return carry + current;
          }, 0);
          sortedSerie.sort(compareNumbers);           
                   
          return (
            <div className={ 'Charts--serie ' + (self.props.grouping) }
              key={ serieIndex }
              style={{ height: self.props.height ? self.props.height: 'auto' }}
            >
            
            { serie.map(function (item, itemIndex) {
              let  color=colors[itemIndex],style,
                size = item / (stacked ? sum : max) * 100;
              
              style = {
                backgroundColor: colors[itemIndex],
                
                zIndex: item
              };
            
              if (self.props.horizontal) {
                style['width'] = size + '%';
              } else {                
                style['height'] = size + '%';           
              }
  
              if (layered && !self.props.horizontal) {
                
                style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
                
              }
            
             return (
               <div
                className={ 'Charts--item ' + (self.props.grouping) }
                style={ style }
                key={ itemIndex }
              >
                <b style={{ color: color }}>{ item }</b>
               </div>
            );
            }) }
            </div>
          );
        }) }
      </div>
    );
  }
};


export default Charts;