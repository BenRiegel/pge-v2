//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(props){
    super('div', 'graphic');
    this.setDatasetProp('id', props.id);
    this.setDatasetProp('x', props.worldCoords.x);
    this.setDatasetProp('y', props.worldCoords.y);
    this.setDatasetProp('type', props.type);
  }
  setScreenCoords(x, y){
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
