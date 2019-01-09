//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function GraphicNode(id, graphicState){

  //create dom element ---------------------------------------------------------

  var graphic = new DomElement('div', 'graphic');
  graphic.dataset = { id };

  var updateWorldCoords = function(){
    graphic.dataset = {x: graphicState.worldCoords.x};
    graphic.dataset = {y: graphicState.worldCoords.y};
  }

  var updateType = function(){
    var type = graphicState.numPts > 1 ? 'cluster' : 'point';
    graphic.dataset = {type};
  }

  var updateVisibility = function(){
    if (graphicState.isMapped && !graphicState.isCovered){
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

  // do something about this
  var updateSize = function(){
    if (graphicState.numPts > 1){
      if (graphicState.radius < 10){
        var renderedDiam = graphicState.radius * 2 * graphicState.scaleFactor;
      } else {
        var renderedDiam = graphicState.renderedRadius * 2 * graphicState.scaleFactor;
      }
    } else {
      var renderedDiam = graphicState.renderedRadius * 2;
    }
    renderedDiam = Math.max(renderedDiam, 20);

    graphic.setStyle('width', `${renderedDiam}px`);
    graphic.setStyle('height', `${renderedDiam}px`);
  }

  var updateScreenCoords = function(){
    var { x, y } = graphicState.screenCoords;
    var str = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    graphic.setStyle('transform', str);
  }

  var updateNum = function(){
    graphic.innerHTML = graphicState.numPts;
  }

  graphicState.addListener('worldCoords', updateWorldCoords);
  graphicState.addListener('numPts', updateType);
  graphicState.addListener('isMapped', updateVisibility);
  graphicState.addListener('isCovered', updateVisibility);
  graphicState.addListener('isHighlighted', updateHighlight);
  graphicState.addListener('scaleFactor', updateSize);
  graphicState.addListener('radius', updateSize);
  graphicState.addListener('screenCoords', updateScreenCoords);
  graphicState.addListener('numPts', updateNum);

  //public api -----------------------------------------------------------------

  this.node = graphic.node;

  this.render = function(){
    updateWorldCoords();
    updateType();
    updateVisibility();
    updateHighlight();
    updateSize();
    updateScreenCoords();
    updateNum();
  }

}
