//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { latLonToWebMercator } from '../../../models/WebMercator.js';
import '../../stylesheets/graphic.scss';


//exports ----------------------------------------------------------------------

export default function NewGraphic( {id, lat, lon, tags} ){

  //state ----------------------------------------------------------------------

  var isFilteredOut;
  var worldCoords = latLonToWebMercator( {lat, lon} );

  //view -----------------------------------------------------------------------

  var node = new NodeInstance('div');
  node.className = 'graphic';
  node.dataset = {id};

  //public api -----------------------------------------------------------------

  return {
    rootNode: node.rootNode,
    updateIsFiltered: function(selectedTag){
      isFilteredOut = !tags.includes(selectedTag);
    },
    /*render(state){
      this.rootNode.style.visibility = (!state.isFilteredOut && !state.isCombined) ? 'visible' : 'hidden';
      this.rootNode.style.transform = `translate(-50%, -50%) translate(${state.screenCoords.x}px, ${state.screenCoords.y}px)`;
      this.rootNode.dataset.type = state.type;
      this.rootNode.dataset.worldX = state.worldCoords.x;
      this.rootNode.dataset.worldY = state.worldCoords.y;
      this.rootNode.style.width = `${state.radius * 2}px`;
      this.rootNode.style.height = `${state.radius * 2}px`;
      this.rootNode.innerHTML = `${state.combinedGraphics.length}`;
    }*/
  };

}
