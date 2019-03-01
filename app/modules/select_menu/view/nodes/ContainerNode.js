//imports ----------------------------------------------------------------------

import ClassNameProp from '../../../../lib/props/ClassNameProp.js';
import Emitter from '../../../../lib/Emitter.js';
import { getTargetNode } from '../../../../lib/Utils.js';
import '../stylesheets/select_menu.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(){

  //create emitter -------------------------------------------------------------

  var emitter = new Emitter();

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'select-menu-container';

  node.addEventListener('click', function(evt){
    var optionNode = getTargetNode(evt.target, 'option');
    if (optionNode){
      var optionKey = optionNode.dataset.key;
      emitter.broadcast('click', optionKey);
    }
  });

  //create props ---------------------------------------------------------------

  var props = {
    borderRadiusStyle: new ClassNameProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props, emitter };

};
