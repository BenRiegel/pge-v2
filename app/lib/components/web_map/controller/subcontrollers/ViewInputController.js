export default function WebMapViewInputController(view, model){

  var { subcomponents } = view;
  var { zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //public api -----------------------------------------------------------------

  this.enableAll = function(){
    basemapLayer.enable();
    graphicsLayer.enable();
    popup.enable();
    zoomControls.enable();
  };

  this.disableAll = function(){
    basemapLayer.disable();
    graphicsLayer.disable();
    popup.disable();
    zoomControls.disable();
  };

  this.onPanEnd = function(){
    popup.enable();
    graphicsLayer.enable();
    zoomControls.enable();
  };

  this.onPanStart = function(){
    popup.disable();
    graphicsLayer.disable();
    zoomControls.disable();
  };

}
