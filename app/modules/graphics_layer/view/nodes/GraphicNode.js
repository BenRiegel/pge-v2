//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';



//exports ----------------------------------------------------------------------

export default function GraphicNode(id, graphicState){

  //create dom element ---------------------------------------------------------

  var graphic = new DomElement('div', 'graphic');
  graphic.dataset = { id };

  var updateDataType = function(){
    var type = graphicState.numLocations > 1 ? 'cluster' : 'point';
    graphic.dataset = {type};
  }

  var updateDataWorldXY = function(){
    graphic.dataset = {x: graphicState.worldCoords.x};
    graphic.dataset = {y: graphicState.worldCoords.y};
  }

  var updateVisibility = function(){
    if (graphicState.isVisible){
      graphic.setVisibility('visible');
    } else {
      graphic.setVisibility('hidden');
    }
  }

  var updateHighlight = function(){
    if (graphicState.isHighlighted){
      graphic.addClass('highlight');
    } else {
      graphic.removeClass('highlight');
    }
  }

  var updateSize = function(){
    graphic.setStyle('width', `${graphicState.renderedDiameter}px`);
    graphic.setStyle('height', `${graphicState.renderedDiameter}px`);
  }

  var updateScreenCoords = function(){
    var { x, y } = graphicState.screenCoords;
    var str = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    graphic.setStyle('transform', str);
  }

  var updateInnerHTML = function(){
    graphic.innerHTML = graphicState.numLocations;
  }

  //load state reactions -------------------------------------------------------

  graphicState.addListener('worldCoords', 'node', 'worldCoords', updateDataWorldXY);
  graphicState.addListener('isHighlighted', 'node', 'highlight', updateHighlight);
  graphicState.addListener('isVisible', 'node', 'visibility', updateVisibility);
  graphicState.addListener('numLocations', 'node', 'type', updateDataType);
  graphicState.addListener('numLocations', 'node', 'innerHTML', updateInnerHTML);
  graphicState.addListener('renderedDiameter', 'node', 'size', updateSize);
  graphicState.addListener('screenCoords', 'node', 'location', updateScreenCoords);

  //public api -----------------------------------------------------------------

  this.node = graphic.node;

  this.render = function(){
    updateDataType();
    updateDataWorldXY();
    updateVisibility();
    updateHighlight();
    updateSize();
    updateScreenCoords();
    updateInnerHTML();
  }

}
