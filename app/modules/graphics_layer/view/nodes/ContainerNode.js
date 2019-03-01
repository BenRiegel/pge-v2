//imports ----------------------------------------------------------------------

import Emitter from '../../../../lib/Emitter.js';
import ChildrenProp from '../../../../lib/props/ChildrenProp.js';
import { getTargetNode } from '../../../../lib/Utils.js';
import '../stylesheets/graphics_layer.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(state, eventsEmitter){

  //create emitter -------------------------------------------------------------

  var emitter = new Emitter();

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'graphics-layer';

  node.addEventListener('click', evt => {
    var graphicContainer = getTargetNode(evt.target, 'graphic-container');
    if (graphicContainer){
      var graphicId = Number(graphicContainer.dataset.id);
      var graphicType = graphicContainer.dataset.type;
      var worldCoords = {
        x: Number(graphicContainer.dataset.x),
        y: Number(graphicContainer.dataset.y),
      };
      emitter.broadcast('click', graphicType, graphicId, worldCoords);
    }
  });

  var props = {
    children: new ChildrenProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, emitter, props };

}
