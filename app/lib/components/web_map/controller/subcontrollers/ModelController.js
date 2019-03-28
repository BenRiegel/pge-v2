export default function WebMapModelController(model, config, dispatcher){

  //define state reactions ------------------------------------------------------

  const ZOOM_IN_SCALER = 0.5;
  const ZOOM_OUT_SCALER = 2;

  var panTo = function( {x, y} ){
    model.set(x, y, model.scale);
  };

  var zoomTo = function( {x, y} ){
    model.set(x, y, model.scale * ZOOM_IN_SCALER);
  };

  var zoomIn = function(){
    model.set(model.x, model.y, model.scale * ZOOM_IN_SCALER);
  };

  var zoomOut = function(){
    model.set(model.x, model.y, model.scale * ZOOM_OUT_SCALER);
  };

  var zoomHome = function(){
    model.set(config.initCoords.x, config.initCoords.y, config.initScale);
  };

  //define user event reactions ------------------------------------------------

  var onPointGraphicSelected = function( {worldCoords} ){
    panTo(worldCoords);
  }

  var onClusterGraphicSelected = function( {worldCoords} ){
    zoomTo(worldCoords);
  }

  var onZoomInRequest = function(){
    zoomIn();
  }

  var onZoomOutRequest = function(){
    zoomOut();
  }

  var onZoomHomeRequest = function(){
    zoomHome();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'pointGraphicSelected', onPointGraphicSelected);
  dispatcher.setListener('model', 'clusterGraphicSelected', onClusterGraphicSelected);
  dispatcher.setListener('model', 'zoomInRequest', onZoomInRequest);
  dispatcher.setListener('model', 'zoomOutRequest', onZoomOutRequest);
  dispatcher.setListener('model', 'zoomHomeRequest', onZoomHomeRequest);

  //init -----------------------------------------------------------------------

  zoomHome();

}
