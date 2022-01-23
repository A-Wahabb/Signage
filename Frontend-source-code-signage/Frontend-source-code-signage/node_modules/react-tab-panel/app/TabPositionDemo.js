import React from 'react'
import Component from 'react-class'
import TabPanel from '../src'
import { Flex, Item } from 'react-flex'
import assign from 'object-assign'

const render = (position, props = {}) => {
  const upper = position.toUpperCase()

  const style = assign({}, props.style, {
    height: 200
  })

  return <TabPanel tabPosition={position} {...props} style={style}>
    <div tabTitle={`yes ${upper} - first tab`}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={<div>{upper} <br /> with icon</div>}>
      Lorem ipsum Exercitation ut dolore.
    </div>

    <div tabTitle={"icon here"}>
      Lorem ipsum Exercitation ut dolore.
    </div>
  </TabPanel>
}

export default class TabPositionDemo extends Component{

  render(){

    return <div {...this.props}>
      <Flex row wrap={false} alignItems="start">
        {render('top', { style: {marginRight: 20} }  )}
        {render('right', { }  )}
      </Flex>

      <Flex style={{marginTop: 20}} row wrap={false} alignItems="start">
        {render('bottom', { style: {marginRight: 20} }  )}
        {render('left', { }  )}
      </Flex>
    </div>
  }
}
