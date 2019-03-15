//imports ----------------------------------------------------------------------

import { MIN_POINT_RADIUS } from '../../graphics_layer/config/GraphicsLayerConfig.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphicViewController(view, props, state, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;
  var { viewpoint, action } = webMapState;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateHighlight = function(){
    location.setHighlight(state.isSelected);
  }

  var updateScaleFactor = function(){
    var newDiameter = props.diameter * action.frameProps.zoomScaleFactor;
    newDiameter = Math.max(newDiameter, MIN_POINT_RADIUS * 2);
    var scaleFactor = newDiameter / (props.renderedRadius * 2);
    location.setScale(scaleFactor);
  }

  var updateScreenCoords = function(vp){
    var screenCoords = viewpoint.calculateScreenCoordsViewpoint(props.worldCoords, vp);
    root.setScreenCoords(screenCoords);
  };

  var updateOnPan = function(){
    updateScreenCoords(action.frameProps);
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);
  action.addListenerByType('frameProps', 'panFrame', updateOnPan);
  action.addListenerByType('frameProps', 'zoomFrame', updateScaleFactor);
  action.addListenerByType('frameProps', 'zoomFrame', updateOnPan);

  //init -----------------------------------------------------------------------

  updateHighlight();
  updateScreenCoords(viewpoint);

}
