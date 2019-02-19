//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(mapViewpoint, layerState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(mapViewpoint, layerState, eventsEmitter);

  layerState.addListener('graphics', 'layerView', 'graphics', () => {
    container.emptyChildren();
    for (var graphic of layerState.graphics){
      container.node.appendChild(graphic.rootNode);
    }
  });

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(async resolve => {
    container.render();
    resolve();
  });

}
