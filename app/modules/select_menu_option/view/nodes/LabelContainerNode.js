//imports ----------------------------------------------------------------------

import '../stylesheets/option_label_container.scss';


//exports ----------------------------------------------------------------------

export default function LabelContainer(){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'label';

  //public api -----------------------------------------------------------------

  return { node };

}
