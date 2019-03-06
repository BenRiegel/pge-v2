//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(){

  //public api -----------------------------------------------------------------

  this.props = {
    inputEnabled: true,
  }

  this.nodes = {
    container: new ContainerNode(),
  }

  this.rootNode = this.nodes.container.node;

  this.emitter = {
    public: new Emitter(),
  };

}
