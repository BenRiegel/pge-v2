//imports ----------------------------------------------------------------------

import '../stylesheets/option_label_count.scss';


//exports ----------------------------------------------------------------------

export default function LabelCountNode(count){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'tag-count';
  node.innerHTML = count;

  //public api -----------------------------------------------------------------

  return { node };

}
