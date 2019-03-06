//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(){

  //public api -----------------------------------------------------------------

  this.props = {
    inputEnabled: true,
    updateInProgress: false,
  }

  this.nodes = {
    container: new ContainerNode(),
  }

  this.subcomponents = {};

  this.rootNode = this.nodes.container.node;

  this.emitter = {
    public: new Emitter(),
    private: new Emitter(),
  };

}
