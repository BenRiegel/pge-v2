//imports ----------------------------------------------------------------------

import '../stylesheets/zoom_controls.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = 'zoom-controls-container';

  //public api -----------------------------------------------------------------

  return { node };

}
