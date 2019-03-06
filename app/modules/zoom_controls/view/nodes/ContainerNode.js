//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/zoom_controls.scss';


//exports ----------------------------------------------------------------------

export default class ContainerNode extends DomNode{
  constructor(className){
    super('div', 'zoom-controls-container');
  }
}
