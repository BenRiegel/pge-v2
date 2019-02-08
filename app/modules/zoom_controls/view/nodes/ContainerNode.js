//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/zoom_controls.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'zoom-controls-container');

  //public api -----------------------------------------------------------------

  this.node = container.node;
}
