//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(mapViewpoint, layerState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(mapViewpoint, layerState, eventsEmitter);

  layerState.addListener('graphics', () => {
    container.removeAllChildren();
    var rootNodes = layerState.graphics.map( graphic => graphic.rootNode );
    container.addChildren(rootNodes); 
  });

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(async resolve => {
    container.render();
    resolve();
  });

}
