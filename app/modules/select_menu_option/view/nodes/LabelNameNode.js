//imports ----------------------------------------------------------------------

import ClassNameProp from '../../../../lib/props/ClassNameProp.js';
import '../stylesheets/option_label_name.scss';


//exports ----------------------------------------------------------------------

export default function LabelNameNode(name){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'tag-name';
  node.innerHTML = name;

  //define props ---------------------------------------------------------------

  var props = {
    indent: new ClassNameProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
