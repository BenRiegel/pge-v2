//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../web_map/lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function PointGraphicViewController(view, props, state, mapDimensions, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateRootVisibility = function(){
    if (!state.hasSelectedTag || state.isObscured){
      root.setVisibility('hidden');
    } else {
      root.setVisibility('visible');
    }
  }

  var updateHighlight = function(){
    location.setHighlight(state.isSelected);
  }

  var updateScreenCoords = function(viewpoint){
    var deltaX = calculateDeltaX(props.worldCoords.x, viewpoint.x);
    var deltaXMap = deltaX / viewpoint.scaleValue;
    var screenX = deltaXMap + mapDimensions.width / 2;
    var deltaY = props.worldCoords.y - viewpoint.y;
    var deltaYMap = deltaY / viewpoint.scaleValue;
    var screenY = deltaYMap + mapDimensions.height / 2;
    root.setScreenCoords(screenX, screenY);
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);
  state.addListener('hasSelectedTag', updateRootVisibility);
  state.addListener('isObscured', updateRootVisibility);

  //init -----------------------------------------------------------------------

  updateRootVisibility();
  updateHighlight();
  updateScreenCoords(webMapState.viewpoint);

  //public api -----------------------------------------------------------------

  this.update = function(viewpoint){
  //  if (state.hasSelectedTag && !state.isObscured){
      updateScreenCoords(viewpoint);
    //}
  }

}
