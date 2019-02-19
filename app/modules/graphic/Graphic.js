//imports ----------------------------------------------------------------------

import GraphicState from './state/GraphicState.js';
import GraphicView from './view/GraphicView.js';


//exports ----------------------------------------------------------------------

//graphicProps, mapViewpoint, mapMovement

export default function Graphic(props, mapViewpoint, mapMovement){

  //private code block ---------------------------------------------------------

  var state = new GraphicState(props, mapViewpoint, mapMovement);
  var view = new GraphicView(props, state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.updateMapCoords = function(){
    state.updateMapCoords();
  }

  this.updateScreenCoords = function(){
    state.updateScreenCoords();
  }

  this.updateRenderedDiameter = function(){
    state.updateRenderedDiameter();
  }

  this.updateIsHighlighted = function(highlightedGraphicId){
    state.setQuick('isHighlighted', props.id === highlightedGraphicId);
  }

}
