//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function GraphicNode(id, layerState, graphicState){

  //create dom element ---------------------------------------------------------

  var graphic = new DomElement('div', 'graphic');
  graphic.dataset = { id };

  var updateVisibility = function(){
    if (graphicState.isVisible){
      graphic.setVisibility('visible');
    } else {
      graphic.setVisibility('hidden');
    }
  }

  var updateDimensions = function(){
    graphic.setStyle('width', `${graphicState.radius * 2}px`);
    graphic.setStyle('height', `${graphicState.radius * 2}px`);
  };

  var updateScreenCoords = function(){
    var x = graphicState.screenCoords.x;
    var y = graphicState.screenCoords.y;
    graphic.setStyle('transform', `translate(-50%, -50%) translate(${x}px, ${y}px)`);
  }

  var updateNum = function(){
    graphic.innerHTML = graphicState.num;
  }

  graphicState.addListener('view - updateScreenCoords', updateScreenCoords);

  layerState.addListener('graphicNode - updateOnClusteringComplete', () => {
    updateVisibility();
    updateDimensions();
    updateScreenCoords();
    updateNum();
  });

  //public api -----------------------------------------------------------------

  this.node = graphic.node;

  this.render = function(){
    updateVisibility();
    updateDimensions();
    updateScreenCoords();
    updateNum();
  }

}
