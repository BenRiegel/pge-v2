export default function ViewController(props, layerState, state, view){

  //configure dom --------------------------------------------------------------

  view.nodes.graphicContainer.node.appendChild(view.nodes.graphic.node);

  //define state change reactions ----------------------------------------------

  var updateIsHighlighted = function(){
    if (layerState.highlightedGraphicId === props.id){
      view.nodes.graphic.setHighlight();
    } else {
      view.nodes.graphic.setNoHighlight();
    }
  }

  var updateScaleFactor = function(){
    var newRenderedDiameter = props.diameter * layerState.zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    var scaleFactor = newRenderedDiameter / 20;  //change this
    view.nodes.graphic.setScale(scaleFactor);
  }

  var updateScreenCoords = function(){
    var screenX = state.mapCoords.x - layerState.viewpointCenterMap.x;
    if (screenX < 0){
      screenX += layerState.pixelNum;
    }
    if (screenX >layerState.pixelNum){
      screenX -= layerState.pixelNum;
    }
    var screenY = state.mapCoords.y - layerState.viewpointCenterMap.y;
    var screenCoords = {x:screenX, y:screenY};
    view.nodes.graphicContainer.setScreenCoords(screenCoords);
  };

  //load reactions -------------------------------------------------------------

  layerState.addListener('highlightedGraphicId', updateIsHighlighted);
  layerState.addListener('zoomScaleFactor', updateScaleFactor);
  layerState.addListener('viewpointCenterMap', updateScreenCoords);

  //init -----------------------------------------------------------------------

  updateIsHighlighted();
  updateScaleFactor();
  updateScreenCoords();

}
