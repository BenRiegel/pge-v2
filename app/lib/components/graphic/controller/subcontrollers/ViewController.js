//imports ----------------------------------------------------------------------

import { MIN_POINT_RADIUS } from '../../../graphics_layer/config/GraphicsLayerConfig.js';
import { calculateDeltaX } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicViewController(view, props, dispatcher, model, webMapModel, webMapDimensions){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define view reactions ------------------------------------------------------

  var updateHighlight = function(){
    location.setHighlight(model.isSelected);
  }

  var updateScaleFactor = function(scaleFactor){
    var newDiameter = props.diameter * scaleFactor;
    newDiameter = Math.max(newDiameter, MIN_POINT_RADIUS * 2);
    var scaleFactor = newDiameter / (props.renderedRadius * 2);
    location.setScale(scaleFactor);
  }

  var updateScreenCoords = function(viewpoint){
    var deltaX = calculateDeltaX(props.worldCoords.x, viewpoint.x);
    var deltaXMap = deltaX / viewpoint.scale;
    var screenX = deltaXMap + webMapDimensions.width / 2;
    var deltaY = props.worldCoords.y - viewpoint.y;
    var deltaYMap = deltaY / viewpoint.scale;
    var screenY = deltaYMap + webMapDimensions.height / 2;
    var screenCoords = {x:screenX, y:screenY};
    root.setScreenCoords(screenCoords);
  };

  //define event reactions -----------------------------------------------------

  var onUpdateIsSelected = function(){
    if (model.props.isSelected.hasChanged){
      updateHighlight();
    }
  }

  var onZoom = function(viewpoint, scaleFactor){
    updateScreenCoords(viewpoint);
    if (props.type === 'cluster'){
      updateScaleFactor(scaleFactor);
    }
  }

  var onPan = function(viewpoint){
    updateScreenCoords(viewpoint);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'updateIsSelected', onUpdateIsSelected);
  dispatcher.setListener('view', 'pan', onPan);
  dispatcher.setListener('view', 'zoom', onZoom);

  //init -----------------------------------------------------------------------

  updateHighlight();
  updateScreenCoords(webMapModel);

}
