//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function GraphicNode(id, graphicState){

  //private code block ---------------------------------------------------------

  var graphic = new DomElement('div', 'graphic');
  graphic.dataset = { id };

  var updateVisibility = function(){
    if (graphicState.isSelected && !graphicState.isCombined){
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

  graphicState.onUpdate = function(){
    updateVisibility();
    updateDimensions();
    updateScreenCoords();
    updateNum();
  }

  //public api -----------------------------------------------------------------

  this.node = graphic.node;

  this.render = function(){
    updateVisibility();
    updateDimensions();
    updateScreenCoords();
    updateNum();
  }

}
