//imports ----------------------------------------------------------------------

import '../stylesheets/zoom_button_icon.scss';


//exports ----------------------------------------------------------------------

export default function IconNode(className){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('span');
  node.className = `fa ${className}`;

  //public api -----------------------------------------------------------------

  return { node };

}
