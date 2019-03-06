//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/graphic_container.scss';


//exports ----------------------------------------------------------------------

export default class GraphicContainerNode extends DomNode{
  constructor(props){
    super('div', 'graphic-container');
    this.setDatasetProp('id', props.id);
    this.setDatasetProp('x', props.worldCoords.x);
    this.setDatasetProp('y', props.worldCoords.y);
    this.setDatasetProp('type', props.type);
    this.innerHTML = props.numLocations;
  }
  setScreenCoords(screenCoords){
    var {x, y} = screenCoords;
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
