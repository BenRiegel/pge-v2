//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/graphic.scss';


//exports ----------------------------------------------------------------------

export default function GraphicNode(props, graphicState){

  //create dom element ---------------------------------------------------------

  var graphic = new DomElement('div', 'graphic');
  graphic.dataset = { id: props.id };
  graphic.dataset = {x: props.worldCoords.x};
  graphic.dataset = {y: props.worldCoords.y};
  graphic.dataset = {type: props.type};
  graphic.innerHTML = props.numLocations;

  //define state change reactions ----------------------------------------------

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

  //load state change reactions ------------------------------------------------

  graphicState.setOnChange('isHighlighted', updateHighlight);
  graphicState.setOnChange('renderedDiameter', updateSize);
  graphicState.setOnChange('screenCoords', updateScreenCoords);

  //public api -----------------------------------------------------------------

  this.node = graphic.node;

  this.render = function(){
    updateHighlight();
    updateSize();
    updateScreenCoords();
  }

}
