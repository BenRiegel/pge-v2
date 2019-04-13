export default function WebMapModelController(model, config){

  //helper vars and functions --------------------------------------------------

  const ZOOM_IN_SCALER = 0.5;
  const ZOOM_OUT_SCALER = 2;

  var initPanViewpoint;

  var onPanStart = function(){
    initPanViewpoint = {x:model.x, y:model.y};
  }

  var onPan = function(cumulativePan){
    var deltaX = cumulativePan.x * model.scale;
    var deltaY = cumulativePan.y * model.scale;
    var newX = initPanViewpoint.x + deltaX;
    var newY = initPanViewpoint.y + deltaY;
    model.set(newX, newY, model.scale);
  }

  //init -----------------------------------------------------------------------

  model.set(config.initCoords.x, config.initCoords.y, config.initScale);

  //public api -----------------------------------------------------------------

  this.panTo = function( {x, y} ){
    model.set(x, y, model.scale);
  };

  this.zoomTo = function( {x, y} ){
    model.set(x, y, model.scale * ZOOM_IN_SCALER);
  };

  this.zoomIn = function(){
    model.set(model.x, model.y, model.scale * ZOOM_IN_SCALER);
  };

  this.zoomOut = function(){
    model.set(model.x, model.y, model.scale * ZOOM_OUT_SCALER);
  };

  this.zoomHome = function(){
    model.set(config.initCoords.x, config.initCoords.y, config.initScale);
  };

}
