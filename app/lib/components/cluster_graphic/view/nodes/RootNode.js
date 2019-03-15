//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../../../point_graphic/view/stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(props){
    super('div', 'graphic');
    this.setDatasetProp('type', 'cluster');
    this.setDatasetProp('id', props.id);
  }
  setScreenCoords(screenCoords){
    var { x, y } = screenCoords;
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
