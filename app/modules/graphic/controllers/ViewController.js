export default function ViewController(props, layerState, state, view){

  var { nodes } = view;
  var { graphic, graphicContainer } = nodes;

  //configure dom --------------------------------------------------------------

  graphicContainer.node.appendChild(view.nodes.graphic.node);

  //define state change reactions ----------------------------------------------

  var updateIsHighlighted = function(){
    if (layerState.highlightedGraphicId === props.id){
      graphic.props.isHighlighted.set('highlight');
    } else {
      graphic.props.isHighlighted.set(null);
    }
  }

  var updateScaleFactor = function(){
    var newRenderedDiameter = props.diameter * layerState.zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    var scaleFactor = newRenderedDiameter / 20;
    graphic.props.scale.set(scaleFactor);
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
    graphicContainer.props.screenCoords.set(screenCoords);
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
