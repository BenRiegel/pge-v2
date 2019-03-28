//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(props){
    super('div', 'graphic');
    this.setDatasetProp('type', props.type);
    this.setDatasetProp('id', props.id);
    this.setDatasetProp('x', props.worldCoords.x);
    this.setDatasetProp('y', props.worldCoords.y);
  }
  setScreenCoords(screenCoords){
    var { x, y } = screenCoords;
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
