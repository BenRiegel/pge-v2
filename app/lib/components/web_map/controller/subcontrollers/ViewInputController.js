export default function WebMapViewInputController(view, model){

  var { subcomponents } = view;
  var { zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define state change reactions ----------------------------------------------

  var onPanEnd = function(){
    popup.enable();
    graphicsLayer.enable();
    zoomControls.enable();
  }

  var onPanStart = function(){
    popup.disable();
    graphicsLayer.disable();
    zoomControls.disable();
  }

  //public api -----------------------------------------------------------------

  this.enableAll = function(){
    zoomControls.enable();
    graphicsLayer.enable();
    popup.enable();
    basemapLayer.enable();
  };

  this.disableAll = function(){
    zoomControls.disable();
    popup.disable();
    graphicsLayer.disable();
    basemapLayer.disable();
  };

}
