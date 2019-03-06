//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import ContainerNode from './nodes/ContainerNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function PopupButtonView(containerClassName, iconClassName, buttonId){

  //public api -----------------------------------------------------------------

  this.nodes = {
    container: new ContainerNode(containerClassName, buttonId),
    icon: new IconNode(iconClassName),
  }

  this.rootNode = this.nodes.container.node;

  this.emitter = {
    public: new Emitter(),
  };

}
