//imports ----------------------------------------------------------------------

import { MIN_POINT_RADIUS } from '../../graphics_layer/config/GraphicsLayerConfig.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphicViewController(view, props, state, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateHighlight = function(){
    location.setHighlight(state.isSelected);
  }

  var updateScaleFactor = function(){
    var newDiameter = props.diameter * webMapState.zoomScaleFactor;
    newDiameter = Math.max(newDiameter, MIN_POINT_RADIUS * 2);
    var scaleFactor = newDiameter / (props.renderedRadius * 2);
    location.setScale(scaleFactor);
  }

  var updateScreenCoords = function(){
    var screenCoords = webMapState.calculateScreenCoords(props.worldCoords);
    root.setScreenCoords(screenCoords);
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);
  webMapState.addListener('panUpdate', updateScreenCoords);
  webMapState.addListener('zoomUpdate', updateScreenCoords);
  webMapState.addListener('zoomUpdate', updateScaleFactor);

  //init -----------------------------------------------------------------------

  updateHighlight();
  updateScreenCoords();

  //public api -----------------------------------------------------------------

  this.removeListeners = function(){
    state.removeListener('isSelected', updateHighlight);
    webMapState.removeListener('panUpdate', updateScreenCoords);
    webMapState.removeListener('zoomUpdate', updateScreenCoords);
    webMapState.removeListener('zoomUpdate', updateScaleFactor);
  }

}
