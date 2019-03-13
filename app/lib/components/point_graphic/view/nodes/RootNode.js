//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(props){
    super('div', 'graphic');
    this.setDatasetProp('type', 'point');
    this.setDatasetProp('id', props.id);
  }
  setScreenCoords(x, y){
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
