//imports ----------------------------------------------------------------------

import '../stylesheets/zoom_controls_button_container.scss';


//exports ----------------------------------------------------------------------

export default function ButtonContainerNode(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'zoom-button-container';

  //public api -----------------------------------------------------------------

  return { node };

}
